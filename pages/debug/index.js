import { pageExtend, commonPage } from '../../utils/page'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '调试',
        _back: true,
        
        code: '点击生成按钮可重复生成，一个code只能使用一次，点击code文本可以直接复制',

        auth: '点击授权获取用户信息，点击可以复制',
        authDetail: {},

        phone: '点击获取手机号，点击文本可以复制',
        phoneDetail: {}
    },
    onLoad() {
        this._init()
    },
    makeCode() {
        wx.login({
            success: res => {
                this.setData({
                    code: res.code
                })
            }
        })
    },
    getUserInfo(e) {
        console.log(e.detail)
        this.setData({
            auth: JSON.stringify(e.detail, null, 4),
            authDetail: e.detail
        })
    },
    bindgetphonenumber(e) {
        console.log('手机号回调', e)
        console.log(e)
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
            console.log('用户拒绝了')
        } else {
            console.log('用户同意了')
            this.setData({
                phone: JSON.stringify(e.detail, null, 4),
                phoneDetail: e.detail
            })
        }
    }
}))
