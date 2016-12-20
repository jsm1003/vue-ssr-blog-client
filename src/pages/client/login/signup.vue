<template>
    <div>
        <p>用户名：<input type="text" v-model="username" value=""></p>
        <p>密码：<input type="password" v-model="password" value=""></p>
        <p>确认密码：<input type="password" v-model="repassword" value=""></p>
        <p><button @click="signup">注册</button></p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                repassword: ''
            }
        },
        methods: {
            signup() {
                setTimeout(() => {
                   // console.log('过了3秒')
                     window.close()
                     //只能关闭用脚本打开的页面
                     //window.onbeforeunload
                     //当窗口即将被卸载时,会触发该事件.此时页面文档依然可见,且该事件的默认动作可以被取消
                }, 3000)
            }
        }
    }
</script>
