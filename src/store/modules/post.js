import {
    ARTICLE_GET,
    RECEIVE_TOPICS,
    ALL_TAGS_GET,
    TOPICS_IN_TAG,
    RESUME
} from '../mutation-types'
import api from '~src/api'

const state = {
    article: {},
    articleId: '',
    topic: {
        list: [],
        haveNext: 0,
        page: 1
    },
    allTags: [],
    topicInTag: {
        list: [],
        haveNext: 0,
        page: 1
    },
    resume: {
        basicInfo:{},
        info: {},
        list: []
    }
}

const actions = {
    async ['receiveTopics']({commit}, config) {
        var {data: {topics}} = await api.get('/topics', config)
        var topic = {
            list:topics[1],
            //  topics[1].map(({objectId, title, content, authname, authId, }) => {
            //     return { objectId, title, content, authname, authId }
            // }),
            haveNext: topics[0] > config.page * config.limit
        }
        if (config.id) {
            commit(TOPICS_IN_TAG, { ...config, ...topic })
        } else {
            commit(RECEIVE_TOPICS, { ...config, ...topic })
        }
        // 合并多个对象到一个对象

    },
    async ['getArticle']({commit}, config) {
        var {data: {article}} = await api.get('/article', config)
        if (article) {
            //这里应该准备一个404页面，而不是用if else先放着
            commit(ARTICLE_GET,article)
        } else {
            console.log('没有找到该文章')
        }

    },
    async ['getAllTags']({commit}) {
        var {data: {allTags, code, msg}} = await api.get('/tags')
        if (code === 200) {
            commit(ALL_TAGS_GET, allTags)
        } else {
            console.log(msg)
        }
    },
    async ['getResume']({commit}) {
        var {data} = await api.get('/resume')
        commit(RESUME, data)
    }
}

const mutations = {
    [ARTICLE_GET](state, {objectId, ...article}) {
        state.article = article
        state.articleId = objectId
        //+ id和article暂时先分开
    },
    [RECEIVE_TOPICS](state, {list, haveNext, page}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.topic.list.concat(list)
        }
        state.topic = { list, haveNext, page }
        //+
    },
    [ALL_TAGS_GET](state, allTags) {
        state.allTags = allTags
    },
    [TOPICS_IN_TAG](state, {list, haveNext, page}) { //这里重复了以后会改掉
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.topicInTag.list.concat(list)
        }
        state.topicInTag = { list, haveNext, page }
    },
    [RESUME] (state, data) {
        state.resume = data
    }
}

const getters = {
    'getTopics' : state =>  state.topic ,
    'getArticle' : state =>  state.article ,
    'getAllTags' : state =>  state.allTags ,
    'getTopicInTag' : state => state.topicInTag,
    'getResume' : state =>  state.resume
}

export default {
    actions,
    state,
    mutations,
    getters
}