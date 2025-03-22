import { createSlice } from "@reduxjs/toolkit";
type workHours = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type AttendanceData = {
  clock_in: Date;
  clock_out: Date | null;
  todayDate: Date;
  workHours: workHours;
  valid: boolean;
};
const my_attendance_data: AttendanceData[] = [
  {
    clock_in: new Date(),
    clock_out: null,
    todayDate: new Date(),
    valid: false,
    workHours: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  },
];
const initialState = {
  my_attendance_data,
};
const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setAttendanceData: (state, action) => {
      state.my_attendance_data = action.payload;
    },
  },
});
export const { setAttendanceData } = attendanceSlice.actions;
export default attendanceSlice.reducer;
