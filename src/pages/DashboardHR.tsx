import React, { useEffect, useState } from "react";
import { faUserGroup, faSearch } from "@fortawesome/free-solid-svg-icons";
import AnimatedNumbers from "react-animated-numbers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideMenuBarHR from "../components/SideMenuBarHR";
import WeekModal from "../components/WeekModal";
import { GenerateAvator } from "../utils/GenerateAvator";
import { GenerateInitials } from "../utils/GenerateInitials";
import "./table.css";
import HRDashboardLoader from "../components/HRDashboardLoader";
type Props = {};

export default function DashboardHR({}: Props) {
  const data = [
    {
      name: "Wanewa Blessing Netshodwe",
      timeIn: "10H25",
      timeOut: "19H25",
      email: "25527722@tut4life.ac.za",
    },
    {
      name: "John Doe",
      timeIn: "09H00",
      timeOut: "18H00",
      email: "john.doe@tut4life.ac.za",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const items_per_page = 5;
  const pages_i = Math.round(data.length / items_per_page);
  const pages = Array.from({ length: pages_i }).fill(1);
  const idx_last = currentPage * items_per_page;
  const first_index = idx_last - items_per_page;
  const current_rows = data.slice(first_index, idx_last);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <div>
      {loading ? (
        <HRDashboardLoader />
      ) : (
        <div className={`w-[100vw] z-10 h-[120%] flex bg-[#3A4C4F]    `}>
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
            <div className=" mt-5 relative">
              <input
                placeholder="Search"
                className="mt-1 placeholder:text-[#c8c9ca] placeholder:font-poppins
                        pl-7 font-poppins text-[#4c4c4d] rounded-md
                        placeholder:pl-2 focus:outline-none
                      w-[250px] h-[40px] border-2 border-[#dadbdd]"
                type="text"
              ></input>
              <FontAwesomeIcon
                className="relative  right-60"
                size="1x"
                color="#4c4c4d"
                icon={faSearch}
              />
            </div>

            <table cellPadding="10" cellSpacing={"50"} className="mt-8 ">
              <thead className="p-1">
                <th className="w-[350px]">
                  <p className=" text-start font-poppins font-semibold">
                    Employee Name
                  </p>
                </th>
                <th className="w-[450px]">
                  <p className=" text-start font-poppins font-semibold">
                    clock-in && clock-out
                  </p>
                </th>
                <th className="w-[430px]">
                  <p className=" text-start font-poppins font-semibold">
                    Email Address
                  </p>
                </th>
              </thead>
              <tbody>
                {current_rows.map((val) => {
                  return (
                    <tr className="  rounded-lg ">
                      <td>
                        <div className=" gap-3 flex w-[180px] items-center right-0">
                          <img
                            src={GenerateAvator(`${val.name}`)}
                            className="w-[30px] h-[30px] rounded-full"
                            alt="imagek"
                          />

                          <p className="font-poppins font-semibold mt-[1px]">
                            {GenerateInitials(`${val.name}`)}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-5">
                          <p className="font-poppins font-semibold text-[14px]">
                            {val.timeIn}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <div className="bg-gray-400 h-3 w-3 rounded-full"></div>
                              <div className="bg-gray-400 h-1 w-8 "></div>
                            </div>
                            <span className="font-poppins text-[11px] text-gray-400">
                              7h 45m
                            </span>
                            <div className="flex items-center">
                              <div className="bg-gray-400 h-1 w-8 "></div>
                              <div className="bg-gray-400 h-3 w-3 rounded-full"></div>
                            </div>
                          </div>
                          <p className="font-poppins font-semibold text-[14px]">
                            {val.timeIn}
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className="font-poppins font-semibold text-[14px]">
                          {val.email}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-4 ">
              <div className="flex gap-2  w-[96%] justify-end ">
                {pages.length > 1 &&
                  pages.map((_, idx) => {
                    return (
                      <button
                        onClick={() => {
                          setCurrentPage(idx + 1);
                        }}
                        className={`p-1  rounded-md w-[40px] ${
                          idx + 1 === currentPage ? "bg-[#3A4C4F]" : "bg-white "
                        } 
            ${idx + 1 === currentPage ? "text-white" : "text-[#3A4C4F] "}
            font-poppins font-semibold `}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
