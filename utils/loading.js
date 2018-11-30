let count = 0

export default {
    // showLoading() {
    //     count++
    //     console.log('count', count)
    //     if (count === 1) {
    //         wx.showLoading({
    //             title: '加载中',
    //         })
    //     }
    // },
    // hideLoading() {
    //     count--
    //     console.log('count', count)
    //     if (count === 0) {
    //         wx.hideLoading()
    //     }
    // },
    showLoading() {
        wx.showLoading({
            title: '加载中',
        })
    },
    hideLoading() {
        wx.hideLoading()
    }
}
