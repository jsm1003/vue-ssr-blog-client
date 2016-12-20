<template>
    <div>
        <p>管理员登陆</p>
        <p>用户名：<input type="text" v-model="username" value=""></p>
        <p>密码：<input type="password" v-model="password" value=""></p>
        <p><button @click="login">登陆</button></p>
    </div>
</template>
<script>
export default {
        data () {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            login () {
                console.log('管理员正在登陆')
            }
        }
    }
</script>