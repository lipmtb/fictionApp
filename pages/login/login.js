//login
let app=getApp();
let loginImgData=require('../../data/loginImg.js');
Page({
  onLoad:function(){
    this.setData({
      posterBase64Img: loginImgData.posterData
    });
    wx.getSetting({
      success: function (res) {
        //判断用户是否已登录授权
        if (res.authSetting['scope.userInfo']) {
          let userInfo=wx.getStorageSync("userInfo");
          app.myGlobalData.userInfo = userInfo;
          let token=wx.getStorageSync("token");
          if(userInfo!=null&&token!=null){
            wx.switchTab({
             url: '/pages/index/index'
            });
          }
        }
      }
    });
  },
  getLoginInfo:function(e){
    let userMessage = e.detail.userInfo;
    app.myGlobalData.userInfo = userMessage;
    wx.setStorageSync("userInfo",userMessage);//用户基本信息加到缓存
    //判断用户是否已登录授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
            /*wx.request 后台使用code去获取openId，
        判断openId在数据库中是否存在，不存在进行注册，存在则登录，更新token
        后台返回token（openId+sessionId）作为会话凭证;*/
          let myCode =wx.getStorageSync("code");
          let readerGenderStr="男";
          if(userMessage.gender==2){
            readerGenderStr="女";
          }
          wx.request({
            method: 'POST',
            url: 'http://192.168.30.12:8080/wxMobileApp/readerLogin/login',
            data: {
              code: myCode,
              nickName: userMessage.nickName,
              avatarUrl: userMessage.avatarUrl,
              readerGender: readerGenderStr
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
      
              console.log("获取到新的token: " + res.data.token);
              app.myGlobalData.token = res.data.token;
              wx.setStorageSync("token", res.data.token);

              wx.switchTab({
                url: '/pages/index/index',
              });
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1800
              });
            }
          });
      
         
        }
      }
    });
  }
});