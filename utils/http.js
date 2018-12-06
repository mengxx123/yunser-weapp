import config from '../config/index'
const regeneratorRuntime = require('../libs/runtime.js')
import Promise from '../libs/promise/es6-promise.js'
import cookie from '../utils/cookie'
import loadingUtil from '../utils/loading'

export default {
    get(url, data, opts) {
        return this.request('GET', url, data, opts)
    },
    post(url, data, opts) {
        return this.request('POST', url, data, opts)
    },
    request(method, url, data, opts) {
        opts = opts || {
            loading: true
        }
        if (opts.loading) {
            loadingUtil.showLoading()
        }

        let header = {
            'cookie': cookie.get(),
        }
        if (method === 'POST') {
            // header['content-type'] = 'application/x-www-form-urlencoded'
            header['content-type'] = 'application/json'
        }
        return new Promise((resolve, reject) => {
            console.info('request ' + url)
            wx.request({
                method: method,
                url: config.apiDomain + url,
                data: data || {},
                header: header,
                success: res => {
                    console.log(res.data)
                    // TODO
                    // if (res.data.httpCode !== 200) {
                    //     reject(res)
                    //     return
                    // }
                    resolve(res)
                },
                fail(res) {
                    reject(res)
                },
                complete: res => {
                    if (opts.loading) {
                        loadingUtil.hideLoading()
                    }
                }
            })
        })
    }
}