<template>
    <div>
        <transition name="slide" @afterEnter="handleTrans" @afterLeave="handleTrans">
            <div class="min-side" v-if="!sidebar.size && sidebar.minside">
                <!--这里的动画效果就应该用transition来弄-->
                <div class="top" @click="closeMinSide">
                    <div class="sitename">Josephine</div>
                    <div class="back"><i class="material-icons">keyboard_arrow_left</i></div>
                </div>
                <div class="list">
                    <div class="links">
                        <router-link class="link" to="{name: 'as'}"><i class="material-icons icon">home</i>Articles</router-link>
                        <router-link class="link" to="{name: 'ts'}"><i class="material-icons icon">apps</i>Tags</router-link>
                        <router-link v-if="login" class="link" to="'/u/' + 345"><i class="material-icons icon">account_circle</i>Profile</router-link>
                        <router-link class="link" to="{name: 'aa'}"><i class="material-icons icon">headset</i>About</router-link>
                    </div>
                </div>
                <div class="copyRight">
                    <div>博客源码</div>
                    <div>©2017 Josephine</div>
                    <!--这个时间要改一改-->
                </div>
            </div>
            <!--这个modal可以弄成伪元素啊，以后再改-->
        </transition>
        <div class="modal" v-if="!sidebar.size && sidebar.minside" @click="closeMinSide"></div>
    </div>

</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                sidebar: 'getSidebar',
                login: 'getLogState'
            })
        },
        methods: {
            closeMinSide() {
                this.$store.commit('MINSIDE_CLOSE')
            },
            handleTrans() {
                this.$store.commit('SIDE_RUN', false)
            }
        }
    }
</script>
<style scoped>
        .slide-enter-active {
        transition: all .3s cubic-bezier(0.0,0.0,0.2,1);
        }
    .slide-leave-active {
        transition: all .3s cubic-bezier(0.4,0.0,1,1);
    }
    .slide-enter, .slide-leave-active {
        transform: translateX(-300px);
    }
    .min-side {
        position: fixed;
        /*上面一会儿吧body的高度改为100%*/
        top: 0;
        bottom: 0;
        left: 0;
        width: 300px;
        /*height: 100%;*/
        background-color: #ffffff;
        z-index: 500;
        box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.4); 
    }
    .top {
        display: flex;
        align-items: center;
        cursor: pointer;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        height: 64px;
        padding: 0 16px;
    }
    .sitename {
        color: #666666;
        height: 24px;
        width: 88px;
        /*margin-top: 4px;*/
        font-size: 20px;
        font-weight: 500;
        flex-grow: 1;
        /*上面这句是关键点*/
    }
    .back {
        display: flex;
        align-items: center;
        font-size: 32px;
        font-weight: 500;
        color: rgb(117, 117, 117);
    }
    .list {
        display: flex;
        overflow-y: auto;
        box-orient: vertical;
        flex-direction: column;
    }
    .links {
        font-size: 14px;
        flex-grow: 1;
        flex-shrink: 0;
        /*上面这两行貌似没有用*/
        padding-bottom: 8px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
    }
    .icon {
        font-weight: 300;
        width: 20px;
        padding-right: 22px;
        height: inherit;
        line-height: 48px;
        color: #757575;
    }
    .link {
        display: flex;
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
    .link:hover {
        background-color: #e7e7e7;
    }
    .copyRight {
        flex: none;
        margin: 5px 0 24px 24px;
        font-size: 12px;
        line-height: 16px;
    }
    .open {
        transform: translateX(0);
    }
    
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 300;
        background-color: rgba(0,0,0,0)
    }
    
    /*@media only screen and (max-width: 750px) {
        .myside {
            display: block;
        }
    }*/
</style>