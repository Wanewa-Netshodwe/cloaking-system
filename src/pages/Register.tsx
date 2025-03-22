import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, useNavigate } from "react-router-dom";
import { setUserDetails, UserState } from "../redux/UserSlice";
import Spinner from "../components/Spinner";
import axios from "axios";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [student_num, setStudentNum] = useState("");
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    if (!valid) {
      setTimeout(() => {
        setValid(true);
      }, 2000);
    }
  }, [valid]);
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };
  const handleChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstname(event.target.value);
  };
  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };
  const handleChangeStudentNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudentNum(event.target.value);
  };
  const handleChangeGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };
  const handleChangeContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact(event.target.value);
  };

  const handleRegistration = async (e: React.FormEvent) => {
    if (confirmPassword !== password) {
      setValid(false);
    } else {
      setLoading(true);
      let obj = {
        fullName: first_name,
        surname: last_name,
        contactNo: contact,
        emailAddress: email,
        studentNumber: student_num,
        gender: gender,
        password,
      };
      try {
        const result = await axios.post(
          "http://localhost:8092/api/create",
          obj,
          {
            headers: { role: "student" },
          }
        );
        if (result.status === 201) {
          setLoading(false);
          console.log(new Date(result.data.createdAt));
          let usr: UserState = {
            id: result.data.id,
            clocked_in: false,
            profile_pic: result.data.profile_pic,
            contactNo: result.data.contactNo,
            emailAddress: result.data.emailAddress,
            fullName: result.data.fullName,
            gender: result.data.gender,
            password: result.data.password,
            studentNumber: result.data.studentNumber,
            surname: result.data.surname,
            createdAt: new Date(result.data.createdAt),
          };
          dispatch(setUserDetails(usr));
          nav("/Dashboard");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
        }
      }
    }
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
                onChange={handleChangeFirstName}
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
                onChange={handleChangeLastName}
                placeholder="Last Name "
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
                onChange={handleChangeContact}
                placeholder="Contact Number "
                className="mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8]
                placeholder:pl-2 focus:outline-none rounded-md
              w-[250px] h-[35px] border-2 border-[#83ACD8]"
                type="text"
              ></input>
            </div>

            <div className="mt-5 ">
              <p className="font-poppins font-semibold text-[15px]">Gender</p>

              <select
                onChange={handleChangeGender}
                className=" w-[250px]  text-[#83ACD8] focus:outline-none pl-2  h-[35px] border-2 rounded-md border-[#83ACD8]"
              >
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
                onChange={handleChangeEmail}
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
                onChange={handleChangePassword}
                placeholder="Password "
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
                onChange={handleChangeConfirmPassword}
                placeholder="Confirm Password"
                className={`mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8]
                placeholder:pl-2 focus:outline-none rounded-md
              w-[250px] h-[35px] border-2  border-[#83ACD8]
             `}
                type="password"
              ></input>

              {!valid && (
                <>
                  <p className="font-poppins text-[#a12020] font-semibold text-[11px]">
                    Passwords dont match
                  </p>
                </>
              )}
            </div>
          </div>

          <div className=" flex gap-16 mb-1">
            <div className="mt-5 ">
              <p className="font-poppins font-semibold text-[15px]">
                Student Number
              </p>
              <input
                onChange={handleChangeStudentNumber}
                placeholder="Student Number"
                className="mt-1 placeholder:text-[#83ACD8] placeholder:font-poppins
                pl-2 font-poppins text-[#83ACD8] rounded-md
                placeholder:pl-2 focus:outline-none
              w-[250px] h-[35px] border-2 border-[#83ACD8]"
                type="text"
              ></input>
            </div>
          </div>
          <button
            onClick={handleRegistration}
            className=" gap-3 mt-5 hover:bg-[#2b81ba] items-center flex justify-center font-poppins text-white bg-[#1D9BF0] w-[565px] p-2  rounded-md "
          >
            {" "}
            Register
            {loading && <Spinner color="green" />}
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
