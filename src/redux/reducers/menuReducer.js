import { createSlice } from '@reduxjs/toolkit';
import { Login } from '@/constants/constant'


const defaultState = {
  username: '',
  loginState: false,
  token:'',
}


const loginSlice = createSlice({
  name: [Login],
  initialState: defaultState,
  reducers: {
    setUserName: (state,action) => {
      state.username =action.payload.username;
      state.password =action.payload.password;
    },
    setToken: (state,action) => {
      state.token =action.payload.token;
    },
    setLoginState: (state,action) => {
      state.loginState =action.payload.loginState;
    },
    getLoginState: (state) => {
      return state.loginState;
    },
    reset: (state) => state.token = ''
  },
});

export const { setUserName, setToken,setLoginState,getLoginState,reset } = loginSlice.actions;
export default loginSlice.reducer;

// 创建选择器
export const selectLogin = (state) => state.Login;



