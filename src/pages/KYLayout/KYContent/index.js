import React, {Suspense }from 'react'
import { Layout, theme } from 'antd';
import { Outlet} from "react-router-dom";



export default function KYContent() {
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      style={{
        margin: '160px 16px 24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        borderTopLeftRadius: 0
      }}
    >
     <Suspense fallback={<div>loading...</div>}></Suspense>
      <Outlet />
    </Content>
  )
}
