import { pageExtend, commonPage } from '../../utils/page'
import coordUtil from '../../utils/coord'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '违停信息',

        // 地图
        longitude: 113,
        latitude: 24,
        scale: 13,
        markers: [],

    },
    onLoad() {
        this._init()

        let marker = {
            iconPath: '/static/img/location.png',
            id: '1',
            latitude: 24,
            longitude: 113,
            width: this._rpx2px(36),
            height: this._rpx2px(48)
        }

        this.setData({
            // data: data,
            // longitude: coord.longitude,
            // latitude: coord.latitude,
            markers: [marker]
        })
    },
    openLocation() {
        wx.openLocation({
            longitude: this.data.longitude,
            latitude: this.data.latitude,
            // name: this.data.data.addressText
        })
    },
}))
