import { pageExtend, commonPage } from '../../utils/page'
import config from '../../config/index'
import cookie from '../../utils/cookie'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '产品详情',
        _back: true,
        
        product: null,
    },
    onLoad(options) {
        this._init()

        console.log('options', options)
        this.productId = options.id

        wx.request({
            url: config.apiDomain + '/shop/products/' + this.productId,
            header: {
                'cookie': cookie.get(),
            },
            success: res => {
                console.log('send 数据', res.data)
                this.setData({
                    product: res.data,
                })
            },
            fail: res => {
            },
            complete: res => {
            }
        })
    },
}))
