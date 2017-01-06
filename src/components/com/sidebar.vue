<template>
    <div class="myside" :class="{open: handleSide}" v-show="autoSide">
        <div class="list">
            <router-link class="item" :to="{name: 'as'}"><i class="material-icons icon">home</i>Articles</router-link>
            <router-link class="item" :to="{name: 'ts'}"><i class="material-icons icon">apps</i>Tags</router-link>
            <router-link v-if="login" class="item" :to="{name: 'u'}"><i class="material-icons icon">account_circle</i>Profile</router-link>
            <router-link class="item" :to="{name: 'up'}"><i class="material-icons icon">people</i>People</router-link>
            <router-link class="item" :to="{name: 'aa'}"><i class="material-icons icon">headset</i>About</router-link>
        </div>
        <div class="copyRight">
            <div><a class="source" href="https://github.com/ZinCode/vue-ssr-blog-client" target="blank">博客源码</a></div>
            <div>©2017 Josephine</div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                autoSide: 'getASide',
                handleSide: 'getHSide',
                login: 'getLogState',
                user: 'getUserInfo',
            })
            // close () {
            //     if(handleSide)
            // }
        }
    }
</script>
<style scoped>

    .content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
    }
    .icon {
        font-weight: 300;
        width: 20px;
        padding-right: 22px;
        height: inherit;
        line-height: 48px;
        color: #757575;
    }
    .myside {
        position: fixed;
        top: 64px;
        bottom: 0;
        left: 0;
        padding-top: 16px;
        width: 210px;
        background-color: #f4f5f7;
        z-index: 50;
        will-change: transform;
       transform: translateX(-210px);
        transition: transform .3s cubic-bezier(0.0,0.0,0.2,1);
    }
    
    .open {     
         transform: translateX(0);
    }
    
    .list {
        padding-bottom: 8px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
    }
    
    .item {
        display: flex;
        outline: none;
        cursor: pointer;
        padding: 0 12px 0 20px;
        color: rgba(0,0,0,0.87);
        font-size: 14px;
        height: 48px;
        font-weight: 500;
        opacity: .85;
        line-height: 50px;
        overflow: hidden;
        transition: background-color .3s cubic-bezier(0,0,0.2,1);
    }
    .item:hover {
        background-color: #e7e7e7;
        /*这里先用hover解决*/
    }
        .Articles {
        color: red;
        background-color: #e7e7e7;
    }
    .copyRight {
        flex: none;
        margin: 5px 0 24px 24px;
        font-size: 12px;
        line-height: 16px;
    }
    .source {
        font-weight: 500;
        color: #757575;
    }
</style>