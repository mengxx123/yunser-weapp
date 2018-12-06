import { pageExtend, commonPage } from '../../utils/page'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '产品详情',
        _back: true,
        
        product: null,
        skus: []
    },
    onLoad(options) {
        this._init()

        console.log('options', options)
        this.productId = options.id

        app.http.get(`/shop/products/${this.productId}`)
            .then(res => {
                console.log('send 数据', res.data)
                this.setData({
                    product: res.data,
                })
            }, res => {
                wx.showToast({
                    title: '获取产品失败',
                    icon: 'none',
                    duration: 1000
                })
            })
        app.http.get(`/shop/products/${this.productId}/skus`)
            .then(res => {
                console.log('send 数据', res.data)
                this.setData({
                    skus: res.data,
                })
            }, res => {
                wx.showToast({
                    title: '获取产品失败',
                    icon: 'none',
                    duration: 1000
                })
            })
    },
    addToCart() {
        app.http.post('/shop/cart_items', {
            number: 1,
            productId: this.productId
        })
            .then(res => {
                // console.log('send 数据', res.data)
                // this.setData({
                //     product: res.data,
                // })
                this._success('添加成功')
            }, res => {
                wx.showToast({
                    title: '获取工单详情失败',
                    icon: 'none',
                    duration: 1000
                })
            })
    }
}))
