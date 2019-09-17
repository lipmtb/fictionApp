//collect js
let app=getApp();
import { MyHandlerRequest } from '../../control/fictionDataControl/MyHandlerRequest.js';
Page({
  data:{
   
  },
  onLoad:function(){
    let that=this;
    this.fDetailFun = app.navigateToFictionDetail;

    let todayDate=new Date();
    let hour=todayDate.getHours();
    let welcomeStr='';
 
    if (hour < 12) {
        welcomeStr='早上好';  
      }else if (hour < 14) {
        welcomeStr = '中午好';
      }else if (hour < 18) {
        welcomeStr = '下午好';
      }else if(hour<24){
          welcomeStr = '晚上好';
      }else{
        welcomeStr = '欢迎';
      }
    
    //已经收藏的小说数据
    this.myHandlerRequest = new MyHandlerRequest();
    let userInfo=wx.getStorageSync("userInfo");
    this.myHandlerRequest.getCollectListByUserId().then(res=>{
      let collectLists = res.data.collectfictionlist;
      that.setData({
        userInfoObj: userInfo,
        welcomeTime: welcomeStr,
        myCollectFictions: collectLists
      });

      if (collectLists.length == 0) {
        wx.showToast({
          title: '暂时无收藏'
        });
      }

    });
    
  },
  onPullDownRefresh:function(){
    let that=this;
    this.myHandlerRequest.getCollectListByUserId().then(res => {
      let collectLists = res.data.collectfictionlist;
      that.setData({
        myCollectFictions: collectLists
      });

        wx.showToast({
          title:'刷新成功'
        });
      wx.stopPullDownRefresh();
    });
  }
   
});