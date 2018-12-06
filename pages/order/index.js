import { pageExtend, commonPage } from '../../utils/page'

import config from '../../config/index'
import cookie from '../../utils/cookie'
const regeneratorRuntime = require('../../libs/runtime.js')
import Promise from '../../libs/promise/es6-promise.js'
import loadingUtil from '../../utils/loading'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '我的订单',
        _back: true,

        tabs: [
            {
                text: '全部'
            },
            {
                text: '待付款'
            },
            {
                text: '待收货'
            },
            {
                text: '已完成'
            },
        ],
        curTab: 0,

        orders: [],
    },
    onLoad() {
        this._init()

        this.initData()
    },
    loginDirectly() {
        wx.login({
            success: res => {
                console.log('微信登录成功', res.code, app.globalData.infoInfoRes)
                this.setData({
                    code: res.code
                })
                wx.request({
                    url: config.apiDomain + '/login/wechat?code=' + res.code,
                    method: 'POST',
                    data: {
                        // code: res.code
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: res => {
                        console.log('登录信息', res.data)
                        let data = res.data
                        app.globalData.accessToken = data.accessToken
                        this.initData()
                    },
                    fail: res => {
                    },
                    complete: res => {
                    }
                })
            }
        })
    },
    getType(tab) {
        switch (tab) {
            case 0:
                return 'all'
            case 1:
                return 'unpay'
            case 2:
                return 'undelivery'
            case 3:
                return 'done'
        }

    },
    initData() {
        let type = this.getType(this.data.curTab)

        function getStatusText(data) {
            if (data.payState === 0) {
                return '待支付'
            }
            if (data.deliveryState === 0) {
                return '待收货'
            }
            return '已完成'
        }

        app.http.get(`/users/${1}/orders?type=${type}`)
            .then(res => {
                let data = res.data
                data = data.map(item => {
                    item.statusText = getStatusText(item)
                    return item
                })
                console.log('data', data)
                this.setData({
                    orders: data
                })
            }, res => {
                wx.showToast({
                    title: '获取失败',
                    icon: 'none',
                    duration: 1000
                })
            })
    },
    onShow() {
    },
    onReachBottom() {
        if (!this.loadFinish) {
            this.data.page++
            this.loadLst()
        }
    },
    switchTab(e) {
        let index = e.currentTarget.dataset.index
        console.log(index)
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        })
        this.setData({
            curTab: index,
        })
        this.initData()
    }
}))
