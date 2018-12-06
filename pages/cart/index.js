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

        loadingState: '',

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
        this.initData()
    },
    initData() {
        this.setData({
            loadingState: 'loading',
        })
        app.http.get(`/shop/users/${app.globalData.user.id}/cart_items`)
            .then(res => {
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
                    loadingState: 'loaded',
                    items,
                    totalPrice
                })
            }, res => {
                this.setData({
                    loadingState: 'error',
                })
            })
    },
    retry() {
        this.initData()
    },
    createOrder() {
        app.http.post('/shop/orders', {
            userId: 1,
            // productId: this.productId
        })
            .then(res => {
                // console.log('send 数据', res.data)
                // this.setData({
                //     product: res.data,
                // })
                this._success('创建成功')
            }, res => {
                wx.showToast({
                    title: '获取工单详情失败',
                    icon: 'none',
                    duration: 1000
                })
            })
    },
    minus(e) {
        let id = e.currentTarget.dataset.id
        let number = e.currentTarget.dataset.number
        if (number === 1) {
            this._info('再减就没了')
            return
        }
        app.http.post('/shop/cart_items', {
            number: -1,
            productId: id // TODO
        })
            .then(res => {
                // console.log('send 数据', res.data)
                // this.setData({
                //     product: res.data,
                // })
                // this._success('添加成功')
                this.initData()

            }, res => {
                wx.showToast({
                    title: '获取工单详情失败',
                    icon: 'none',
                    duration: 1000
                })
            })
    },
    add(e) {
        let id = e.currentTarget.dataset.id
        app.http.post('/shop/cart_items', {
            number: 1,
            productId: id // TODO
        })
            .then(res => {
                // console.log('send 数据', res.data)
                // this.setData({
                //     product: res.data,
                // })
                // this._success('添加成功')
                this.initData()

            }, res => {
                wx.showToast({
                    title: '获取工单详情失败',
                    icon: 'none',
                    duration: 1000
                })
            })
    }
}))
