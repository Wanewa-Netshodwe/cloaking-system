import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  fullName: string;
  surname: string;
  password: string;
  contactNo: string;
  emailAddress: string;
  studentNumber: string;
  gender: string;
  createdAt: Date;
  profile_pic: string;
};

const initialState: UserState = {
  profile_pic: "",
  fullName: "",
  surname: "",
  password: "",
  contactNo: "",
  emailAddress: "",
  studentNumber: "",
  gender: "",
  createdAt: new Date(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.fullName = action.payload.fullName;
      state.surname = action.payload.surname;
      state.password = action.payload.password;
      state.contactNo = action.payload.contactNo;
      state.gender = action.payload.gender;
      state.studentNumber = action.payload.studentNumber;
      state.emailAddress = action.payload.emailAddress;
    },
  },
});

// Export the actions
export const { setUserDetails } = userSlice.actions;

// Export the reducer to be added to the store
export default userSlice.reducer;
