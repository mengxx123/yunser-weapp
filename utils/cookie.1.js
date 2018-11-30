export default {
    get() {
        // return 'SESSION=f58b4d3a-0784-4d1b-8b1b-2095fc3e3d72'
        return wx.getStorageSync('sessionid') || 'SESSION=827d2c64-3a3c-4068-b605-a8dacec184d9' // staging
        // return wx.getStorageSync('sessionid') || 'SESSION=SESSION=4547c400-db0a-473b-99b4-351750bbd438' // dev
        // return wx.getStorageSync('sessionid')
    },
    set(cookieStr) {
        let match = cookieStr.match(/(SESSION=[\w\W]+?);/)
        wx.setStorageSync('sessionid', match[1])
        // rememberMe=deleteMe; Path=/; Max-Age=0; Expires=Mon, 03-Sep-2018 05:14:58 GMT,SESSION=3365adb8-4d23-42a1-a7a4-01783da05cab; Domain=dev.weyatech.cn; Path=/; HttpOnly
    }
}
// wx.getStorageSync('sessionid')