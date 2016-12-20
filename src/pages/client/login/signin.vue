<template>
    <div>
        <p>用户登录</p>
        <p>用户名：<input type="text" v-model="username" value=""></p>
        <p>密码：<input type="password" v-model="password" value=""></p>
        <p><button @click="login">登陆</button></p>
    </div>
</template>
<script>
import api from 'src/api'
export default {
        data () {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            async login () {
                var {data: {code,msg}} = await api.post('/user/login', {
                    username: this.username,
                    password: this.password
                })//目前是明文传输，后续会稍微做一点加密
                if(code === 200) {
                    console.log(msg)
                        localStorage.setItem('testIsLogin', 'yes')
                         setTimeout(() => {
                             window.close()
                         }, 1000)
                    
                } else {
                    localStorage.setItem('testIsLogin', 'no')
                }
               // console.log('正在登陆')
            }
        }

    }
</script>
 