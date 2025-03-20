import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex  min-h-screen bg-gray-100">
      <div className="bg-[#C6E6FB]  w-full  items-center">
        <div className=" self-center p-12  ">
          <h1 className="font-poppins font-semibold text-[30px]">Login</h1>
          <h1 className="font-poppins font-semibold text-[25px] mt-2">
            Welcome Back
          </h1>
          <p className="font-poppins font-light text-[16px] mt-2">
            Please enter your Attendance credentials.
          </p>

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
              w-[565px] h-[35px] border-2 border-[#83ACD8]"
                type="text"
              ></input>
            </div>
          </div>
          <div className=" flex gap-16 mb-1">
            <div className="mt-5 ">
              <p className="font-poppins font-semibold text-[15px]">Password</p>
              <input
                placeholder="First Name "
                className="mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8]
                placeholder:pl-2 focus:outline-none rounded-md
              w-[565px] h-[35px] border-2 border-[#83ACD8]"
                type="password"
              ></input>
            </div>
          </div>
          <p className="mt-5 text-end mr-24 text-[#5A91CB] text-poppins font-semibold ">
            <a className="text-[#1D9BF0]" href="/">
              Forgot Password?
            </a>
          </p>

          <button
            onClick={handleSubmit}
            className=" mt-5 hover:bg-[#2b81ba] font-poppins text-white bg-[#1D9BF0] w-[565px] p-2  rounded-md "
          >
            Login
          </button>
          <p className="mt-5 text-center mr-24 text-[#5A91CB] text-poppins font-semibold ">
            Don't you have account?
            <a className="text-[#1D9BF0]" href="/">
              Register
            </a>
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-r  from-[#72C0F6] via-[#56B4F4] to-[#1D9BF0] w-full"></div>
    </div>
  );
};

export default SignInPage;
