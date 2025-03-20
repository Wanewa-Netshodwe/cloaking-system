import React, { useEffect, useState } from "react";
import SideMenuBar from "../components/SideMenuBar";
import GraphItem from "../components/GraphItem";
import Clock from "react-clock";
import {
  faRightToBracket,
  faSearch,
  faFileExport,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import GraphItemHours from "../components/GraphItemHours";
import Annoucements from "../components/Annoucements";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import "../components/clock.css";
import AnimatedNumbers from "react-animated-numbers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {};

export default function AttendanceReport({}: Props) {
  const defaultClassNames = getDefaultClassNames();
  const submitDatabase = () => {};
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  let options = {
    useCustomTime: false,
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
  return (
    <div className="w-[100vw] h-[120%] flex  bg-[#F3F8FB] border-2">
      <SideMenuBar current="AttendanceReport" />

      <div className="border-2 p-5 w-full flex-2 ">
        <p className="font-poppins text-[25px] font-semibold mb-5  ">
          Attendance Report
        </p>
        <div className="flex justify-between w-[95%]">
          {/* <p className="font-poppins text-[20px] font-semibold mb-5  ">
            insights
          </p> */}
          <div className="relative">
            <input
              placeholder="Search"
              className="mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8] rounded-md
                placeholder:pl-2 focus:outline-none
              w-[250px] h-[30px] border-2 border-[#a4c3e3]"
              type="text"
            ></input>
            <FontAwesomeIcon
              className="absolute top-3 right-3"
              size="1x"
              color="#83ACD8"
              icon={faSearch}
            />
          </div>
          <div className="flex items-center  ">
            <div className="flex items-center gap-3">
              <p className="text-[#1F4062] font-poppins font-semibold text-[17px]">
                Show Entries{" "}
              </p>
              <div className="w-[300px] h-[30px] mr-5 border-2 border-[#a4c3e3] flex  bg-white">
                <div className="pl-2">
                  <span className="text-[#1F4062] font-poppins text-[13px] font-semibold">
                    From :{" "}
                  </span>
                  <input
                    type="date"
                    className="w-[95px] focus:outline-none text-[#1F4062] font-poppins text-[13px]"
                  />
                </div>
                <div className="pl-2">
                  <span className="text-[#1F4062] font-poppins text-[13px] font-semibold">
                    To :{" "}
                  </span>
                  <input
                    type="date"
                    className="w-[95px] focus:outline-none text-[#1F4062] font-poppins text-[13px]"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                className="w-[99px] bg-[#1D9BF0] text-white focus:outline-none p-1 h-[30px]
            font-poppins text-[12px] rounded-md
            border-[#a4c3e3]"
              >
                Export{" "}
                <FontAwesomeIcon icon={faFileExport} size="1x" color="white" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 h-[575px] w-[1205px] p-5 bg-white shadow-[#5A91CB] shadow-sm border-2 border-[#a4c3e3] rounded-md">
          <table>
            <thead>
              <th className="text-start w-[225px]">
                <span className="font-poppins text-[#2C5B8C]  ">Date</span>
                <FontAwesomeIcon
                  className="ml-3"
                  color="#2C5B8C"
                  icon={faRightLeft}
                  size="1x"
                />
              </th>
              <th className=" text-start w-[225px]">
                <span className="font-poppins text-[#2C5B8C]  ">Time in </span>
                <FontAwesomeIcon
                  className="ml-3"
                  color="#2C5B8C"
                  icon={faRightLeft}
                  size="1x"
                />
              </th>
              <th className=" text-start w-[225px]">
                <span className="font-poppins text-[#2C5B8C]  ">Time out </span>
                <FontAwesomeIcon
                  className="ml-3"
                  color="#2C5B8C"
                  icon={faRightLeft}
                  size="1x"
                />
              </th>
              <th className=" text-start w-[225px]">
                <span className="font-poppins text-[#2C5B8C]  ">
                  Lunch Hours{" "}
                </span>
                <FontAwesomeIcon
                  className="ml-3"
                  color="#2C5B8C"
                  icon={faRightLeft}
                  size="1x"
                />
              </th>
              <th className=" p-2 text-start w-[225px]">
                <span className="font-poppins text-[#2C5B8C]  ">
                  Working Hours{" "}
                </span>
                <FontAwesomeIcon
                  className="ml-3"
                  color="#2C5B8C"
                  icon={faRightLeft}
                  size="1x"
                />
              </th>
            </thead>
            <tbody>
              <tr>
                <td className="mt-8 p-1 border-t-0 border-l-0 border-r-0  border-2 border-[#D6E3F2]">
                  <span className=" font-poppins  text-[#67a2e0]">
                    25-01-2023
                  </span>
                </td>
                <td className="mt-8 p-1 border-t-0 border-l-0 border-r-0  border-2 border-[#D6E3F2]">
                  <span className=" font-poppins  text-[#e85e38]">
                    09:46 AM
                  </span>
                </td>
                <td className="mt-8 p-1 border-t-0 border-l-0 border-r-0  border-2 border-[#D6E3F2]">
                  <span className=" font-poppins  text-[#67a2e0]">
                    09:46 AM
                  </span>
                </td>
                <td className="mt-8 p-1 border-t-0 border-l-0 border-r-0  border-2 border-[#D6E3F2]">
                  <span className=" font-poppins  text-[#67a2e0]">
                    1 Hr 00 Mins 00 Secs
                  </span>
                </td>
                <td className="mt-8 p-1 border-t-0 border-l-0 border-r-0  border-2 border-[#D6E3F2]">
                  <span className=" font-poppins  text-[#67a2e0]">
                    7 Hr 12 Mins 50 Secs
                  </span>
                </td>
              </tr>

              <tr>
                <td className="mt-8 p-1 border-t-0 border-l-0 border-r-0  border-2 border-[#D6E3F2]">
                  <span className=" font-poppins  text-[#67a2e0]">
                    25-01-2023
                  </span>
                </td>
                <td className="mt-8 p-1 border-t-0 border-l-0 border-r-0  border-2 border-[#D6E3F2]">
                  <span className=" font-poppins  text-[#2fe439]">
                    09:46 AM
                  </span>
                </td>
                <td className="mt-8 p-1 border-t-0 border-l-0 border-r-0  border-2 border-[#D6E3F2]">
                  <span className=" font-poppins  text-[#67a2e0]">
                    09:46 AM
                  </span>
                </td>
                <td className="mt-8 p-1 border-t-0 border-l-0 border-r-0  border-2 border-[#D6E3F2]">
                  <span className=" font-poppins  text-[#67a2e0]">
                    1 Hr 00 Mins 00 Secs
                  </span>
                </td>
                <td className="mt-8 p-1 border-t-0 border-l-0 border-r-0  border-2 border-[#D6E3F2]">
                  <span className=" font-poppins  text-[#67a2e0]">
                    7 Hr 12 Mins 50 Secs
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
