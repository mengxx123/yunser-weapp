import { pageExtend, commonPage } from '../../utils/page'

Page(pageExtend(commonPage, {
    data: {
        _title: '停车记录',
        // _back: true,
        _tab: 1,

        curTab: 0
    },
    onLoad() {
        this._init()
    },
    onReachBottom() {
        if (!this.loadFinish) {
            this.data.page++
            this.loadLst()
        }
    },
    switchTab(e) {
        let index = e.currentTarget.dataset.index
        console.log(index)
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        })
        this.setData({
            curTab: index,
        })
    }
}))
