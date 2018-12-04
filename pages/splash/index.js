import { pageExtend, commonPage } from '../../utils/page'
import config from '../../config/index'
import cookie from '../../utils/cookie'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: 'xxx',
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad() {
        this._init()

        setTimeout(() => {
            wx.switchTab({
                url: '/pages/index/index'
            })
        }, 1 * 1000)
    },
}))
