//fictionDetail page
import { MyHandlerRequest } from '../../control/fictionDataControl/MyHandlerRequest.js';
Page({
      data: {
        fId: 1,
        fictionChapterArr: [], //小说章节数量
        fiction: {},
        briefColor: '#f00',
        dirColor: '#000',
        talkColor: '#000',
        isBrief: true,
        isCharter: false,
        hasUp: false,
        hasCollected: false,
        runUp:'', //点赞动画类名
        userComment:'' //用户评论的内容
      },
      onLoad: function(fDetail) {
        let that=this;
        let fictionId=fDetail.fId;//记录小说id号
        this.fId = fictionId;
        this.myHandlerRequest = new MyHandlerRequest();
        this.myHandlerRequest.getFictionDetailByFid(fictionId).then(res=>{
          let fiction = res.data.fiction;//获得小说主要内容
          let chapterCount = fiction.chapterNum;
          let fcArr = new Array(chapterCount);  //章节数
          //动态设置导航栏标题
          wx.setNavigationBarTitle({
            title: fiction.fName
          });
          that.setData({
            fId: fictionId,    //小说id号
            fiction: fiction, //小说主体
            fictionChapterArr: fcArr //章节数
          });
          
        });
      },
      onReady:function(){
        let that=this;
        
        //判断用户是否阅读过，若阅读过，后台需要进行数据库插入操作
        that.myHandlerRequest.onReadLikeOrCollect("read",that.fId).then(res=>{
              if(res.data.state==1){
                wx.showToast({
                  title: '阅读成功'
                });
                that.setData({
                  'fiction.readNum': that.data.fiction.readNum+1
                });
              }else{
                wx.showToast({
                  title: '已阅读过'
                });
              }
        });

        //用户是否赞过
        that.myHandlerRequest.userHasUp(that.fId).then(res => {
          let hasLike = res.data.haslike;
          let boolLike=false;
          if(hasLike==1){
            boolLike=true;
          }
          that.setData({
            hasUp: boolLike
          });
        });

        //用户是否收藏过
        that.myHandlerRequest.userHasCollect(that.fId).then(res => {
          let hasCollect = res.data.hascollect;
          let boolCollect = false;
          if (hasCollect == 1) {
            boolCollect = true;
          }
          that.setData({
            hasCollected: boolCollect
          });
        });
        
        //获取小说的评论
        that.myHandlerRequest.getCommentList(that.fId).then(res=>{
          let commentLists = res.data.commentList;
          that.setData({
            commentList: commentLists
          });
        });
      },
      //切换简介或目录
      onChHeader: function(e) {
        let tar = e.target;
        let title = tar.dataset.title;

        let newIsBrief = this.data.isBrief;
        let newIsDir = this.data.isCharter;
        let briefColor = '#000';
        let chDirColor = '#000';
        let talkColor = '#000';

        if (title === 'brief') {
          newIsBrief = true;
          newIsDir = false;
          briefColor = '#f00';
          chDirColor = '#000';
          talkColor = '#000';
        } else if (title === 'charterDir') {
          newIsBrief = false;
          newIsDir = true;
          briefColor = '#000';
          chDirColor = '#f00';
          talkColor = '#000';
        } else {
          newIsBrief = false;
          newIsDir = false;
          briefColor = '#000';
          chDirColor = '#000';
          talkColor = '#f00';
        }
        this.setData({
          isBrief: newIsBrief,
          isCharter: newIsDir,
          briefColor: briefColor,
          dirColor: chDirColor,
          talkColor: talkColor
        });

      },
      myCreateAnimation:function(){
          let animation=wx.createAnimation({
              timingFunction:'ease-in'
          }); 
        return animation;
      },
      //点赞和收藏
      onUpCollect: function(e) {
        let that=this;
        //临时假设后台更新点赞和收藏成功
        let tar = e.target;
        let eType = tar.dataset.eventType;
        
        let upNum = that.data.fiction.likeNum;//获取当前点赞数
        let collectNum = that.data.fiction.collectNum;//获取当前收藏数

        that.myHandlerRequest.onReadLikeOrCollect(eType,that.fId).then(res=>{
            let state=res.data.state;
            if(state==1){
              switch (eType) {
                case 'like':
                  {
                    // this.myAnimationUp = this.myCreateAnimation();
                    // this.myAnimationUp.opacity(0.8).step({duration:100}).translateY(-200).scale(1.2)
                    //   .opacity(1).step({ duration: 1200,delay:-100 }).translateY(0).scale(1).opacity(0).step({duration:10});

                    that.setData({
                      hasUp: !that.data.hasUp,
                      'fiction.likeNum': upNum + 1,
                      runUp: 'upClass'
                      // userUpAnimation:this.myAnimationUp.export()
                    });
                    setTimeout(function () {
                      that.setData({
                        runUp: ''
                      });
                    }.bind(that), 1200);
                    wx.showToast({
                      title: '点赞成功'
                    });
                    break;
                  }
                case 'unlike':
                  {
                    that.setData({
                      hasUp: !that.data.hasUp,
                      'fiction.likeNum': upNum - 1,
                       runUp: ''
                    });
                    wx.showToast({
                      title: '已取消赞'
                    });
                    break;
                  }
                case 'collect':
                  {
                    that.setData({
                      hasCollected: !that.data.hasCollected,
                      'fiction.collectNum': collectNum + 1
                    });
                    wx.showToast({
                      title: '收藏成功'
                    });
                    break;
                  }
                case 'uncollect':
                  {
                    that.setData({
                      hasCollected: !that.data.hasCollected,
                      'fiction.collectNum': collectNum - 1
                    });
                    wx.showToast({
                      title: '已取消收藏'
                    });
                    break;
                  }
              }//siwtch end
            }else{
             wx.showToast({
               title: eType+'失败',
             });
            }  //if state end
        });
       
      }, //点赞收藏结束
    //  跳转到小说某章节
  navigateToChapterDetail:function(e){
     let tar=e.currentTarget;
     let chapterNum=tar.dataset.chapterIndex;
     wx.navigateTo({
       url: 'fictionChapter/fictionChapterDetail?fId=' + this.fId + '&chapterId=' + chapterNum + '&fName=' + this.data.fiction.fName
     });
  },
  // 获取用户评论
  handleUserInput:function(e){
       this.setData({
           userComment:e.detail.value
       });
  },
  //发送用户评论
  handleUserSubmit:function(){
    let that=this;
    let text=this.data.userComment;
     if(text.length>0){
        let userData=wx.getStorageSync("userInfo");
        let {avatarUrl,nickName}=userData;
        
         let newComment={
           avatarUrl: avatarUrl,
           nickName: nickName,
           commentContent:that.data.userComment,
           commentTime:new Date().toLocaleString()
         };

         // 判断是否更新评论成功，失败则不进行后续
       that.myHandlerRequest.addNewComment(that.fId, newComment.commentContent, newComment.commentTime).then(res=>{
        if(res.data.state==1){
          let newCommentList = that.data.commentList;
          newCommentList.push(newComment);
          that.setData({
            commentList: newCommentList,
            userComment: ''
          });

          wx.showToast({
            title: '评论成功'
          });
        }
     });
     
     }else{
       wx.showToast({
         title: '请输入内容评论',
       });
       return;
     }
  }


});