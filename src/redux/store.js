import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/redux/reducers/loginReducer";
import homeReducer from "@/redux/reducers/homeReducer";
import headerReducer from "@/redux/reducers/headerReducer";
const store = configureStore({
  reducer:{
    Login:loginReducer,
    Home:homeReducer,
    Header:headerReducer,
  }
});
console.log("store",store)
export default store;
