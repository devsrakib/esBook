// backgroundColorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const backgroundColorSlice = createSlice({
  name: 'backgroundColor',
  initialState: {
    value: '#ffffff', // Default color
  },
  reducers: {
    setBackgroundColor: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBackgroundColor } = backgroundColorSlice.actions;
export default backgroundColorSlice.reducer;
