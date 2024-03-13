import { createSlice } from '@reduxjs/toolkit';
import { Home } from '@/constants/constant'


const profile = {
  id: '',
  avatar: '',
  username: '',
  mobile: '',
  mail: '',
  traceId: '',
  tenantId: '',
  superAdmin: '',
  permissionList: []
}


const homeSlice = createSlice({
  name: [Home],
  initialState: profile,
  reducers: {
    initialProfile: (state, action) => {
      state.id = action.payload.id;
      state.avatar = action.payload.avatar;
      state.username = action.payload.username;
      state.mobile = action.payload.mobile;
      state.mail = action.payload.mail;
      state.traceId = action.payload.traceId;
      state.tenantId = action.payload.tenantId;
      state.superAdmin = action.payload.superAdmin;
      state.permissionList = action.payload.permissionList;
    },
    getUserInfoState: (state) => {
      const userInfo = {
        id: state.id,
        avatar: state.avatar,
        username: state.username,
        mobile: state.mobile,
        mail: state.mail,
        traceId: state.traceId,
        tenantId: state.tenantId,
        superAdmin: state.superAdmin
      }
      return userInfo;
    },
    getUserProfileAll: (state) => {
      return state.permissionList
    },
    getUserProfileByType: (state, action) => {
      const type = action.payload.type;
      const permission = state.permissionList
      if (permission.length > 0) {
        return permission.filter(string => {
          const sourceType = string.split(':')[0]
          if (sourceType === type) {
            return string;
          }
          return null
        })
      }
      return []
    }
  },
});

export const { initialProfile, getUserInfoState, getUserProfileAll, getUserProfileByType } = homeSlice.actions;
export default homeSlice.reducer;

// 创建选择器
export const selectHome = (state) => state.Home;



