import { pageExtend, commonPage } from '../../utils/page'
import http from '../../utils/http'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '收货地址',
        _back: true,

        addresses: []
    },
    onLoad() {
        this._init()
        this.loadData()
    },
    loadData() {
        http.get('/users/1/addresses?page_size=2000&page=1')
            .then(res => {
                let data = res.data
                console.log('data', data)
                this.setData({
                    addresses: data
                })
            }, res => {
                wx.showToast({
                    title: '获取工单详情失败',
                    icon: 'none',
                    duration: 1000
                })
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
    bindgetphonenumber: e => {
        console.log('手机号回调', e)
        console.log(e)
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
            console.log('用户拒绝了')
        } else {
            console.log('用户同意了')
        }
    },
    save() {
        
    }
}))
