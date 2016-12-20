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
        }
    }
</script>
