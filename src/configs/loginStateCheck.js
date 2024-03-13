//检查登录状态 长时间未操作 自行下线，超过token 有效期 自动续命
  const loginStateCheck = function (){
    const loginStateCheck = setInterval(function() {
    var currentTime = new Date();
    console.log(currentTime);
  }, 1000); 
  return loginStateCheck;
}

  const claerLoginStateCheck = function (){ clearTimeout(loginStateCheck); }

  export {loginStateCheck,claerLoginStateCheck}




