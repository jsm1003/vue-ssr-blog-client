import {
    START_PROGRESS,
    FINISH_PROGRESS,
    DONE_PROGRESS,
    HIDE_PROGRESS,
    SHOW_PROGRESS,
    HANDLE_SIDE,
    AUTO_CLOSE,
    AUTO_OPEN,
    MIN_SIDE,
    CLOSE_DROP,
    TOGGLE_DROP,
    UPDATE_DROP_ITEM
} from '../mutation-types'

const state = {
    gProgress: {
        start: false,
        finish: false
    },
    gProgressShow: true,
    autoSide: true, //根据屏幕大小调节侧边栏显示状况
    handleSide: true,//true 表示侧边栏打开 false 表示侧边栏关闭
    minSide: false, //小屏的时候显示的侧边栏
    dropDown: { //总感觉这里的dropdown组件写的还是不行
        data:[],
        position:{},
        show: false,
        id:''
    },
    dropItem:{}
}

const actions = {
    ['gStart']({commit}) {
        commit(START_PROGRESS)
    },
    ['gFinish']({commit}) {
        commit(FINISH_PROGRESS)
    },
    ['gDone']({commit}) {
        commit(DONE_PROGRESS)
    },
    ['gHide']({commit}) {
        commit(HIDE_PROGRESS)
    },
    ['gShow']({commit}) {
        commit(SHOW_PROGRESS)
    },
    ['handleSide']({commit}) {
        commit(HANDLE_SIDE)
    },
    ['autoClose']({commit}) {
        commit(AUTO_CLOSE)
    },
    ['autoOpen']({commit}) {
        commit(AUTO_OPEN)
    },
    ['minSideClose']({commit}) {
        commit(MIN_SIDE)
    },
}

const mutations = {
    [START_PROGRESS](state) {
        state.gProgress.start = true
    },
    [FINISH_PROGRESS](state) {
        state.gProgress.finish = true
        state.gProgress.start = false
    },
    [DONE_PROGRESS](state) {
        state.gProgress.finish = false
    },
    [HIDE_PROGRESS](state) {
        state.gProgressShow = false
    },
    [SHOW_PROGRESS](state) {
        state.gProgressShow = true
    },
    [HANDLE_SIDE](state) {
        if (!state.autoSide) {//就是因为这里，他才不能用css的media来设置
            state.minSide = true
        }
        state.handleSide = !state.handleSide
    },
    [AUTO_CLOSE](state) {
        state.autoSide = false
    },
    [AUTO_OPEN](state) {
        state.autoSide = true
    },
    [MIN_SIDE](state) {
        state.minSide = false
    },
    [CLOSE_DROP](state) {
        state.dropDown.show = false
    },
    [TOGGLE_DROP] (state, {el, data}) {
        const rect = el.getBoundingClientRect()
        state.dropDown.data = data
        state.dropDown.position = {
            top: rect.top + rect.height + 'px',
            left: rect.left - 200 + 'px'
            //transition: 'all ease .3s'
        }
        state.dropDown.show = true
    },
    [UPDATE_DROP_ITEM] (state, config) {
        state.dropItem = config
        state.dropDown.show = false
    }
}

const getters = {
    ['getProgress'](state) { return state.gProgress },
    ['getGPS'](state) { return state.gProgressShow },//不是GPS 是gProgressShow的简写
    ['getHSide'](state) { return state.handleSide },
    ['getASide'](state) { return state.autoSide },
    ['getMinSide'](state) { return state.minSide },
    ['getDrop'](state) { return state.dropDown },
    ['getDropItem'] (state) { return state.dropItem}
}

export default {
    actions,
    state,
    mutations,
    getters
}