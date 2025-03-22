import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    time: 0,
    running: false,
  },
  reducers: {
    increment: (state) => {
      if (state.running) {
        state.time += 1;
      }
    },
    startTimer: (state) => {
      state.running = true;
    },
    stopTimer: (state) => {
      state.running = false;
    },
    resetTimer: (state) => {
      state.time = 0;
      state.running = false;
    },
  },
});

export const { increment, startTimer, stopTimer, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;
