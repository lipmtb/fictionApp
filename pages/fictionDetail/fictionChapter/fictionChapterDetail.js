import { MyHandlerRequest } from '../../../control/fictionDataControl/MyHandlerRequest.js';
Page({
  onLoad: function (fromPage) {
    let that=this;
    let fId=fromPage.fId;
    let fName=fromPage.fName;
    let chapterNum = fromPage.chapterId;
    let myHandlerRequest = new MyHandlerRequest();
    myHandlerRequest.getFictionChapterContent(fId,chapterNum).then(res=>{
      wx.setNavigationBarTitle({
        title: fName + '第' + chapterNum + '章'
      });
      that.setData({
        fictionName: fName,
        chapterNum: chapterNum,
        fId: fId,
        chapterContent: res.data.chapterContent
      });
    });
  
  },
  onReady:function(){
    
  }
});