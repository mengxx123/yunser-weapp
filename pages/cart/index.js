import { pageExtend, commonPage } from '../../utils/page'
import config from '../../config/index'
import cookie from '../../utils/cookie'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '购物车',
        _tab: 3,

        items: [],
        totalPrice: 0.00,

        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad() {
        this._init()

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        wx.request({
            url: config.apiDomain + '/shop/users/1/cart_items', // TODO
            data: {
            },
            header: {
                'cookie': cookie.get(),
                'content-type': 'application/json'
            },
            success: res => {
                console.log('send 数据', res.data)
                // 数据处理
                let items = res.data.map(item => {
                    return item
                })
                // let totalPrice = items.reduce((total, item) => {
                //     return total + item.number * item.product.price
                // })
                let totalPrice = 0
                for (let item of items) {
                    totalPrice += item.number * item.product.price
                }
                totalPrice = totalPrice.toFixed(2)
                
                console.log('totalPrice', totalPrice)
                this.setData({
                    items,
                    totalPrice
                })
            },
            fail: res => {
            },
            complete: res => {
            }
        })
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
}))
