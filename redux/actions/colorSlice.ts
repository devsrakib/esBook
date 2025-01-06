import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainColor: "#168F88", // Default main color
  background: "#F4F6FF",
  text: "#7F7F7F",
};

const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    setMainColor: (state, action) => {
      state.mainColor = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.background = action.payload;
    },
    setTextColor: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setMainColor, setBackgroundColor, setTextColor } = colorSlice.actions;
export default colorSlice.reducer;
