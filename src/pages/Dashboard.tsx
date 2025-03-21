import React, { useEffect, useState } from "react";
import SideMenuBar from "../components/SideMenuBar";
import GraphItem from "../components/GraphItem";
import Clock from "react-clock";
import {
  faRightToBracket,
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
type Props = {};

export default function Dashboard({}: Props) {
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
      } z-10 h-[120%] flex  bg-[#F3F8FB]  border-2`}
    >
      <SideMenuBar current="Dashboard" />

      <div className="border-2 p-5 w-full flex-2 ">
        <div className="flex justify-between w-[95%]">
          <p className="font-poppins text-[20px] font-semibold mb-5  ">
            insights
          </p>
          <div>
            <select
              className=" w-[70px]  text-[#393f45] focus:outline-none pl-2 border-1  h-[30px] border-l-2
            border-t-2  border-b-2 rounded-tl-md rounded-bl-md
            font-poppins text-[14px]
            border-[#a4c3e3]"
            >
              <option className="font-poppins ">2025</option>
            </select>
            <select
              className=" w-[120px] 
            
            border-r-2 rounded-tr-md rounded-br-md
            border-t-2  border-b-2 font-poppins text-[14px]
            text-[#576069] focus:outline-none pl-4  h-[30px] border-1  border-[#a4c3e3]"
            >
              <option className="font-poppins ">March</option>
            </select>
          </div>
        </div>

        <div className="p-2 flex flex-wrap gap-5">
          <GraphItem
            dataValues={[12, 55, 35, 10, 5, 55, 62]}
            borderColor="#52B623"
            color="#CDFF8C"
            month="February"
            perc="78%"
            title="On Time Percentage"
          />
          <GraphItem
            dataValues={[2, 15, 75, 16, 53, 55, 62]}
            borderColor="#F5533D"
            color="#FF9C8E"
            month="February"
            perc="35%"
            title="Late Percentage"
          />
          <GraphItemHours
            dataValues={[35, 35, 35, 35, 35, 35, 35]}
            borderColor="#FF7A00"
            color="#FFB37F"
            month="February"
            hour="1"
            minutes="0"
            seconds="0"
            perc="35%"
            title="Total Lunch Hours"
          />
          <GraphItemHours
            dataValues={[59, 45, 45, 76, 73, 50, 24]}
            borderColor="#00BAC8"
            color="#02DEEE"
            month="February"
            hour="0"
            minutes="23"
            seconds="00"
            perc="35%"
            title="Total Working Hours"
          />
        </div>
        {/* <p className="font-poppins text-[20px] font-semibold mt-3 mb-4 ">
          Announcements
          <span className="font-poppins text-[11px] font-light ">
            {" "}
            Messages will disappear after 24 Hours
          </span>
        </p>
        <Annoucements /> */}
        <p className="font-poppins text-[20px] font-semibold mt-3 mb-4 ">
          Attendance
        </p>

        <div className=" flex gap-3">
          <div className="bg-white p-1 w-[360px] border-2 border-[#C6E6FB] rounded-md">
            <DayPicker
              hideNavigation
              captionLayout="label"
              mode="single"
              timeZone="Africa/Johannesburg"
              classNames={{
                month_caption:
                  " font-poppins text-[20px] text-center mb-4 font-semibold text-[#2C5B8C]",
                weekday: "text-[#83ACD8]",
                day: "font-poppins font-semibold",
                today: `text-[#83ACD8]`, // Add a border to today's date
                selected: ` border-2 border-[#83ACD8] text-[#2C5B8C]`, // Highlight the selected day
                root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
                chevron: `${defaultClassNames.chevron} fill-amber-500`, // Change the color of the chevron
              }}
            />
          </div>
          <div className="bg-white flex p-1 w-[860px] border-2 border-[#C6E6FB]  rounded-md">
            <div className="flex-row w-[300px] items-center  mt-10">
              <div className="">
                <Clock
                  secondHandWidth={2}
                  hourHandWidth={2}
                  minuteHandWidth={1}
                  renderMinuteMarks={false}
                  size={200}
                  value={value}
                />
              </div>
              <div>
                <p className="font-poppins text-[35px] mt-4 text-center font-semibold text-[#2C5B8C]">
                  {value.getHours()} : {value.getMinutes()}:{" "}
                  {value.getSeconds()}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex gap-3">
                <div>
                  <div className="w-[250px] border-2 p-3 border-[#C6E6FB] h-[85px]  rounded-md mb-4">
                    <p className="font-poppins font-semibold mb-1">
                      Working Hours{" "}
                    </p>
                    <p className="font-poppins  text-[#2C5B8C] text-[21px] font-semibold">
                      {`${hours}`} Hr {`${minutes}`} Mins {`${seconds}`} Secs
                    </p>
                  </div>
                  <div className="w-[250px] border-2 p-3 border-[#C6E6FB] h-[85px]  rounded-md">
                    <p className="font-poppins font-semibold mb-1">
                      Lunch Hours{" "}
                    </p>
                    <p className="font-poppins  text-[#2C5B8C] text-[21px] font-semibold">
                      0 Hr 00 Mins 00 Secs{" "}
                    </p>
                  </div>
                  <div></div>
                </div>
                <div>
                  <div className="border-2 p-3 flex flex-col justify-center items-center border-[#C6E6FB] rounded-md">
                    <img
                      src="/pot.png"
                      alt="pot pic"
                      className=" w-[139px] h-[139px] from-[#cc4b4b]"
                    />
                    <p className="font-poppins text-[#66B602] text-[13px] text-center font-semibold">
                      Punctuality is the virtue of the bored.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 flex gap-6 items-center mt-8">
                <div>
                  <FontAwesomeIcon
                    icon={clocked_in ? faRightFromBracket : faRightToBracket}
                    size="2x"
                    color={`${clocked_in ? "#cc4b4b" : "#52B623"}`}
                  />
                </div>
                <div>
                  <button
                    onClick={handelBtnPress}
                    className={`font-poppins ${
                      clocked_in
                        ? " bg-gradient-to-r  from-[#d54d4d] via-[#b60232] to-[#d14545] "
                        : " bg-gradient-to-r  from-[#52B623] via-[#66B602] to-[#94D145]"
                    } rounded-md text-white p-1 w-[450px] text-[19px] font-semibold `}
                  >
                    {clocked_in ? "clock-out" : "clock-in"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
