App({
  onLaunch: function() {
    let that = this;
    //用户登录或注册wx.login
    wx.login({
      success: function(res) {
        console.log(res.code);
        that.myGlobalData.code = res.code;
        wx.setStorageSync("code", res.code); //code用于后台获取token
        /*wx.request 后台使用code去获取openId，
        判断openId在数据库中是否存在，不存在进行注册，存在则登录，更新token
        后台返回token（openId+sessionId）作为会话凭证;*/
    wx.getSetting({
      success: function (res) {
        //判断用户是否已登录授权,已经授权过的更新token
        if (res.authSetting['scope.userInfo']) {
           let myCode=wx.getStorageSync("code");
           let userInfo=wx.getStorageSync("userInfo");
           let readerSex="男";
           if(userInfo.gender==2){
             readerSex="女";
           }
          wx.request({
            method:'POST',
            url:'http://192.168.30.12:8080/wxMobileApp/readerLogin/login',
             data:{
               code: myCode,
               nickName: userInfo.nickName,
               avatarUrl:userInfo.avatarUrl,
               readerGender: readerSex
             },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
             success:function(res){
               console.log("获取到新的token: " + res.data.token);
               that.myGlobalData.token = res.data.token;
               wx.setStorageSync("token", res.data.token);
            }
          });
        }
      }
      });
        
      }
    });


  },
  navigateToFictionDetail: function(e) {
    let tar = e.currentTarget;
    let fictionId = tar.dataset.fictionId;
    wx.navigateTo({
      url: '/pages/fictionDetail/fictionDetail?fId=' + fictionId
    });
  },
  myGlobalData: {
    userInfo: null, //用户基本信息
    token: "", //会话凭证
    code: '' //用于后台换取openId和token,只能在5分钟内使用一次

  }
});