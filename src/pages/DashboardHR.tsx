import React, { useEffect, useState } from "react";
import SideMenuBar from "../components/SideMenuBar";
import GraphItem from "../components/GraphItem";
import Clock from "react-clock";
import {
  faUserGroup,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import GraphItemHours from "../components/GraphItemHours";
import Annoucements from "../components/Annoucements";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import "../components/clock.css";
import AnimatedNumbers from "react-animated-numbers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { setAppDetails } from "../redux/appSlice";
import { tr } from "@faker-js/faker/.";
import { increment, startTimer } from "../redux/timerSlice";
import { setClockin } from "../redux/UserSlice";
import SideMenuBarHR from "../components/SideMenuBarHR";
import WeekModal from "../components/WeekModal";
type Props = {};

export default function DashboardHR({}: Props) {
  const dispatch = useDispatch();
  const { time, running } = useSelector((state: RootState) => state.timer);
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (running) {
      interval = setInterval(() => {
        dispatch(increment()); // Increments time every second
      }, 1000);
    } else {
      //@ts-ignore
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [running, dispatch]);

  const defaultClassNames = getDefaultClassNames();
  const submitDatabase = () => {};
  const [value, setValue] = useState(new Date());
  const handelBtnPress = () => {
    if (clocked_in) {
      dispatch(setAppDetails(true));
    } else {
      dispatch(startTimer());
      dispatch(setClockin(true));
    }
  };
  const isopen = useSelector(
    (state: RootState) => state.app.clock_out_modal_open
  );
  // const clocked_in = useSelector((state: RootState) => state.user.clocked_in);
  const clocked_in = useSelector((state: RootState) => state.user.clocked_in);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  let options = {
    useCustomTime: false, // set this to true
    width: "300px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#17a2b8",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff",
    },
    seconds: 1,
    minutes: 10,
    hours: 22,
  };
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value2, onChange] = useState<Value>(new Date());
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return (
    <div
      className={`w-[100vw] ${
        isopen && "blur-sm"
      } z-10 h-[120%] flex bg-[#3A4C4F]    `}
    >
      <SideMenuBarHR current="Dashboard" />

      <div className="rounded-tl-xl bg-[#F8F7F1]  p-5 w-full flex-2 ">
        <p className="font-poppins font-semibold text-[20px]">Attendance</p>

        <div className="mt-3 flex gap-3">
          <div className="p-4 flex flex-col gap-3  w-[260px] rounded-md bg-[#d5eada]">
            <div>
              <FontAwesomeIcon icon={faUserGroup} color="#3A4C4F" />
            </div>
            <div>
              <p className="text-[20px] font-poppins font-semibold text-[#3A4C4F]">
                126 Students
              </p>
            </div>
            <div>
              <span className="text-[15px] font-poppins font-semibold text-[#3b8956]">
                +15%
              </span>
              <span className="text-[14px] font-poppins font-semibold text-[#686d6a]">
                {" "}
                vs last week{" "}
              </span>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-3  w-[260px] rounded-md bg-[#d5eada]">
            <div>
              <FontAwesomeIcon icon={faUserGroup} color="#3A4C4F" />
            </div>
            <div>
              <p className="text-[20px] font-poppins font-semibold text-[#3A4C4F]">
                126 Students
              </p>
            </div>
            <div>
              <span className="text-[15px] font-poppins font-semibold text-[#3b8956]">
                +15%
              </span>
              <span className="text-[14px] font-poppins font-semibold text-[#686d6a]">
                {" "}
                vs last week{" "}
              </span>
            </div>
          </div>
        </div>
        
        <WeekModal />
      </div>
    </div>
  );
}
