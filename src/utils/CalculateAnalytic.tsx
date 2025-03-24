import { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AttendanceData } from "../redux/AttendanceSlice";

export const useAttendanceAnalytics = () => {
  const attendance_data = useSelector(
    (state: RootState) => state.attendance_data.my_attendance_data
  );
  const [compareMonth, setCompareMonth] = useState<Date | null>(null);
  const isOnTime = useCallback((clockin: Date): boolean => {
    if (
      clockin.getHours() > 8 ||
      (clockin.getHours() === 8 && clockin.getMinutes() > 10)
    ) {
      return false;
    } else {
      return true;
    }
  }, []);

  const calculateMetrics = useCallback(
    (data: AttendanceData[]) => {
      let ontime = 0;
      let late = 0;
      let working_hours = {
        seconds: 0,
        hours: 0,
        minutes: 0,
      };
      let lunch_hours = 0;

      data.forEach((record) => {
        if (isOnTime(record.clock_in)) {
          ontime++;
        } else {
          late++;
        }
        lunch_hours += 1;
        working_hours = {
          hours: working_hours.hours + record.workHours.hours,
          minutes: working_hours.minutes + record.workHours.minutes,
          seconds: working_hours.seconds + record.workHours.seconds,
        };
      });

      working_hours.minutes += Math.floor(working_hours.seconds / 60);
      working_hours.seconds %= 60;
      working_hours.hours += Math.floor(working_hours.minutes / 60);
      working_hours.minutes %= 60;

      const ontime_perc = data.length > 0 ? (ontime / data.length) * 100 : 0;
      const late_perc = data.length > 0 ? (late / data.length) * 100 : 0;

      return {
        late_perc,
        ontime_perc,
        working_hours,
        lunch_hours,
        total_records: data.length,
      };
    },
    [isOnTime]
  );

  const calculateChange = useCallback(
    (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    },
    []
  );

  const filterDataByMonth = useCallback(
    (data: AttendanceData[], date: Date): AttendanceData[] => {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const target = `${year}-${month}`;

      return data
        .map((record) => {
          const recordMonth = String(record.todayDate.getMonth() + 1).padStart(
            2,
            "0"
          );
          const recordYear = record.todayDate.getFullYear();
          const value = `${recordYear}-${recordMonth}`;
          if (value === target) {
            return record;
          } else {
            return undefined;
          }
        })
        .filter((record): record is AttendanceData => record !== undefined);
    },
    []
  );

  const calculateDashBoardAnalytic = useCallback(
    (compareDate: Date) => {
      const now = new Date();

      const compareMonth_data = filterDataByMonth(attendance_data, compareDate);

      const current_month_data = filterDataByMonth(attendance_data, now);

      const current_metrics = calculateMetrics(current_month_data);

      if (compareMonth_data.length < 1) {
        return current_metrics;
      } else {
        const compare_metrics = calculateMetrics(compareMonth_data);

        const currentTotalMinutes =
          current_metrics.working_hours.hours * 60 +
          current_metrics.working_hours.minutes +
          current_metrics.working_hours.seconds / 60;

        const compareTotalMinutes =
          compare_metrics.working_hours.hours * 60 +
          compare_metrics.working_hours.minutes +
          compare_metrics.working_hours.seconds / 60;

        return {
          current: current_metrics,
          compare: compare_metrics,
          changes: {
            late_perc_change: calculateChange(
              current_metrics.late_perc,
              compare_metrics.late_perc
            ),
            ontime_perc_change: calculateChange(
              current_metrics.ontime_perc,
              compare_metrics.ontime_perc
            ),
            working_hours_change: calculateChange(
              currentTotalMinutes,
              compareTotalMinutes
            ),
            lunch_hours_change: calculateChange(
              current_metrics.lunch_hours,
              compare_metrics.lunch_hours
            ),
            attendance_change: calculateChange(
              current_metrics.total_records,
              compare_metrics.total_records
            ),
          },
        };
      }
    },
    [attendance_data, calculateMetrics, calculateChange, filterDataByMonth]
  );

  const analytics = useMemo(() => {
    if (compareMonth) {
      return calculateDashBoardAnalytic(compareMonth);
    }
    return null;
  }, [compareMonth, calculateDashBoardAnalytic]);

  const availableMonths = useMemo(() => {
    const months = new Set<string>();

    attendance_data.forEach((record) => {
      const month = String(record.todayDate.getMonth() + 1).padStart(2, "0");
      const year = record.todayDate.getFullYear();
      months.add(`${year}-${month}`);
    });

    return Array.from(months)
      .sort()
      .map((monthStr) => {
        const [year, month] = monthStr.split("-").map(Number);
        return new Date(year, month - 1);
      });
  }, [attendance_data]);

  return {
    analytics,
    compareMonth,
    setCompareMonth,
    calculateDashBoardAnalytic,
    availableMonths,
    isOnTime,
  };
};
