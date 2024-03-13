


//获取图形验证码
const getImgVerificationCode = (nanoidStr) => {
  return window.$axios.get('/laokou/auth/v1/captchas/' + nanoidStr, { headers: { 'isLoading': false } }).then(res =>  res?.data).catch(error => {
    console.error(error)
    // 处理错误
  });
}



//获取公钥
const getPublicKey = () => {
  return window.$axios.get('laokou/auth/v1/secrets', { headers: { 'isLoading': false } }).then(res => res?.data).catch(error => {
    console.error(error)
    // 处理错误
  });;
}


//获取租户id
const getTenantsId = () => {

  return window.$axios.get('/laokou/admin/v1/tenants/id', { headers: { 'isLoading': false } }).then(res => res?.data).catch(error => {
    console.error(error)
    // 处理错误
  });;

}

//获取下拉列表 tenants/option-list
const getTenantsOptionList = () => {
  return window.$axios.get('/laokou/admin/v1/tenants/option-list', { headers: { 'isLoading': false } }).then(res => res?.data).catch(error => {
    console.error(error)
    // 处理错误
  });;

}

//登录
const login = (params) => {
  return window.$axios.post('/laokou/auth/oauth2/token', params, { headers: { 'isLoading': true, 'Authorization': 'Basic OTVUeFNzVFBGQTN0RjEyVEJTTW1VVkswZGE6RnBId0lmdzR3WTkyZE8=' } }).then(res => res?.data).catch(error => {
    console.error(error)
    // 处理错误
  });;

}



export { getImgVerificationCode, getPublicKey, getTenantsId, getTenantsOptionList, login}

