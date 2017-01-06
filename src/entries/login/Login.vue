<template>
    <div class="main">
        <router-link to="/signin">登陆</router-link>
        <router-link to="/signup">注册</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
    import { cas } from '~assets/js/canvas'
    export default {
        mounted() {
            cas()
        }
    }
</script>
<style src="~assets/css/login.css"></style>
<style scoped>
.main {
    z-index: 50;
    position: fixed;
    width: 100%;
    height: 100%;
    }
</style>