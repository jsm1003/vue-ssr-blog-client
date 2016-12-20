import axios from 'axios'
import store from '../store'
//axios.defaults.baseURL = 'http://localhost:3000/api'
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const defaults = {
    baseURL: 'http://localhost:3000/api',
    timeout: 3000,
    withCredentials: true,
    //上面那一行应该是因为跨域，所以必须添加，生产环境下应该删除
}
//console.log(axios.defaults)
//即使console在前面仍然能够显示合并后的配置项，说明，js自动把下面这条语句提升了，类似变量提升
Object.assign(axios.defaults, defaults)


axios.interceptors.request.use(config => {
    store.dispatch('gStart')
    console.log('开始发送请求')
    return config
}, error => {
    console.log('错误')
    return Promise.reject(error)
})
//拦截请求加载动画

axios.interceptors.response.use(response => {
    store.dispatch('gFinish')

    console.log('相应成功')
    return response
}, error => {
    console.log('响应失败')
    return Promise.reject(error)
})

export default {
    get (url, params={}) {
        return axios({
            method: 'get',
            url: url,
            params,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).catch(err =>{
            console.log(err)
        })
    },
    post (url, data = {}) {
        //可以设置默认值
        return axios({
            method: 'post',
            url: url,
            data: JSON.stringify(data),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            }
        })
    },
    patch (url, data) {
//但PATCH一般用于资源的部分更新，而PUT一般用于资源的整体更新。
//当资源不存在时，PATCH会创建一个新的资源，而PUT只会对已在资源进行更新。
        return axios({
            method: 'patch',
            url: url,
            data:JSON.stringify(data),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            }
        })      
    },
    delete (url, data) {
         return axios({
            method: 'delete',
            url: url,
            data:JSON.stringify(data),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            }
        })         
    }

}

// application/x-www-form-urlencoded 常见的form提交
// multipart/form-data 文件提交
// application/json 提交json格式的数据
// text/xml 提交xml格式的数据