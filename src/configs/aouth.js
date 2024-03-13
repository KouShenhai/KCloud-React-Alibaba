import { Navigate } from 'react-router-dom'
// RequireAuth 组件相当于一个拦截器，是否返回被拦截的组件要听他的
const  RequireAuth =({ children })=> {
  // const loginReducer = useSelector(getLoginState);
  const token = localStorage.getItem('access_token');
  return token !== null&&token!==undefined&&token!=='' ? ( // 判断 localstorage 中登录状态是否为 true
    children
  ) : (
    <Navigate to="/login"  replace /> // 跳转到登录
  );
}

export {RequireAuth}