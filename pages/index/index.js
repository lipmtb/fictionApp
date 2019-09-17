//index
let app=getApp();
import { MyHandlerRequest } from '../../control/fictionDataControl/MyHandlerRequest.js';
Page({
  //index页面初始数据
  data:{
    hotNameList: [],
    hotListHidden:true,
    curClass:'奇幻',
    curClassTypeId:1,
    curFictionLists:[]
  },
  //创建动画的函数
  createAnimation:function(){
    let myAnimation=wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin:'50% 50% 0rpx'
    });
    return myAnimation;
 
  },
  //页面开始加载的初始状态
  onLoad:function(){
    let that=this;
    this.fDetailFun = app.navigateToFictionDetail;//小说详情跳转方法
    /*加载初始热门分类为1*/ 
    let myPromise= new MyHandlerRequest();
    myPromise.getFictionListByTypeId(this.data.curClassTypeId).then(res=>{
      let fictionLists = res.data.fictionlist;
      that.setData({
        curFictionLists: fictionLists
      });
    });

    myPromise.getFictionTypeNameList().then(res=>{
      let hotNameList = res.data.typeNameList;
      that.setData({
        hotNameList: hotNameList
      });
    });
    
  },
   //热门类名列表显示和隐藏,以及箭头动画切换
  showHidClass:function(){
   //热门类名列表显示和隐藏
    let boolHid = this.data.hotListHidden;
    boolHid=!boolHid;
   
    //三个箭头动画
    let that=this;
    that.myAnimation = that.createAnimation();
    if (!boolHid){
      that.myAnimation.rotate(90).step();
    }else{
      that.myAnimation.rotate(-90).step();
    }
  
    that.setData({
      hotListHidden: boolHid,
      animationShow:that.myAnimation.export()
    });

  },
  //类名列表选择关闭列表，并改变当前分类
  selClassName:function(e){
     let tar=e.target;
     let that=this;
     if(Object.keys(tar.dataset).length>0){       //if start
       let newSeletedClass = tar.dataset.typeName;

        /*用户切换分类*/
       this.data.curClassTypeId = tar.dataset.typeId;
       
       let myPromise = new MyHandlerRequest();
       myPromise.getFictionListByTypeId(this.data.curClassTypeId).then(res => {
         let fictionLists = res.data.fictionlist;
         that.setData({
           hotListHidden: !that.data.hotListHidden,
           curClass: newSeletedClass,
           curFictionLists: fictionLists
         });
       });
      
     }                                           //if end
    
  }
});