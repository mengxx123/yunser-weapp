import { pageExtend, commonPage } from '../../utils/page'

import config from '../../config/index'
import cookie from '../../utils/cookie'
const regeneratorRuntime = require('../../libs/runtime.js')
import Promise from '../../libs/promise/es6-promise.js'
import loadingUtil from '../../utils/loading'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '捐赠',
        _back: true,
    },
    onLoad() {
        this._init()


        this.loginDirectly()
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
    initData() {
        wx.request({
            url: config.apiDomain + '/shop/products?page_size=20&page=1',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                console.log('登录信息', res.data)
                let data = res.data
                this.setData({
                    products: data
                })
            },
            fail: res => {
            },
            complete: res => {
            }
        })
    },
    onShow() {
        if (app.globalData.selectedCarNumber) {
            this.setData({
                carNumber: app.globalData.selectedCarNumber.split('')
            })
        }
    },
    ok() {
        wx.request({
            url: config.apiDomain + '/donate',
            header: {
                'cookie': cookie.get(),
                'content-type': 'application/json'
            },
            success: res => {
                console.log('摄像头数据', res.data)
                let data = res.data
                this.setData({
                    copyData: data.package
                })
                wx.requestPayment({
                    timeStamp: data.timeStamp,
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: 'MD5',
                    paySign: data.paySign,
                    success: res => {
                        console.log('success', res)
                    },
                    fail: res => {
                        console.log('fail', res)
                    },
                    complete:function(res){}
                })
            },
            fail: res => {
            },
            complete: res => {
            }
        })
    },
    send() {
        wx.request({
            url: config.apiDomain + '/wechat/send',
            header: {
                'cookie': cookie.get(),
                'content-type': 'application/json'
            },
            success: res => {
                console.log('send 数据', res.data)
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
    bindgetphonenumber: e => {
        console.log('手机号回调', e)
        console.log(e)
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
            console.log('用户拒绝了')
        } else {
            console.log('用户同意了')
        }
    },
    login(callback) {
        wx.login({
            success: res => {
                console.log('微信登录成功', res.code)
                this.setData({
                    code: res.code
                })
                let loginType = 'wechat'
                // let loginType = 'account'
                let url
                let data
                url = '/loginByBindSysUser'
                data = {
                    code: res.code
                }

                wx.request({
                    url: config.apiDomain + '/rest/unauth/magneticParking/login',
                    // url: config.apiDomain + '/rest/unauth/magneticParking/register',
                    // url: config.authDomain + url,
                    // url: config.authDomain + ,
                    method: 'POST',
                    // data: {
                    //     code: res.code,
                    //     ...app.globalData.infoInfoRes
                    // },
                    data: {
                        code: res.code,
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        // 'content-type': 'application/json'
                    },
                    success: res => {
                        console.log('登录失败', res)
                        cookie.set(res.header['Set-Cookie'])
                        if (res.data.httpCode !== 200) {
                            // wx.showModal({
                            //     title: '登录失败',
                            //     content: res.data.msg
                            // })
                            // 登录失败，意味着未授权
                            // wx.navigateTo({
                            //     url: '/pages/auth/index'
                            // })
                            return
                        }
                        let data = res.data.data
                        wx.setStorageSync('systemUser', data)
                        console.log('登录返回', data)
                        callback && callback()
                    }
                })
            }
        })
    },
    inputNumber(e) {
        let value = e.currentTarget.dataset.value
        this.data.parkingNumber[this.data.parkingNumberIndex] = value
        let parkingNumberIndex = this.data.parkingNumberIndex + 1
        if (parkingNumberIndex > 5) {
            parkingNumberIndex = 5
        }
        this.setData({
            parkingNumberIndex: parkingNumberIndex,
            parkingNumber: this.data.parkingNumber
        })
    },
    deleteInputNumber() {
        this.data.parkingNumber[this.data.parkingNumberIndex - 1] = ''
        let parkingNumberIndex = this.data.parkingNumberIndex - 1
        this.setData({
            parkingNumberIndex: parkingNumberIndex,
            parkingNumber: this.data.parkingNumber
        })
    },
    clearInputNumber() {
        this.setData({
            parkingNumberIndex: 0,
            parkingNumber: ['', '', '', '', '', '']
        })
    },
    inputParkingNumberIndex(e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            carNumberIndex: -1,
            parkingNumberIndex: index,
            keyboardVisible: true,
            keyBoardType: 1
        })
    },
    inputCarNumberIndex(e) {
        let index = e.currentTarget.dataset.index
        console.log(index)
        this.setData({
            parkingNumberIndex: -1,
            carNumberIndex: index,
            keyboardVisible: true,
            keyBoardType: 2
        })
    },
    vehicleTap: function (event) {
        let val = event.target.dataset.value
        console.log(val)
        if (val === 'delete') {
            this.data.carNumber[this.data.carNumberIndex - 1] = ''
            let carNumberIndex = this.data.carNumberIndex - 1
            if (carNumberIndex < 0) {
                carNumberIndex = 0
            }
            this.setData({
                carNumberIndex,
                carNumber: this.data.carNumber
            })
            return
        }

        this.data.carNumber[this.data.carNumberIndex] = val

        let carNumberIndex = this.data.carNumberIndex + 1
        if (carNumberIndex > 6) {
            carNumberIndex = 6
        }
        this.setData({
            carNumberIndex,
            carNumber: this.data.carNumber
        })

        
        // switch (val){
        //   case 'delete':
        //     this.triggerEvent('delete');
        //     this.triggerEvent('inputchange');
        //   break;
        //   case 'ok':
        //     this.triggerEvent('ok');
        //   break;
        //   default:
        //     this.triggerEvent('inputchange', val);
        // }
    },
    onPageClick(e) {
        this.setData({
            keyboardVisible: false,
        })
    },
    onShareAppMessage() {
        return {
            title: '首页'
        }
    },
}))
