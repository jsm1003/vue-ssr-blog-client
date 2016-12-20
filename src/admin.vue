<template>
    <div id="app">
         <router-link class="tab" to="/admin/login"><a>posts</a></router-link>
         <router-view></router-view>
    </div>
</template>

<script>
import sidebar from 'components/com/sidebar'
export default {
    components:{sidebar}
}
//我认为把这两个界面的登陆都弄成spa模式比较好，和登陆进去后的主体部分是分离开的
//我先这么弄弄完了以后再考虑，把两个登陆界面都单独出来，因为不单独的话他会加载整个js文件，这样不好



// import axios from 'axios'

// // const defaults = {
// //     baseURL: 'http://localhost:3000/api',
// //     timeout: 3000
// // }
// //Object.assign(axios.defaults, defaults)
// //不知道为什么登陆组件用不到api中的内容，应该是打包的问题
//     export default {
//         data () {
//             return {
//                 username: '',
//                 password: ''
//             }
//         },
//         methods: {
//               async login () {
//                  var aa = await axios({
//                      method: 'post',
//                      url: '/user/login',
//                      baseURL: 'http://localhost:3000/api',
//                      timeout: 3000,
//                      data: JSON.stringify({
//                          username: this.username,
//                          password: this.password
//                      }),
//                     headers: {
//                          'content-type': 'application/json; charset=UTF-8',
//                          'Accept': 'application/json; charset=UTF-8'
//                         },
//                     withCredentials: true,
//                     //这行以后会删除
//                  })
//                  console.log(aa)
//                 }
//             }
//         }
</script>