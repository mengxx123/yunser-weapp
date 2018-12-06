import extend from './extend'
import {checkIphoneX} from './device'

export const pageExtend = function (destination, source) {
    return extend(true, {}, destination, source)
    // for(var property in source) {
    //     if (property === 'data') {
    //         for(var property2 in source.data) {
    //             destination.data[property2] = source.data[property2]
    //         }
    //     } else {
    //         destination[property] = source[property]
    //     }
    // }
    // return destination
}

export const commonPage = {
    parent: true,
    data: {
        name3: 'parent',
        name1: 'p',

        _title: '',
        _back: false,
        _theme: 'light',
        _textColor: '#000',
        _bgColor: '#fff',
        _home: false,
        _top: 30,
        _isIphoneX: false, // 这个表里意味着iPhone X 以及
        _appbarHeight: 10,
        _systemInfo: {
            uninit: true
        },
        // 下拉刷新
        _pullY: 0,
        _pullState: '',
        _pullText: '',
    },
    _init() {
        console.log('created')

        let isIphoneX = false
        let top
        let appbarHeight

        let res = wx.getSystemInfoSync()
        console.log('_res', res)
        this.data._systemInfo = wx.getSystemInfoSync()
        this._scale = res.windowWidth / 750

        // TODO
        this.data._windowHeight = res.windowHeight / this._scale
        
        isIphoneX = checkIphoneX(res)

        if (res.system.includes('iOS')) {
            top = 25
            appbarHeight = 64
        } else {
            top = 27
            appbarHeight = 64
        }
        if (isIphoneX) {
            top += 24
            appbarHeight = 82
        }
        
        appbarHeight = isIphoneX ? 180 : 130 // 对的
        
        console.log('isIphoneX', isIphoneX)
        console.log('top', top)

        this.setData({
            _top: top,
            _appbarHeight: appbarHeight,
            _isIphoneX: isIphoneX,
        })

        this._scrollTop = 0
    },

    _goBack() {
        console.log(this)
        wx.navigateBack()
    },
    _rpx2px(num) {
        return num * this._scale
    },
    _px2rpx(num) {
        return num / this._scale
    },
    _navToUrl(e) {
        let url = e.currentTarget.dataset.url
        wx.navigateTo({
            url: url
        })
    },
    _navToTab(e) {
        let url = e.currentTarget.dataset.url
        wx.switchTab({
            url: url
        })
    },
    _copy(e) {
        let text = e.currentTarget.dataset.text
        wx.setClipboardData({
            data: text,
            success: res => {
                this._success('复制成功')
            }
        })
    },
    _info(text) {
        wx.showToast({
            title: text,
            icon: 'none',
            duration: 1000
        })
    },
    _success(text) {
        wx.showToast({
            title: text,
            icon: 'none',
            duration: 1000
        })
    },
    _error(text) {
        wx.showToast({
            title: text,
            icon: 'none',
            duration: 1000
        })
    },
    _todo() {
        wx.showToast({
            title: '功能暂未实现',
            icon: 'none',
            duration: 1000
        })
    },
    _nothing() {},
    _preventTouchMove(e) {
        console.log('preventTouchMove')
    },
    _toast() {
    },

    onPageScroll(e) {
    },
    _touchStart(e) {
    },
    _touchMove(e) {
    },
    _touchEnd(e) {
    }

    // onPageScroll(e) {
    //     console.log('e.scrollTop', e.scrollTop)
    //     this._scrollTop = e.scrollTop
    // },
    // _touchStart(e) {
    //     console.log('_touchStar')
    //     let y = e.touches[0].pageY

    //     this._down = true
    //     this._downY = y
    // },
    // _touchMove(e) {
    //     console.log('_touchMove', e)
    //     console.log(e.touches[0].pageY)
    //     let y = e.touches[0].pageY
    //     this._pullOffsetY = y - this._downY
    //     if (this._pullOffsetY < 0) {
    //         return
    //     }
    //     if (this._scrollTop !== 0) {
    //         console.log('不在顶部', this._scrollTop)
    //         return
    //     }
    //     this.setData({
    //         _pullY: this._pullOffsetY
    //     })
    //     return false
    // },
    // _touchEnd(e) {
    //     console.log('_touchEnd')
    //     this._down = false
    //     if (this._pullOffsetY > 50) {
    //         this._timer = setInterval(() => {
    //             this._pullOffsetY -= 4
    //             if (this._pullOffsetY <= 50) {
    //                 this._pullOffsetY = 50

    //                 this.setData({
    //                     _pullY: 50,
    //                     _pullState: 'loading',
    //                     _pullText: '正在加载...',
    //                 })
    //                 console.log('正在加载')
    //                 clearInterval(this._timer)
    //                 setTimeout(() => {
    //                     this.setData({
    //                         _pullY: 0,
    //                         _pullState: 'loaded',
    //                         _pullText: '',
    //                     })
    //                 }, 1000)
    //             } 
    //             // this.setData({
    //             //     _pullText: this._pullOffsetY > 30 ? '下拉刷新' : '',
    //             //     _pullY: this._pullOffsetY
    //             // })
    //         })
    //     } else {
    //         this._timer = setInterval(() => {
    //             this._pullOffsetY -= 4
    //             if (this._pullOffsetY <= 0) {
    //                 this._pullOffsetY = 0

    //                 clearInterval(this._timer)
    //             }
    //             this.setData({
    //                 _pullY: this._pullOffsetY,
    //                 _pullText: this._pullOffsetY > 30 ? '下拉刷新' : ''
    //             })
    //         })
    //     }
    // }
}


