<template>
    <div class="resume">
        <main>
            <div class="header" :style="{backgroundImage: bg}" style="background-repeat:no-repeat;background-size: cover;">
                <!--这里是vue的bug 设置style为background简写属性的时候，再写background-size属性不管用-->
                <div class="user">
                    <div class="avatar">
                        <img class="avatar-p" :src="resume.basicInfo.avatar" alt="avatar" />
                    </div>
                    <div class="info">
                        <div>
                            <span class="authname">{{resume.basicInfo.name}}</span>
                            <span class="sign">{{resume.basicInfo.description}}</span>
                        </div>
                        <div>
                            <i class="material-icons btn" @click="drop" ref="moreAboutResume">more_vert</i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main">
                <article class="first">
                    <div class="item">
                        <div class="heading">基本信息</div>
                        <ul class="detail">
                            <li class="list">
                                <div class="list-item offer">{{resume.info.offer}}</div>
                                <div class="list-item email">{{resume.info.email}}</div>
                                <div class="list-item phone">{{resume.info.phone}}</div>
                                <div class="list-item education">{{resume.info.education}}</div>
                                <div class="list-item wechat">{{resume.info.wechat}}</div>
                                <div class="list-item github">{{resume.info.github}}</div>
                                <div class="list-item address">{{resume.info.address}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="item" v-for="item in odd(resume.list)">
                        <div class="heading">{{ item.type }}</div>
                        <ul class="detail">
                            <li class="list" v-for="i in item.item">
                                <div v-if="i.summary">
                                    <div class="title">{{ i.summary}}</div>
                                    <div class="list-item star" v-for="description in i.description">{{ description}}</div>
                                </div>
                                <div class="list-item star" v-else>{{i}}</div>
                            </li>
                        </ul>
                    </div>
                </article>
                <article class="last">
                    <div class="item" v-for="item in even(resume.list)">
                        <div class="heading">{{ item.type }}</div>
                        <ul class="detail">
                            <li class="list" v-for="i in item.item">
                                <div v-if="i.summary">
                                    <div class="title">{{ i.summary}}</div>
                                    <div class="list-item star" v-for="description in i.description">{{ description}}</div>
                                </div>
                                <div class="list-item star" v-else>{{i}}</div>
                            </li>
                        </ul>
                    </div>
                </article>
            </div>
        </main>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    function fetchResumeData(store) {
        return store.dispatch('getResume')
    }
    export default {
        name: 'resume',
        preFetch: fetchResumeData,
        data() {
            return {
                dropData: ['PDF下载', '简历源码', '我的知乎']
            }
        },
        computed: {
            ...mapGetters({
                resume: 'getResume',
                dropItem: 'getDropItem'
            }),
            bg() {
                return `url(${this.resume.basicInfo.background})`
            }
        },
         watch: {
            dropItem() {//感觉这里watch有瑕疵啊？就是重复点击同一个item，按理说他不会触发，但是他触发了。。（我希望的是他触发）
                this.itemClick()
            }
        },
        methods: {
            //伪瀑布流，真的瀑布流还不会弄呢
            odd(list) {
                return list.filter((i, index) => (index + 1) % 2 === 0)
            },
            even(list) {
                return list.filter((i, index) => index % 2 === 0)
            },
             drop() {
                const el = this.$refs.moreAboutResume
                this.$store.commit('TOGGLE_DROP', { el, data: this.dropData })
            },
            itemClick() {
                 const item = this.dropItem.item
                  switch (item) {
                    case 'PDF下载':
                        window.open('http://oaxfgzulv.bkt.clouddn.com/%E7%8E%8B%E5%B0%8F%E5%8B%87-%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88-17.pdf')
                        break
                    case '简历源码':
                        window.open('https://github.com/ZinCode/vue-ssr-blog-client/blob/master/src/pages/client/about/resume-everyone.vue')
                        break
                    case '我的知乎':
                        window.open('https://www.zhihu.com/people/hzimmer')
                        break
                }
            }
        },
        beforeMount() {
            fetchResumeData(this.$store)
        }
    }

</script>
<style scoped>
    @import '~assets/css/FontAwesome.css';
    .header {
        width: 100%;
        padding-top: 20%;
        /*背景图片自适应大小小技巧*/
        position: relative;
        color: #ffffff;
        font-size: 18px;
        border-radius: 2px;
    }
    
    .header::after {
        position: absolute;
        top: 0;
        display: block;
        background: url(~assets/img/snow.png);
        padding-top: calc(20%/1.5);
        content: '';
        transform-origin: left top;
        transform: scale(1.5);
        width: calc(100%/1.5);
        /*height: calc(100%/1.5);*/
        border-radius: 2px;
        animation: snow 1.33s steps(40) 0s infinite;
    }
    
    .user {
        width: 100%;
        height: 59px;
        position: absolute;
        bottom: 0;
        z-index: 1;
    }
    
    .user::after {
        display: block;
        background: url(~assets/img/gradient-bg.png) repeat-x;
        content: '';
        width: 100%;
        height: 84px;
        position: absolute;
        bottom: 0;
        z-index: -2;
    }
    
    .avatar {
        border: 4px solid rgba(255, 255, 255, .6);
        border-radius: 50%;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, .4);
        left: 22px;
        top: 0;
        position: absolute;
        width: 96px;
        height: 96px;
    }
    
    .avatar-p {
        background: #fff;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: relative;
        z-index: -1;
    }
    
    .info {
        margin-left: 144px;
        display: flex;
    }
    
    .authname {
        display: inline-block;
        font-weight: 500;
        font-size: 30px;
        line-height: 1em;
        margin-top: 10px;
    }
    
    .authname:hover {
        cursor: pointer;
        text-decoration: underline;
    }
    
    .btn {
        user-select: none;
        margin: 10px 10px 0 0;
        cursor: pointer;
        font-size: 24px;
    }
    
    article {
        width: 50%;
        box-sizing: border-box;
    }
    
    article.first {
        padding-right: 10px;
    }
    
    article.last {
        padding-left: 10px;
    }
    
    @media screen and (max-width: 992px) {
        article {
            width: 100%;
        }
        article.first {
            padding-right: 0;
        }
        article.last {
            padding-left: 0;
        }
        .avatar {
            height: 60px;
            width: 60px;
            top: 20px;
        }
        .info {
            margin-left: 100px;
        }
        .authname {
            font-size: 24px;
            margin-top: 16px;
        }
    }
    
    .sign {
        display: inline-block;
        margin-top: 20px;
        color: #212121;
        font-size: 14px;
        line-height: 26px;
        height: 26px;
        width: 740px;
        font-weight: 400;
        /*这里的宽度*/
        text-overflow: ellipsis;
        font-family: 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
    }
    
    .main {
        margin-top: 34px;
        display: flex;
        flex-wrap: wrap;
    }
    
    .item {
        box-sizing: border-box;
        margin-top: 20px;
        /*上面的是临时的*/
        background: #ffffff;
        width: 100%;
        height: auto;
        padding: 24px;
        border-radius: 2px;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    }
    
    .resume {
        width: 100%;
    }
    
    @media (min-width: 750px) {
        .resume {
            width: 85%;
            max-width: 1000px;
        }
    }
    
    @media (min-width: 440px) {
        .resume {
            margin: 0 auto;
            padding: 0;
        }
    }
    
    .heading {
        color: rgba(0, 0, 0, 0.87);
        font: 700 20px Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    }
    
    .detail {
        margin-top: 20px;
    }
    
    .list {
        margin-top: 16px;
    }
    
    .title {
        color: teal;
        font: 600 18px Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        margin-bottom: 8px;
    }
    
    .list-item {
        color: #212121;
        font: 400 16px Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        line-height: 1.5em;
        margin-top: 10px;
        padding-left: 28px;
    }
    
    .list-item::before {
        font-family: 'FontAwesome';
        margin-left: -28px;
        width: 28px;
        display: inline-block;
    }
    
    .star::before {
        content: ' \f005';
    }
    
    .offer::before {
        content: '\f040';
    }
    
    .phone::before {
        content: '\f095';
    }
    
    .email::before {
        content: '\f0e0';
    }
    
    .education::before {
        content: '\f19d';
    }
    
    .wechat::before {
        content: '\f1d7';
    }
    
    .github::before {
        content: '\f09b';
    }
    
    .address::before {
        content: '\f2bc';
    }
    
    @keyframes snow {
        0% {
            background-position: -0px 0px;
        }
        100% {
            background-position: -3600px 0px;
        }
    }
</style>