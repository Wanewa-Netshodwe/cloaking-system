import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  fullName: string;
  surname: string;
  password: string;
};

const initialState: UserState = {
  fullName: "",
  surname: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.fullName = action.payload.fullName;
      state.surname = action.payload.surname;
      state.password = action.payload.password;
    },
  },
});

// Export the actions
export const { setUserDetails } = userSlice.actions;

// Export the reducer to be added to the store
export default userSlice.reducer;
