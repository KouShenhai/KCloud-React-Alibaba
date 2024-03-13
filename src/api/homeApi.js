
//获取菜单
const getHomeMenu = ()=>{
    return window.$axios.get('/laokou/admin/v1/menus/tree-list', { headers: { 'isLoading': false } }).then(res => res.data).catch(error => {
        console.error(error)
        // 处理错误
      });
}


//登录成功获取页面权限配置 以及账号信息
const getHomeProfile = ()=>{
    return window.$axios.get('/laokou/admin/v1/users/profile', { headers: { 'isLoading': false } }).then(res => res?.data).catch(error => {
      console.error(error)
      // 处理错误
    });
  }


const getHomeMessage = ()=>{
    return window.$axios.get('/laokou/admin/v1/messages/unread-count', { headers: { 'isLoading': false } }).then(res => res.data).catch(error => {
        console.error(error)
        // 处理错误
      });
}


export { getHomeMenu, getHomeProfile, getHomeMessage}


