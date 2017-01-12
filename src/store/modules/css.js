import {
    SIDE_RUN,
    MINSIDE_CLOSE,
    CHANGE_SIDE,
    START_PROGRESS,
    FINISH_PROGRESS,
    DONE_PROGRESS,
    HIDE_PROGRESS,
    SHOW_PROGRESS,
    CLOSE_DROP,
    TOGGLE_DROP,
    UPDATE_DROP_ITEM
} from '../mutation-types'

const state = {
    gProgress: {
        start: false,
        finish: false
    },
    sidebar: {
        side: true,//true代表打开
        minside: false,//小屏时侧边栏默认关闭
        size: true,//true表示大尺寸
        running: false
    },
    gProgressShow: true,
    // autoSide: true, //根据屏幕大小调节侧边栏显示状况
    // handleSide: true,//true 表示侧边栏打开 false 表示侧边栏关闭
    // minSide: false, //小屏的时候显示的侧边栏
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
}

const mutations = {
    [SIDE_RUN] (state, option) {
        state.sidebar.running = option
    },
    [CHANGE_SIDE] (state, {size, running, side}) {
        if(size) {
            state.sidebar.side = !state.sidebar.side

        } else {
            state.sidebar.minside = !state.sidebar.minside
        }
        state.sidebar.running = running
        state.sidebar.size = size

    },
    [MINSIDE_CLOSE] (state) {
        state.sidebar.minside = false
    },
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
    [CLOSE_DROP](state) {
        state.dropDown.show = false
    },
    [TOGGLE_DROP] (state, {el, data}) {
        const rect = el.getBoundingClientRect()
        state.dropDown.data = data
        state.dropDown.position = {
            top: rect.top + rect.height + 'px',
            left: rect.left - 200 + 'px'
        }
        state.dropDown.show = true
    },
    [UPDATE_DROP_ITEM] (state, config) {
        state.dropItem = config
        state.dropDown.show = false
    }
}

const getters = {
    'getSidebar' : state => state.sidebar,
    'getProgress' : state => state.gProgress ,
    'getGPS' : state => state.gProgressShow ,//不是GPS 是gProgressShow的简写
    'getDrop': state => state.dropDown ,
    'getDropItem': state => state.dropItem
}

export default {
    actions,
    state,
    mutations,
    getters
}