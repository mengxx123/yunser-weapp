import { pageExtend, commonPage } from '../../utils/page'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '收货地址编辑',
        _back: true,

        address: {

        }
    },
    onLoad(options) {
        this._init()
        if (options.id) {
            this.addressId = options.id
            this.loadData()
        }
    },
    loadData() {
        app.http.get('/addresses/' + this.addressId)
            .then(res => {
                let data = res.data
                console.log('data', data)
                this.setData({
                    address: data
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
    }
}))
