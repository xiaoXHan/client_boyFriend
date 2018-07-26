function t(t, a, e) {
  return a in t ? Object.defineProperty(t, a, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[a] = e, t;
}

var a = getApp(),
  e = require("../../utils/util"),
  s = wx.createInnerAudioContext(),
  n = wx.createInnerAudioContext();

n.src = "http://img1.51marryyou.com/2018-04-16/042005d2bdc049c76be08f1a77a9c05f.m4a",
  s.src = "http://p9tv7c0ei.bkt.clouddn.com/%E6%96%B9%E5%AE%87%E6%9D%B0%20-%20%E7%AD%94%E6%A1%88%20%28Live%29.mp3",
  s.loop = !0, Page({
    data: {
      header: {},
      questionData: [],
      isPlayMusic: !0,
      result: {
        resultStart: !1,
        resultState: !1
      },
      canvasState: !0,
      scrollTop: 0,
      aid: [],
      selectNum: 1,
      animationStyle: !1,
      percent: 100,
      mainLoading: !0,
      showAuth: !1,
      beginTap: !1,
      resultTextData: [],
      dotState: !1,
      trophyState: !1
    },
    onShow: function() {
      this.data.isPlayMusic ? (s.play(), console.log("开始播放")) : (s.pause(), console.log("暂停播放"));
    },
    onLoad: function(t) {
      console.log(t);
      var s = this;
      if (t.scene) {
        t.scene;
        var n = [];
        n = decodeURIComponent(t.scene).split("a"), s.setData({
          oUser_id: n[0],
          oChannel: n[1]
        });
      } else t.user_id ? s.setData({
        oUser_id: t.user_id,
        oChannel: t.channel
      }) : s.setData({
        oUser_id: "",
        oChannel: ""
      });
      var beijingimgUrl = "https://yifen-1256080631.cos.ap-guangzhou.myqcloud.com/friendPics/beijingimg.png"
      s.data.result.mainImg = beijingimgUrl, s.renData(), s.setData({
        widthRate: 750 / a.data.screenWidth,
        result: s.data.result,
        screenHeight: a.data.screenHeight
      }), e.loading("正在加载");
    },
    loadingAnimation: function() {
      var t = this,
        a = t.data.percent,
        e = setInterval(function() {
          (a -= 1) < 0 && (clearInterval(e), t.setData({
            animationStyle: !0,
            mainShow: !0,
            mainLoading: !1
          }));
        }, 30);
    },
    renData: function() {
      var t = this;
      wx.login({
        success: function(s) {
          var n = s.code;
          console.log(n), e.http("login.php", {
            code: n,
            user_id: t.data.oUser_id,
            channel: t.data.oChannel
          }, function(s) {
            e.hideLoad();
            var n = s.data.data.user_id;
            var url = "https://yifen-1256080631.cos.ap-guangzhou.myqcloud.com/friendPics/get_qrcode.jpg";
            t.data.result.codeImg = url, t.setData({
              user_id: n,
              result: t.data.result
            }), t.getIndexData();
          });
        }
      });
    },
    getIndexData: function() {
      var t = this;
      e.http("", {}, function(a) {
        if (0 == a.data.status) {
          var e = a.data.data;
          e.forEach(function(t) {
            t.canClick = !0, t.answers.forEach(function(t) {
              t.active = !1;
            });
          });
          var s = e.slice(0, 1);
          t.setData({
            allData: e,
            questionData: s,
            selectLen: e.length
          });
        }
      });
    },
    onMusicTap: function() {
      var t = this;
      t.data.isPlayMusic ? (s.pause(), console.log("暂停播放")) : (s.play(), console.log("开始播放")),
        t.setData({
          isPlayMusic: !t.data.isPlayMusic
        });
    },
    selectTap: function(t) {
      var a = this,
        s = t.currentTarget.dataset.key,
        i = t.currentTarget.dataset.slectkey;
      if (a.data.questionData[s].canClick)
        if (n.play(), a.data.questionData[s].answers[i].active = !0,
          a.data.aid.push(a.data.questionData[s].answers[i].aid), a.data.questionData[s].canClick = !1,
          a.data.questionData = a.data.questionData.concat(a.data.allData.slice(a.data.selectNum, a.data.selectNum + 1)),
          a.data.selectNum = a.data.selectNum + 1, a.setData({
            questionData: a.data.questionData,
            aid: a.data.aid
          }), a.data.selectLen < a.data.selectNum) {
          a.data.result.resultStart = !0, a.setData({
            result: a.data.result
          }), a.scrollTopDelay();
          var o = a.data.aid.join(",");
          e.http("get_result.php", {
            user_id: a.data.user_id,
            aid: o
          }, function(t) {
            var e = t.data.data;
            a.data.result.rank = e.ranking, a.data.result.cloudImg = e.yun_image, a.setData({
              result: a.data.result,
              shareText: e.sharing_writing,
              shareImg: e.sharing_image
            }), setTimeout(function() {
              a.data.resultTextData.push("您男友得分" + e.total_score + "分，全球排名" + e.ranking), a.setData({
                resultTextData: a.data.resultTextData,
                dotState: !0
              }), a.scrollTop();
            }, 1500), setTimeout(function() {
              a.data.resultTextData.push(e.title), a.setData({
                resultTextData: a.data.resultTextData
              }), a.scrollTop();
            }, 3e3), setTimeout(function() {
              a.data.resultTextData.push("正在为你男友颁大奖"), a.setData({
                resultTextData: a.data.resultTextData
              }), a.scrollTop();
            }, 4500), setTimeout(function() {
              a.data.result.resultState = !0, a.setData({
                result: a.data.result,
                trophyState: !0
              }), a.scrollTop();
            }, 6e3), setTimeout(function() {
              a.setData({
                trophyState: !1
              });
            }, 8e3);
          });
        } else a.scrollTopDelay();
    },
    scrollTopDelay: function() {
      var t = this;
      setTimeout(function() {
        wx.createSelectorQuery().select("#pageCon").boundingClientRect(function(a) {
          t.setData({
            scrollTop: a.height + 20
          });
        }).exec();
      }, 300);
    },
    scrollTop: function() {
      var t = this;
      wx.createSelectorQuery().select("#pageCon").boundingClientRect(function(a) {
        t.setData({
          scrollTop: a.height + 20
        });
      }).exec();
    },
    beginTap: function() {
      var t = this;
      t.setData({
        beginTap: !0
      }), setTimeout(function() {
        wx.createSelectorQuery().select("#pageCon").boundingClientRect(function(a) {
          t.setData({
            scrollTop: a.height + 20
          });
        }).exec();
      }, 300);
    },
    PreviewImg: function(t) {
      var a = t.target.dataset.img,
        e = [a];
      wx.previewImage({
        current: a,
        urls: e
      });
    },
    onShareAppMessage: function(t) {
      var a = this,
        s = "pages/index/index?user_id=" + a.data.user_id + "&channel=1";
      return {
        title: a.data.shareText,
        path: s,
        imageUrl: a.data.shareImg,
        success: function(t) {
          e.success("分享成功");
        },
        fail: function(t) {
          e.noData("取消分享");
        }
      };
    },
    saveImg: function() {
      e.loading("正在保存");
      var t = this;
      t.setData({
        canvasState: !0
      });
      var a = wx.createCanvasContext("myCanvas");
      wx.createSelectorQuery().select("#picCtr").boundingClientRect(function(s) {
        var beijingimgUrl = "https://yifen-1256080631.cos.ap-guangzhou.myqcloud.com/friendPics/beijingimg.png"
        wx.downloadFile({
          url: t.data.result.mainImg,
          success: function(s) {
            a.drawImage(s.tempFilePath, 0, 0, parseInt(506 / t.data.widthRate), parseInt(755 / t.data.widthRate)),
              console.log("r" + t.data.result.codeImg)
              wx.downloadFile({
                url: t.data.result.codeImg,
                success: function(n) {
                  a.drawImage(n.tempFilePath, parseInt(398 / t.data.widthRate), parseInt(614 / t.data.widthRate), parseInt(88 / t.data.widthRate), parseInt(88 / t.data.widthRate)),
                    wx.downloadFile({
                      url: t.data.result.cloudImg,
                      success: function(n) {
                        a.drawImage(n.tempFilePath, parseInt(308 / t.data.widthRate), parseInt(293 / t.data.widthRate), parseInt(198 / t.data.widthRate), parseInt(213 / t.data.widthRate)),
                          a.setFillStyle("#F26C4F"), a.setFontSize(42 / t.data.widthRate), a.fillText(t.data.result.rank, parseInt(300 / t.data.widthRate), parseInt(274 / t.data.widthRate)),
                          a.draw(), setTimeout(function() {
                            wx.canvasToTempFilePath({
                              x: 0,
                              y: 0,
                              width: s.with,
                              height: s.height,
                              destWidth: s.with,
                              destHeight: s.height,
                              canvasId: "myCanvas",
                              success: function(a) {
                                e.hideLoad(), wx.saveImageToPhotosAlbum({
                                  filePath: a.tempFilePath,
                                  success: function(a) {
                                    e.showMsgSave("保存图片成功，分享到朋友圈炫耀一下吧～"), t.setData({
                                      canvasState: !1
                                    });
                                  },
                                  fail: function(a) {
                                    "saveImageToPhotosAlbum:fail auth deny" != a.errMsg && "saveImageToPhotosAlbum:fail:auth denied" != a.errMsg || (t.setData({
                                      showAuth: !0
                                    }), wx.showModal({
                                      title: "提示",
                                      confirmText: "好哒",
                                      content: "需要授权才能保存图片哦",
                                      success: function(a) {
                                        a.confirm ? (console.log(a.confirm), wx.openSetting({
                                          success: function(a) {
                                            console.log(a), a.authSetting["scope.writePhotosAlbum"] ? (t.setData({
                                              canvasState: !1
                                            }), t.saveImg()) : (t.setData({
                                              canvasState: !1
                                            }), e.noData("保存失败"));
                                          }
                                        })) : t.setData({
                                          canvasState: !1
                                        });
                                      }
                                    }));
                                  }
                                });
                              }
                            });
                          }, 1e3);
                      }
                    });
                }
              });
          }
        });
      }).exec();
    },
    tryAgainTap: function() {
      var a, e = this;
      e.data.result.resultStart = !1, e.data.result.resultState = !1;
      var s = e.data.allData.slice(0, 1);
      e.setData((a = {
          questionData: [],
          result: e.data.result,
          canvasState: !0,
          scrollTop: 0,
          aid: [],
          selectNum: 1,
          beginTap: !1
        }, t(a, "questionData", s), t(a, "resultTextData", []), t(a, "dotState", !1), t(a, "canvasState", !1),
        a));
    }
  });