import { createSlice } from '@reduxjs/toolkit';
import { Header } from '@/constants/constant'


const defaultState = {collapsed:true}


const headerSlice = createSlice({
  name: [Header],
  initialState: defaultState,
  reducers: {    
    setCollapsed: (state) => {
      state.collapsed=!state.collapsed;
    },
    getCollapsed: (state) => {
     return state.collapsed;
    }
  }
});

export const { setCollapsed,getCollapsed} = headerSlice.actions;
export default headerSlice.reducer;

// 创建选择器
export const selectHeader = (state) => state.Header;



