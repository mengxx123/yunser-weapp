import { pageExtend, commonPage } from '../../utils/page'

import config from '../../config/index'
import cookie from '../../utils/cookie'
const regeneratorRuntime = require('../../libs/runtime.js')
import Promise from '../../libs/promise/es6-promise.js'
import loadingUtil from '../../utils/loading'

const app = getApp()

const minutes = []
for (let i = 0; i < 60; i += 15) {
    minutes.push(('' + i).padStart(2, '0'))
}

const hours = []
for (let i = 0; i < 48; i++) {
    hours.push(('' + i).padStart(2, '0'))
}

Page(pageExtend(commonPage, {
    data: {
        _title: '我要停车',
        _tab: 0,

        parkingNumber: ['', '', '', '', '', ''],
        parkingNumberIndex: -1,

        carNumber: ['', '', '', '', '', '', ''],
        carNumberIndex: -1,

        hours,
        hour: 1,
        minutes,
        minute: 0,

        unit: 40.000,
        money: 0,
        moneyText: '0.00',

        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        // 键盘
        keyboardVisible: false,
        buttonBorder: '1px solid #ccc',
        backgroundColor: '#fff',
        //1为省份键盘，其它为英文键盘
        keyBoardType: 1,
        keyVehicle1: '陕京津沪冀豫云辽',
        keyVehicle2: '黑湘皖鲁新苏浙赣',
        keyVehicle3: '鄂桂甘晋蒙吉闽贵',
        keyVehicle4: '粤川青藏琼宁渝',
        keyNumber: '1234567890',
        // keyEnInput1: 'QWERTYUIOP',
        keyEnInput1: 'ABCDEFGHIJ',
        // keyEnInput2: 'ASDFGHJKL',
        keyEnInput2: 'KLMNOPQRST',
        // keyEnInput3: 'ZXCVBNM',
        keyEnInput3: 'UVWXYZ',

        numbers: '1234567890'
    },
    onHourChange(e) {
        this.setData({
            hour: e.detail.value[0],
        })
        this.updateMoney()
    },
    onMinuteChange(e) {
        this.setData({
            minute: e.detail.value[0],
        })
        this.updateMoney()
    },
    updateMoney() {
        console.log('this.hour, this.minute', this.data.hour, this.data.minute)
        let money = this.data.unit * (this.data.hour + this.data.minute * 15 / 60)
        this.setData({
            money,
            moneyText: money.toFixed(2) 
        })
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad() {
        this._init()

        this.updateMoney() // TODO

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        this.login(() => {
            // 获取用户设置的项目，没有则是第一次登陆
            app.getProject(project => {
                if (project) {
                    this.projectId = project.projectId
                } else {
                    console.log('第一次登陆')
                    // 第一次登陆需要选择项目
                    this.data.haveToSelectProject = true
                    wx.navigateTo({
                        url: '/pages/project/index'
                    })
                    return
                }
                // this.initProject()
                this.getGroups()
                this.requestDictionary()
            })
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
        // for (let item of this.data.parkingNumber) {
        //     if (!item) {
        //         this._error('请输入泊车号')
        //         return
        //     }
        // }
        // for (let item of this.data.carNumber) {
        //     if (!item) {
        //         this._error('请输入车牌号')
        //         return
        //     }
        // }
        if (this.data.hour === 0 && this.data.minute === 0) {
            this._error('请输入停车时长')
            return
        }
        console.log('ok')
        wx.request({
            // url: config.apiDomain + '/rest/auth/camera/detail',
            url: 'http://localhost:8081/order',
            header: {
                'cookie': cookie.get(),
                'content-type': 'application/json'
            },
            success: res => {
                console.log('摄像头数据', res.data)

                wx.requestPayment({
                    timeStamp: new Date().getTime() / 1000,
                    'nonceStr': '',
                    'package': '',
                    'signType': 'MD5',
                    'paySign': '',
                    'success':function(res){},
                    'fail':function(res){},
                    'complete':function(res){}
                })
                
                appid
:
"wx087497f569184cff"
code_url
:
"weixin://wxpay/bizpayurl?pr=nOgvxir"
mch_id
:
"1500295462"
nonce_str
:
"z6tyNNjbLMGgpKdV"
prepay_id
:
"wx30161251593212a13c271e6f2411409510"
result_code
:
"SUCCESS"
return_code
:
"SUCCESS"
return_msg
:
"OK"
sign
:
"CFB0957C6B339CE68B74AA3ADC5082E5"
trade_type
:
"NATIVE"
            },
            fail: res => {
            },
            complete: res => {
            }
        })
        

        
    },
    scan() {
        wx.scanCode({
            success: res => {
                console.log('扫码结果')
                console.log(res)
                if (!res.errMsg.includes('ok')) {
                    this._error('扫码失败')
                    return
                }
                let parkingNumber = this.data.parkingNumber
                let arr = res.result.split('')
                for (let i = 0; i < arr.length; i++) {
                    parkingNumber[i] = arr[i]
                }
                this.setData({
                    parkingNumber
                    // parkingNumber: res.result.split('')
                })
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