import { pageExtend, commonPage } from '../../utils/page'

import config from '../../config/index'
import cookie from '../../utils/cookie'
const regeneratorRuntime = require('../../libs/runtime.js')
import Promise from '../../libs/promise/es6-promise.js'
import loadingUtil from '../../utils/loading'
import moment from '../../utils/moment.js'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '订单详情',
        _back: true,

        order: null
    },
    onLoad(options) {
        this._init()

        this.orderId = options.id
        this.initData()
    },
    initData() {
        function getStatusText(data) {
            if (data.payState === 0) {
                return '待支付'
            }
            if (data.deliveryState === 0) {
                return '待收货'
            }
            return '已完成'
        }

        app.http.get(`/shop/orders/${this.orderId}`)
            .then(res => {
                let data = res.data
                console.log('data', data)
                
                // 处理数据
                data.createTime = moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')
                data.statusText = getStatusText(data)

                this.setData({
                    order: data
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
