import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  user: null,
};

export const uberSlice = createSlice({
  name: "uber",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setOrigin, setDestination, setUser } = uberSlice.actions;

export const selectUser = (state) => state["uberReducer"].user[0];

export default uberSlice.reducer;
