import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("theme")) ?? true;

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    toggleTheme: (state) =>{
      const nextState = !state; // Dark Mode
      localStorage.setItem("theme", JSON.stringify(nextState));
      return nextState;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;