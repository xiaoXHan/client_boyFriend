App({
    data: {
      api: "https://php.onefungame.cn/global_boyfriend/",
        g_isPlayingMusi: !1,
        g_currentMusicPostId: null
    },
    onLaunch: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                wx.setStorageSync("statusBarHeight", t.statusBarHeight + "px"), wx.setStorageSync("topHeight", t.statusBarHeight + 44 + "px"), 
                wx.setStorageSync("screenWidth", t.screenWidth), wx.setStorageSync("screenHeight", t.screenHeight + "px"), 
                e.data.statusBarHeight = wx.getStorageSync("statusBarHeight"), e.data.topHeight = wx.getStorageSync("topHeight"), 
                e.data.screenHeight = wx.getStorageSync("screenHeight"), e.data.screenWidth = wx.getStorageSync("screenWidth");
            }
        });
    }
});