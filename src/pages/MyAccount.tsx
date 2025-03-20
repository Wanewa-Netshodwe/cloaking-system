import React, { useEffect, useState } from "react";
import SideMenuBar from "../components/SideMenuBar";
import GraphItem from "../components/GraphItem";
import Clock from "react-clock";
import {
  faRightToBracket,
  faPen,
  faLock,
  faCamera,
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
import { GenerateAvator } from "../utils/GenerateAvator";

type Props = {};

export default function MyAccount({}: Props) {
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
    seconds: 1, // set your
    minutes: 10, // own
    hours: 22, // time here.
  };
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value2, onChange] = useState<Value>(new Date());
  return (
    <div className="w-[100vw] h-[120%] flex  bg-[#F3F8FB] border-2">
      <SideMenuBar current="MyAccount" />

      <div className="border-2 p-5 w-full flex-2 ">
        <div className="mt-8 h-[725px] w-[1150px]   bg-white shadow-[#5A91CB] shadow-sm border-2 border-[#a4c3e3] rounded-md">
          <div className="relative">
            <div className="w-full  flex items-center  justify-end bg-[#AAD9F9] h-[100px]">
              <div className="mr-16 flex gap-6">
                <FontAwesomeIcon
                  icon={faPen}
                  size="1x"
                  color="white"
                  className="hover:cursor-pointer hover:text-[#254f7b]"
                />
                <FontAwesomeIcon
                  icon={faLock}
                  size="1x"
                  color="white"
                  className="hover:cursor-pointer hover:text-[#254f7b]"
                />
              </div>
            </div>
            <div className="absolute top-3 left-[467px]">
              <div className="border-4 relative border-white flex flex-col items-center justify-center w-[160px] rounded-full p-2 ">
                <img
                  src={GenerateAvator("jj")}
                  className="w-[140px] h-[140px]  rounded-full"
                  alt="ii"
                />

                <div className="bg-gray-700  -bottom-10 p-2 h-[60px] w-[60px] items-center justify-center flex   absolute rounded-full">
                  <FontAwesomeIcon icon={faCamera} size="2x" color="white" />
                </div>
                <p className="absolute -bottom-20 font-poppins  text-center text-[#7e7e7e] text-[18px] font-semibold w-[580px]">
                  Wanewa Netshodwe
                </p>
              </div>
            </div>
            <div className="  h-[600px]  p-44 pl-48">
              <p className="font-poppins  text-[19px] w-[720px] font-semibold  ">
                Account Details
                <hr className="mt-2 border-1 border-[#83ACD8]"></hr>
              </p>
              <div className="mt-4 flex gap-5">
                <div className="w-[350px]">
                  <p className="text-[#83ACD8] font-poppins ">First Name</p>
                  <p className=" font-poppins  ">221661561</p>
                </div>
                <div className="w-[350px]">
                  <p className="text-[#83ACD8] font-poppins ">Last Name</p>
                  <p className=" font-poppins  ">221661561</p>
                </div>
              </div>
              <div className="mt-6 flex gap-5">
                <div className="w-[350px]">
                  <p className="text-[#83ACD8] font-poppins ">Contact number</p>
                  <p className=" font-poppins  ">221661561</p>
                </div>
                <div className="w-[350px]">
                  <p className="text-[#83ACD8] font-poppins ">Gender</p>
                  <p className=" font-poppins  ">221661561</p>
                </div>
              </div>
              <div className="mt-6 flex gap-5">
                <div className="w-[350px]">
                  <p className="text-[#83ACD8] font-poppins ">Student Number</p>
                  <p className=" font-poppins  ">221661561</p>
                </div>
                <div className="w-[350px]">
                  <p className="text-[#83ACD8] font-poppins ">Email</p>
                  <p className=" font-poppins  ">221661561</p>
                </div>
              </div>
              <div className="mt-6 flex gap-5">
                <div className="w-[350px]">
                  <p className="text-[#83ACD8] font-poppins ">Join Date</p>
                  <p className=" font-poppins  ">221661561</p>
                </div>
              </div>

              <div className="mt-10  w-[80%] flex justify-end ">
                <button className="bg-[#586ced] self-end p-2 w-[100px] rounded-md font-poppins text-white">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
