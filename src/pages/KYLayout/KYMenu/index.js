import React, { useState, useEffect,Suspense } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { selectHeader } from '@/redux/reducers/headerReducer'
import { getHomeMenu } from '@/api/homeApi'
import { NavLink } from "react-router-dom";

const { Sider } = Layout;


function getMenus(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label: <NavLink to={key}>{label}</NavLink>,
    type,
  };
}
function setMenusList(childrens, menus) {
  let menusSize = childrens.length;
  for (let i = 0; i < menusSize; i++) {
    const data = childrens[i];
    const id = data?.id;
    const label = data?.name;
    const path = data?.path;
    const permission = data?.permission;
    // const icon = data?.icon;
    const pid = data?.pid;
    const type = data?.type;
    const sort = data?.sort;
    const url = data?.url;
    const visible = data?.visible;
    const children = data?.children;

    if (undefined !== children || null !== children) {
      const childrenMenus = setMenusList(children, []);

      const menu = getMenus(label, url, <SettingOutlined />, childrenMenus.length > 0 ? childrenMenus : null, type);
      menus.push(menu)
    } else {
      const menu = getMenus(label, url, <SettingOutlined />, null, type);
      menus.push(menu)
    }

    //  console.log('menu',menu)

  }
  return menus;
}




export default function KYMenu() {

  const headerReducer = useSelector(selectHeader);
  const dispatch = useDispatch();
  const collapsed = headerReducer.collapsed;

  const [menus, setMenus] = useState([]);

  console.log('menus', menus)


  useEffect(() => {
    getHomeMenu().then(res => {
      console.log("getHomeMenu", res?.data)
      const menusData = res?.data;
      let childrens = menusData?.children;
      if (null !== childrens && undefined !== childrens) {


        let menusSize = childrens.length;
        if (menusSize > 0) {
          const menuList = []
            //首页
            menuList.push(getMenus('首页', '/home', <HomeOutlined />,  null, 0))
          setMenusList(childrens, menuList)
          console.log('menuList', menuList)
          setMenus(menuList)
        }
      }
    })

  }, [])

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menus}
      />
    </Sider>
  )
}
