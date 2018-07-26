var t = getApp();

require("./../libs/es6-promise.min.js").Promise;

module.exports = {
    http: function(o, n, i) {
        wx.request({
            url: t.data.api + o,
            data: n,
            success: function(t) {
                i(t);
            }
        });
    },
    noData: function(t) {
        wx.showToast({
            icon: "none",
            title: t,
            duration: 1e3,
            mask: !0
        });
    },
    showMsgSave: function(t) {
        wx.showModal({
            title: "保存成功",
            content: t,
            showCancel: !1
        });
    },
    loading: function(t) {
        wx.showLoading({
            title: t,
            mask: !0
        });
    },
    hideLoad: function() {
        setTimeout(function() {
            wx.hideLoading();
        }, 200);
    }
};