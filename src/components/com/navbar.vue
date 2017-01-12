<template>
    <div class="mynav">
        <div class="banner">
            <div class="main">
                <div @click="handleSide" class="menu">
                    <!--<div class="ripple"></div>-->
                    <i class="material-icons button">menu</i>
                </div>
                <!--<div class="searchinfo">-->
                <div class="title">
                    <div class="logoName">
                        <router-link to="/articles">Josephine</router-link>
                    </div>
                    <!--如果写成a标签他会刷新一遍？-->
                    <div class="pageTitle">Home</div>
                </div>
                <div class="search">
                    <div class="icon-wrap">
                        <!--<svg viewBox="0 0 24 24" height="100%" width="100%"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>-->
                        <i class="material-icons">search</i>
                    </div>
                    <div class="input">Search</div>
                    <!--</div>-->
                </div>
            </div>
            <div class="info">
                <div class="item btn icon-search">
                    <i class="material-icons">search</i>
                </div>
                <div class="item btn">
                    <i class="material-icons">notifications</i>
                </div>
                <!--<div class="item btn" title="用户名字">-->
                <div class="item btn" @click="drop" ref="account" v-if="login" :title="user.email">
                    <span>{{ user.username }}</span>
                    <!--<div class="list">
                        <content><div class="inner">haha</div></content>
                        <content><div class="inner">yayaya</div></content>
                    </div>-->
                </div>
                <div class="item btn" title="登陆" @click="signIn" v-else>
                    <i class="material-icons">account_circle</i>
                </div>
                <!--<drop :position="position" :data="dropData" @dropClick="itemClick"></drop>-->
            </div>
        </div>
    </div>
</template>
<script>
    import api from '~src/api'
    import { mapGetters } from 'vuex'
    import drop from '~components/drop'

    const fetchUserData = (store) => {
        return store.dispatch('getUserData')
    }
    export default {
        name: 'navbar',
        preFetch: fetchUserData,
        data() {
            return {
                dropData: ['个人信息', '退出', '我的草稿']
            }
        },
        computed: {
             ...mapGetters({
                sidebar: 'getSidebar',
                user: 'getUserInfo',
                login: 'getLogState',
                dropItem: 'getDropItem'
            })
        },
        watch: {
            dropItem() {//感觉这里watch有瑕疵啊？就是重复点击同一个item，按理说他不会触发，但是他触发了。。（我希望的是他触发）
                this.itemClick()
            }
        },
        methods: {
            itemClick() {
                const item = this.dropItem.item
                //if(this.dropItem.id) return  这一句先不加呢
                switch (item) {
                    case '个人信息':
                        this.$router.push({ name: 'u' })
                        break
                    case '退出':
                        this.logout()
                        break
                    case '我的草稿':
                        this.$router.push({ name: 'ds' })
                        break
                }
            },
            signIn() {
                //这里只是个临时的，后续要改
                if (typeof window !== 'undefined') {
                    window.open('/signin')
                }
            },
            handleSide() {
                if (typeof window !== 'undefined') {
                    if(this.sidebar.running) return//防止点击次数过快,体验还是不行，要么就是直接在docuemnt上监听点击事件，加入防抖
                    var size = true 
                    size = window.innerWidth > 750 ? true : false
                    this.$store.commit('CHANGE_SIDE', {size:size,running:true} )
                }
                //如果是其他页面，可以添加一个判断来判定是否打开minside
                // this.$store.dispatch('handleSide')
            },
            logout() {
                this.$store.dispatch('logout')
            },
            drop() {
                const el = this.$refs.account
                this.$store.commit('TOGGLE_DROP', { el, data: this.dropData })
            }
        },
        mounted() {
            fetchUserData(this.$store)
        }
    }
</script>
<style scoped>
    a {
        color: #ffffff;
        }
    .mynav {
        /*height: 64px;*/
        width: 100%;
        /*background-color: #aaaaaa;*/
        background-color: #4285f4;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0;
        z-index: 100;
        color: #ffffff;
    }
    
    .banner {
        height: 64px;
        display: flex;
        justify-content: space-between;
    }
    .btn {
        cursor: pointer;
    }
    .banner .main {
        /*padding: 8px 30px 8px 10px;*/
        /*height: 64px;*/
        display: flex;
        align-items: center;
        
    }
    .searchinfo {
        /*上面这个标签还没有用*/
        display: flex;
        flex-direction: row;
        flex-shrink: 1;
        align-items: center;
        flex-grow: 1;
    }
    
    .menu {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        width: 48px;
        height: 48px;
        cursor: pointer;
    }
    
    .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 48px;
        /*width: 190px;*/
        margin-left: 10px;
        font-size: 20px;
    }
    
    .title .logoName {
        font-size: 20px;
    }
    
    .title .pageTitle {
        border-left: 1px solid rgba(255, 255, 255, 0.2);
        padding-left: 24px;
        margin-left: 24px;
        line-height: 32px;
        font-weight: 500;
    }
    
    .banner .info {
        padding-left: 30px;
        padding-right: 30px;
        position: relative;
        text-align: right;
        height: 64px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .search {
        height: 48px;
        /*上面要用到media*/
        display: flex;
        flex-grow: 1;
        margin-left: 48px;
        margin-right: 36px;
        cursor: text;
        /*max-width: 720px; 这里设置max—width不管用？*/
        width: 720px;
        max-width: 720px;
        border-radius: 3px;
        background: rgba(255,255,255,.15);
        align-items: center;
        box-sizing: border-box;
    }
    .icon-search {
        display: none;
    }
    @media only screen and (max-width: 600px) {
        .search {
            display: none;
        }
        .icon-search {
            display: flex;
        }
    }
    .icon-wrap{
        display: inline-block;
        height: 24px;
        pointer-events: none;
        width: 24px;
        margin: auto 8px;
    }
    .input {
        flex-shrink: 0;
        margin: auto;
        flex-grow: 1;
        box-flex: 1;
        color: rgba(255,255,255,0.75);
        font-size: 16px;
    }
    
    .item {
        padding: 0 0 0 15px;
        position: relative;
    }
    @media only screen and (min-width: 600px) {
        .search {
            height: 40px;
        }
    }
</style>