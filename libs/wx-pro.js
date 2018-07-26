var t = require("./es6-promise.min.js").Promise;

wx.pro = {}, [ "login", "getUserInfo", "navigateTo", "checkSession", "setStorageSync", "getStorageSync", "getStorageInfo", "removeStorage", "clearStorage", "getNetworkType", "getSetting", "getSystemInfo", "getLocation" ].forEach(function(e) {
    wx.pro[e] = function() {
        var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return new t(function(t, n) {
            o.success = function(e) {
                t(e);
            }, o.fail = function(t) {
                n(t);
            }, wx[e](o);
        });
    };
}), wx.pro.getStorage = function(e) {
    return new t(function(t, o) {
        wx.getStorage({
            key: e,
            success: function(e) {
                t(e.data);
            },
            fail: function(e) {
                t();
            }
        });
    });
}, wx.pro.setStorage = function(e, o) {
    return new t(function(t, n) {
        wx.setStorage({
            key: e,
            data: o,
            success: function(e) {
                t(o);
            },
            fail: function(t) {
                n(t);
            }
        });
    });
}, wx.pro.request = function(e) {
    return e.toast && wx.showToast({
        title: e.toast.title || "加载中",
        icon: "loading"
    }), new t(function(t, o) {
        wx.request({
            url: e.url,
            method: e.method || "GET",
            data: e.data,
            success: function(n) {
                n.statusCode >= 400 ? (console.error("wx.request fail [business]", e, n.statusCode, n.data), 
                o(n)) : t(n.data);
            },
            fail: function(t) {
                console.error("wx.request fail [network]", e, t), o(t);
            }
        });
    });
}, module.exports = t;