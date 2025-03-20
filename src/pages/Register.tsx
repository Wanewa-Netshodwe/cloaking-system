import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, useNavigate } from "react-router-dom";
import { setUserDetails } from "../redux/UserSlice";

const RegistrationPage = () => {
  const [fullName, setFullName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let obj = {
      fullName,
      surname,
    };
    dispatch(setUserDetails(obj));
    nav("/Dashboard");
  };

  return (
    <div className="flex  min-h-screen bg-gray-100">
      <div className="bg-[#C6E6FB]  w-full  items-center">
        <div className=" self-center p-12  ">
          <h2 className="font-poppins font-semibold text-[30px]">Register</h2>
          <p className="font-poppins font-light text-[16px] mt-2">
            Welcome to the Attendance Registration page! Please fill in<br></br>
            the required information to create your account.
          </p>
          <div className=" flex gap-16 mb-1">
            <div className="mt-5 ">
              <p className="font-poppins font-semibold text-[15px]">
                First Name
              </p>
              <input
                placeholder="First Name "
                className="mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8] rounded-md
                placeholder:pl-2 focus:outline-none
              w-[250px] h-[35px] border-2 border-[#83ACD8]"
                type="text"
              ></input>
            </div>

            <div className="mt-5 ">
              <p className="font-poppins font-semibold text-[15px]">
                Last Name
              </p>
              <input
                placeholder="First Name "
                className="mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8]
                placeholder:pl-2 focus:outline-none rounded-md
              w-[250px] h-[35px] border-2 border-[#83ACD8]"
                type="text"
              ></input>
            </div>
          </div>
          <div className=" flex gap-16 mb-1">
            <div className="mt-5 ">
              <p className="font-poppins font-semibold text-[15px]">
                Contact No
              </p>
              <input
                placeholder="First Name "
                className="mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8]
                placeholder:pl-2 focus:outline-none rounded-md
              w-[250px] h-[35px] border-2 border-[#83ACD8]"
                type="text"
              ></input>
            </div>

            <div className="mt-5 ">
              <p className="font-poppins font-semibold text-[15px]">Gender</p>

              <select className=" w-[250px]  text-[#83ACD8] focus:outline-none pl-2  h-[35px] border-2 rounded-md border-[#83ACD8]">
                <option className="font-poppins ">Male</option>
                <option className="font-poppins">Female</option>
              </select>
            </div>
          </div>
          <div className=" flex gap-16 mb-1">
            <div className="mt-5 ">
              <p className="font-poppins font-semibold text-[15px]">
                Email Address
              </p>
              <input
                placeholder="Example@.org "
                className="mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8] rounded-md
                placeholder:pl-2 focus:outline-none
              w-[565px] h-[35px] border-2 border-[#83ACD8]"
                type="email"
              ></input>
            </div>
          </div>
          <div className=" flex gap-16 mb-1">
            <div className="mt-5 ">
              <p className="font-poppins font-semibold text-[15px]">Password</p>
              <input
                placeholder="First Name "
                className="mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8] rounded-md
                placeholder:pl-2 focus:outline-none
              w-[250px] h-[35px] border-2 border-[#83ACD8]"
                type="password"
              ></input>
            </div>

            <div className="mt-5 ">
              <p className="font-poppins font-semibold text-[15px]">
                Confirm Password
              </p>
              <input
                placeholder="First Name "
                className="mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8]
                placeholder:pl-2 focus:outline-none rounded-md
              w-[250px] h-[35px] border-2 border-[#83ACD8]"
                type="password"
              ></input>
            </div>
          </div>

          <div className=" flex gap-16 mb-1">
            <div className="mt-5 ">
              <p className="font-poppins font-semibold text-[15px]">
                Student Number
              </p>
              <input
                placeholder="First Name "
                className="mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8] rounded-md
                placeholder:pl-2 focus:outline-none
              w-[250px] h-[35px] border-2 border-[#83ACD8]"
                type="text"
              ></input>
            </div>
          </div>
          <button className=" mt-5 hover:bg-[#2b81ba] font-poppins text-white bg-[#1D9BF0] w-[565px] p-2  rounded-md ">
            Register
          </button>
          <p className="mt-5 text-center mr-24 text-[#5A91CB] text-poppins font-semibold ">
            Already have account?
            <a className="text-[#1D9BF0]" href="sign-in">
              Login
            </a>
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-r  from-[#72C0F6] via-[#56B4F4] to-[#1D9BF0] w-full"></div>
    </div>
  );
};

export default RegistrationPage;
