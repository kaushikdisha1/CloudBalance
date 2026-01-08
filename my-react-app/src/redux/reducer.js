import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const splitName = (name = "") => {
  const parts = name.trim().split(" ");
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || "",
  };
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const payload = action.payload;

      // ✅ Normalize backend response
      const { firstName, lastName } = splitName(payload.name);

      state.user = {
        ...payload,
        firstName,
        lastName,
      };
    },

    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUserData, logoutUser } = userSlice.actions;
export default userSlice.reducer;
