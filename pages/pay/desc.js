import { pageExtend, commonPage } from '../../utils/page'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        _title: '预付费说明',
        _back: true,

    },
    onLoad() {
    },
}))
