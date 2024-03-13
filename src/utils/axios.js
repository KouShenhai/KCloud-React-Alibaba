//utils文件夹下request.js中配置

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { message, Spin } from 'antd';
import '@/css/loading.css'
import { nanoid } from '@reduxjs/toolkit';

const instance = axios.create({
    // baseURL: process.env.BASE_URL, // 设置请求的base url
    timeout: 20000, // 设置超时时长'
    headers: {
        'Cache-Control': 'max-age=3600', // 设置缓存的最大有效时间为1小时
        'Expires': new Date(Date.now() + 3600000).toUTCString()
    }
})

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


// 当前正在请求的数量
let requestCount = 0

// 显示loading
function showLoading() {
    if (requestCount === 0) {
        var dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        document.body.appendChild(dom)
        ReactDOM.createRoot(dom).render(<Spin size="large" />)
    }
    requestCount++
}

// 隐藏loading
function hideLoading() {
    requestCount--
    if (requestCount === 0) {
        document.body.removeChild(document.getElementById('loading'))
    }
}

// 请求前拦截
instance.interceptors.request.use(config => {
    console.log("request.config", config)
    // requestCount为0，才创建loading, 避免重复创建
    if (config.headers.isLoading !== false) {
        showLoading()
    }
    const token = localStorage.getItem('access_token');
    const userId = localStorage.getItem('User-Id');
    const userName = localStorage.getItem('User-Name');
    const tenantId = localStorage.getItem('Tenant-Id');
 
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (userId) {
        config.headers['User-Id'] = userId
    }
    if (userName) {
        config.headers['User-Name'] = userName
    }
    if (tenantId) {
        config.headers['Tenant-Id'] = tenantId
    }
    if (userId) {
        config.headers['Trace-Id'] = userId +'-'+nanoid()
    } else {
        config.headers['Trace-Id'] = '' + nanoid()
    }

    return config
}, err => {
    console.log("request.err", err)
    // 判断当前请求是否设置了不显示Loading
    if (err.config.headers.isLoading !== false) {
        hideLoading()
    }
    return Promise.reject(err)
})

// 返回后拦截
instance.interceptors.response.use(res => {
    console.log("response.res", res)

    // 判断当前请求是否设置了不显示Loading
    if (res.config.headers.isLoading !== false) {
        hideLoading()
    }
    if(res?.data.code === 401){    
       localStorage.removeItem('access_token');
       localStorage.removeItem('refresh_token');
       localStorage.removeItem('expires_in');
       localStorage.removeItem('User-Id');
       localStorage.removeItem('User-Name');
       localStorage.removeItem('Tenant-Id');
          message.warning('登录失效')
          setInterval(()=>{
          window.location.href='/'
          },1000);
       return {}
    }else{
        return res
    }
  
}, err => {
    console.log("response.err", err)

    console.log("response.config", err.config)

    if (err.config.headers.isLoading !== false) {
        hideLoading()
    }
    if (err.message === 'Network Error') {
        message.warning('网络连接异常！')
    }
    if (err.code === 'ECONNABORTED') {
        message.warning('请求超时，请重试')
    }
    if (err.code === 'ERR_BAD_RESPONSE') {
        message.warning('网络异常')
    }
    return Promise.reject(err)
})

// 把组件引入，并定义成原型属性方便使用
React.Component.prototype.$axios = instance;

export default instance


/*

// 1. 引入自定义axios文件路径
// 2. 引入共用css文件（loading样式）
// 3. 在react组件中正常写法请求url即可
componentDidMount () {
    axios({
      url: '/manage/statistic/base_count.do'
    }).then(res => {
      this.setState(res.data)
    })
}


不加loading效果，这样写
axios({
  url: '/manage/statistic/base_count.do',
  headers: {
    'isLoading': false
  }
}).then(res => {
  this.setState(res.data)
})

*/