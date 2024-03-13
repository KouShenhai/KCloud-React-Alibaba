import React, { useEffect } from 'react';
import { Layout, theme } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getHomeProfile, getHomeMessage } from '@/api/homeApi'
import { selectHome, initialProfile, getUserInfoState, getUserProfileAll, getUserProfileByType } from '@/redux/reducers/homeReducer'
import lazyLoad from '@/configs/loadable'
import '@/css/home.css'
// import KYContent from '@/pages/Home/KYContent';


const KYMenu = lazyLoad(() => import('@/pages/KYLayout/KYMenu'))
const KYHeader = lazyLoad(() => import('@/pages/KYLayout/KYHeader'))
const KYContent = lazyLoad(() => import('@/pages/KYLayout/KYContent'))

export default function Home() {
  // const homeReducer = useSelector(selectHome);
  const dispatch = useDispatch();

  useEffect(() => {
    getHomeProfile().then(res => {
      const id = res?.data?.id;
      const username = res?.data?.username;
      const avatar = res?.data?.avatar;
      const mobile = res?.data?.mobile;
      const mail = res?.data?.mail;
      const traceId = res?.data?.traceId;
      const tenantId = res?.data?.tenantId;
      const superAdmin = res?.data?.superAdmin;
      const permissionList = res?.data?.permissionList;

      if (id) {
        localStorage.setItem('User-Id', id);
      }
      if (username) {
        localStorage.setItem('User-Name', username);
      }
      dispatch(initialProfile({ id, username, avatar, mobile, mail, traceId, tenantId, superAdmin, permissionList }))
    });

  }, [])


  useEffect(() => {
    getHomeMessage().then(res => {
      console.log("getHomeMessage", res?.data)
    })

  }, [])

  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <KYMenu />
      <Layout style={{ width: '100%', height: '100%' }}>
        <KYHeader />
        <KYContent />
      </Layout>
    </Layout>
  );
};
