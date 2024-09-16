//External Lib Import
import { createSlice } from "@reduxjs/toolkit";
import SessionHelper from "../../helpers/SessionHelper";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    UserDetails: SessionHelper.GetUserDetails() || undefined,
    role: SessionHelper.GetUserRole() || undefined,
  },
  reducers: {
    SetUserDetails(state, action) {
      SessionHelper.SetUserDetails(action.payload);
      state.UserDetails = SessionHelper.GetUserDetails() || undefined;
    },
    SetUserRole(state, action) {
      SessionHelper.SetUserRole(action.payload);
      state.role = SessionHelper.GetUserRole() || undefined;
    },
    RemoveUserDetails(state, action) {
      SessionHelper.RemoveUserDetails();
      state.UserDetails = SessionHelper.GetUserDetails() || undefined;
    },
    RemoveUserRole(state, action) {
      SessionHelper.RemoveUserRole();
      state.role = SessionHelper.GetUserRole() || undefined;
    },
  },
});

export const { SetUserDetails, RemoveUserDetails, SetUserRole, RemoveUserRole } = UserSlice.actions;
export default UserSlice.reducer;
