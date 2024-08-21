//External Lib Import
import { configureStore } from "@reduxjs/toolkit";

//Internal Import
import LoaderSlice from "../slices/LoaderSlice";
import SettingSlice from "../slices/SettingSlice";
import AuthSlice from "../slices/AuthSlice";
import UserSlice from "../slices/UserSlice";


const store = configureStore({
  reducer: {
    Loader: LoaderSlice,
    Setting: SettingSlice,
    Auth: AuthSlice,
    User: UserSlice,

  },
});

export default store;
