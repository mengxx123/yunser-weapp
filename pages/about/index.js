import { pageExtend, commonPage } from '../../utils/page'

import config from '../../config/index'
import cookie from '../../utils/cookie'
const regeneratorRuntime = require('../../libs/runtime.js')
import Promise from '../../libs/promise/es6-promise.js'
import loadingUtil from '../../utils/loading'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '关于',
        _back: 0,
    },
    onLoad() {
        this._init()
    },
}))
