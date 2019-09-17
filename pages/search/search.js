//search
let app=getApp();
import { MyHandlerRequest } from '../../control/fictionDataControl/MyHandlerRequest.js';
Page({
  data:{
    goodLists:[],
    searchLists:[],
    searchTextList:[], //搜索建议列表
    goodHidShow:true,
    searchHidShow:false,
    goodSwitchText:'展开',
    searchSwitchText:'关闭',
    searchValue:'', //搜索框内容
    searchTipShowHid:true //搜索提示面板显示和隐藏
  },
  onLoad:function(){
    let that=this;
    this.fDetailFun = app.navigateToFictionDetail;
      
    this.myHandlerRequest = new MyHandlerRequest();
    this.myHandlerRequest.getGoodFiction().then(res=>{
      that.setData({
        goodLists: res.data.fictionlist
      });
    });
 
  },
  //精品推荐展开和折叠
  toggleGoodfn:function(){
    let goodShow = this.data.goodHidShow;
    let goodSwitchText='展开';
    if(goodShow){
      goodSwitchText='关闭';
    }

    this.setData({
      goodHidShow: !goodShow,
      goodSwitchText: goodSwitchText,
    });

  },
  //搜索结果展开和折叠
  toggleSearchfn:function(){
    let searchShow = this.data.searchHidShow;
    let searchSwitchText = '展开';
    if (searchShow) {
      searchSwitchText = '关闭';
    }

    this.setData({
      searchHidShow: !searchShow,
      searchSwitchText: searchSwitchText,
    });
  },
  //获取输入的内容
  getInputValue:function(e){
    let that=this;
    let keyStr = e.detail.value;
    if (keyStr!=null&&keyStr.length>0){
      that.myHandlerRequest.searchTip(keyStr).then(res => {
        that.setData({
          searchTextList: res.data.textlist
        });
      });
    }
    
      this.setData({
        searchValue: keyStr
      });
  },
  //搜索小说
  searchFiction:function(){
    let that=this;
    let searchText=this.data.searchValue;
    if(searchText.length>0){
         
      let myHandlerRequest = new MyHandlerRequest();
      myHandlerRequest.searchFictionByKey(searchText).then(res => {
        that.setData({
          searchLists: res.data.fictionlist
        });
        if (res.statusCode==200) {
          wx.showToast({
            title: '查询成功'
          });
        } else {
          wx.showToast({
            title: '查询失败'
          });
        }
      });
           
          
    }else{
      wx.showToast({
        title: '输入内容不能为空'
      });
    }
  },
  //显示搜索面板
  showSearchBar:function(){
     this.setData({
       searchTipShowHid:false
     });
  },
  //关闭搜索面板
  hidSearchBar:function(){
    this.setData({
      searchTipShowHid: true,
      searchTextList:[]
    });
  },
  //选择搜索面板选项时，关闭搜索面板和更新搜索框内容
  selTipName:function(e){
    let tar=e.currentTarget;
    let itemName=tar.dataset.itemName;
    this.setData({
      searchTipShowHid: true,
      searchTextList: [],
      searchValue: itemName
    });
  }

});