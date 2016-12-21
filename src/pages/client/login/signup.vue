<template>
    <div>
        <p>用户名：<input type="text" v-model="username" value=""></p>
        <p>密码：<input type="password" v-model="password" value=""></p>
        <p>确认密码：<input type="password" v-model="repassword" value=""></p>
        <p>你的邮箱：<input type="text" v-model="email" value=""></p>
        <p><button @click="signup">注册</button></p>
    </div>
</template>
<script>
    import api from 'src/api'
    export default {
        data() {
            return {
                username: '',
                password: '',
                repassword: '',
                email: ''
            }
        },
        methods: {
            async signup() {
                var {data:{code, msg}} = await api.post('/user/signup', {
                    username: this.username,
                    password: this.password,
                    email: this.email
                })
                if(code === 200) {
                    alert('注册成功')
                }
            }
        },
        mounted () {
            alert('目前还不是正式版，没有进行用户重名验证，密码是明文传输，在你注册的时候会发送邮箱验证，验证成功后会弹窗提示注册成功，然后你就可以登陆了，你可以先注册一个临时账号体验一下功能')
        }
    }
</script>
