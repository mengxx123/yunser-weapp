import { pageExtend, commonPage } from '../../utils/page'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '选择车牌号',
        _back: true,

        list: [
            '粤ASB001',
            '粤ASB002',
            '粤ASB003',
            '粤ASB004',
        ]
    },
    onLoad() {
        app.globalData.selectedCarNumber = ''
    },
    selectItem(e) {
        let value = e.currentTarget.dataset.value
        app.globalData.selectedCarNumber = value
        this._goBack()
    }
}))
