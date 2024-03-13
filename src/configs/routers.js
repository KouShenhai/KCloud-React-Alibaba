
import { RequireAuth } from '@/configs/aouth'
import lazyLoad from '@/configs/loadable'

//路由配置
// 使用路由懒加载（lazy）
const KYLayout = lazyLoad(() => import('@/pages/KYLayout'))
const Login = lazyLoad(() => import('@/pages/Login'))
const MenuView = lazyLoad(() => import('@/pages/KYLayout/KYContent/v1/menus/view'))
const Home = lazyLoad(() => import('@/pages/Home'))
const routers = [
  /**
   * 父子路由嵌套使用
   * 父路由路径为 '/'
   * children 属性对应父路由下的子路由
   */
  {
    path: "/login",
    element: <Login/>,
  },{
    path: "/",
    element: <RequireAuth><KYLayout/></RequireAuth>,
    children: [
        {
          path: "/home",
          element: <RequireAuth><Home/></RequireAuth>,
        },
         {
          path: "/v1/menus/view",
          element: <RequireAuth><MenuView/></RequireAuth>,
        }
      ],
  }
];

export {routers};
