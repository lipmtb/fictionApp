class MyHandlerRequest{
  constructor(){
   this.token=wx.getStorageSync("token");
    this.urlBase ='http://192.168.30.12:8080/';
  }
  // 1.根据分类id号获取小说列表
  getFictionListByTypeId(fTtypeId){
   let that=this;
   return new Promise((resolve,reject)=>{
     wx.request({
       method: 'POST',
       url: this.urlBase+'wxMobileApp/loadingfiction/fictiontype',
       data: {
         token: that.token,
         ftypeid: fTtypeId
       },
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       success:res=> {
         resolve(res);
       }
     });

   });
    
  
  }

  
  //2.获取精品小说（收藏数较多的前十）
  getGoodFiction(){
    let that=this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.urlBase +'wxMobileApp/loadingfiction/goodfiction',
        data: {
          token: that.token,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }
  // 3.根据用户输入的关键词查询相关的小说
  searchFictionByKey(key){
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.urlBase +'wxMobileApp/loadingfiction/searchfiction',
        data: {
          token: that.token,
          keystr:key
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }
  //4.获取当前用户的收藏夹列表
  getCollectListByUserId(){
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.urlBase +'wxMobileApp/readerStorage/readercollect',
        data: {
          token: that.token
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }

  //5.获取当前用户阅读过的小说
  getUserHasRead() {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.urlBase +'wxMobileApp/readerStorage/readerread',
        data: {
          token: that.token
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }

//6.加载小说详情
getFictionDetailByFid(fid){
  let that = this;
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      url: this.urlBase +'wxMobileApp/loadingfiction/fiction',
      data: {
        token: that.token,
        fid:fid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        resolve(res);
      }
    });

  });

}
  //7.获取小说类型名列表
  getFictionTypeNameList() {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.urlBase + 'wxMobileApp/loadingfiction/ftypeName',
        data: {
          token: that.token
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }


  //8.判断当前用户是否点赞过fId小说
  userHasUp(fId){
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.urlBase +'wxMobileApp/readerStorage/haslike',
        data: {
          token: that.token,
          fid: fId
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }

  
  //9.判断当前用户是否收藏过fId小说
  userHasCollect(fId){
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.urlBase +'wxMobileApp/readerStorage/hascollect',
        data: {
          token: that.token,
          fid: fId
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }
  //10.获取fId小说的讨论区评论区评论数据
  getCommentList(fId){
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.urlBase +'wxMobileApp/loadingfiction/fictioncommentlist',
        data: {
          token: that.token,
          fid: fId
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }
//11.读者 阅读,点赞,收藏动作
  onReadLikeOrCollect(eType, fId){
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.urlBase +'wxMobileApp/readerdo/readcollectlike',
        data: {
          token: that.token,
          fid: fId,
          etype: eType
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }
  //12.添加新评论
  addNewComment(fId,commentContent,commentTime){
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.urlBase +'wxMobileApp/readerdo/readercomment',
        data: {
          token: that.token,
          fid: fId,
          commentContent: commentContent ,
          commentTime: commentTime
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }

  //13根据小说id和章节号查询章节内容
  getFictionChapterContent(fId, chapterNum){
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.urlBase +'wxMobileApp/loadingfiction/fictionchapter',
        data: {
          token: that.token,
          fid: fId,
          fchapterNum: chapterNum
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }


  //小说搜索实时响应
  searchTip(key){
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: that.urlBase + 'wxMobileApp/loadingfiction/searchtip',
        data: {
          keystr:key
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          resolve(res);
        }
      });

    });
  }
}

export {MyHandlerRequest}