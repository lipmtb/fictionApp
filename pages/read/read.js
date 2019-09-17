let app=getApp();
import { MyHandlerRequest } from '../../control/fictionDataControl/MyHandlerRequest.js';
Page({
  onLoad:function(){
    let that=this;
    this.fDetailFun = app.navigateToFictionDetail;

    //获取读者阅读过的小说
    this.myHandlerRequest = new MyHandlerRequest();
    this.myHandlerRequest.getUserHasRead().then(res => {
      let hasReadLists = res.data.readfictionlist;
      that.setData({
        hasReadFictions: hasReadLists
      });
    });
      
    },
    onPullDownRefresh:function(){
       let that=this;
      that.myHandlerRequest.getUserHasRead().then(res => {
        let hasReadLists = res.data.readfictionlist;
        that.setData({
          hasReadFictions: hasReadLists
        });
        wx.showToast({
          title: '刷新成功'
        });
        wx.stopPullDownRefresh();
      });
    }
});