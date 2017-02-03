<template>
    <div class="resume">
        <div class="header">
            <div class="user">
                <div class="avatar">
                    <img class="avatar-p" src="~assets/img/auth.jpg" alt="" />
                    <!--图片引用这里还是不爽啊-->
                </div>
                <div class="info">
                    <div class="authname">瞎看什么</div>
                    <div class="sign">别再用肉眼看电影了，用别的眼睛看</div>
                </div>
            </div>
        </div>
        <div class="main" ref="main">
            <div class="col mcol" ref="col" @click="test">每一行</div>
            <div class="col mcol">每一列</div>
            <!--<div class="item mcol" v-for="item in resume.list">
                <div class="heading">{{ item.type }}</div>
                <ul class="detail">
                    <li class="list" v-for="i in item.item">
                        <div v-if="i.summary">
                            <div class="title">{{ i.summary}}</div>
                            <div class="list-item" v-for="description in i.description">{{ description}}</div>
                        </div>
                        <div class="list-item" v-else>{{i}}</div>
                    </li>
                </ul>
            </div>-->
        </div>
    </div>
</template>
<script>
    import api from '~src/api'
    import { on, off } from '~src/utils'
    import throttle from 'lodash/throttle'
    import { mapGetters } from 'vuex'
    function fetchResumeData(store) {
        store.dispatch('getResume')
    }
    export default {
        name: 'resumeeee',
        preFetch: fetchResumeData,
        computed: {
            ...mapGetters({
                resume: 'getResume'
            })
        },
        methods: {
            go() {
               this.$refs.main.appendChild(this.$refs.col)
            },
            test() {
                console.log('keyi?')
            }
        },
        // render (createElement) {
        //     return createElement('h2')
        // },
        mounted() {
            fetchResumeData(this.$store)
            this.$watch('resume.list', () => {
                this.go()
            })
            //unwatch()
        },
        // updated () {
        //     console.log(this.resume)
        // }
    }
</script>
<style scoped>
.resume {
    
}
  .header {
    background: url(~assets/img/winter.jpg) no-repeat;
    background-size: cover;
    width: 100%;
    /*max-width: 850px;*/
    height: 200px;
    position: relative;
    color: #ffffff;
    font-size: 18px;
    border-radius: 2px;
}
.header::after {
    display: block;
    background: url(~assets/img/snow.png);
    content: '';
    transform-origin:left top;
    transform: scale(1.5);
    width: calc(100%/1.5);
    height: calc(100%/1.5);
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
    background:url(~assets/img/gradient-bg.png) repeat-x;
    content: '';
    width: 100%;
    height: 84px;
    position: absolute;
    bottom: 0;
    z-index: -2;
}
.avatar {
    border: 4px solid rgba(255,255,255, .6);
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(0,0,0,.4);
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
    padding-bottom: 7px;
    /*border: 1px solid blue;*/
}
.authname {
    font-weight: 500;
    font-size: 30px;
    line-height: 1em;
    /*height: 18px;*/
    /*margin-bottom: 8px;*/
    margin-top: 10px;
}
.authname:hover {
    cursor: pointer;
    text-decoration: underline;
}
.sign {
    margin-top: 20px;
    color: #212121;
    font-size: 14px;
    line-height: 26px;
    height: 26px;
    width: 740px;
    font-weight: 400;
    /*这里的宽度*/
    text-overflow: ellipsis;
    font-family: 'Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif;
}
.main {
    position: relative;
    margin-top: 50px;
    display: flex;
    /*flex-wrap: wrap;*/
    /*第一行在上方*/
}
.col {
    border: 1px solid red;
    box-sizing: border-box;
}
.mcol {
    max-width: 530px;
}
.mcol+.mcol {
    margin-left: 24px;
}
.item {
    /*margin-left: 20px;*/
    margin-top: 20px;
    /*上面的是临时的*/
    background: #ffffff;
    width: 400px;
    height: auto;
    padding: 24px;
    border-radius: 2px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
}
.heading {
    color: rgba(0,0,0,0.87);
    font: 500 20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
}
.detail {
    margin-top: 24px;
}
.list {
    margin-top: 16px;
}
.title {
    color: rgba(0,0,0,0.54);
    font: 500 14px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
    margin-bottom: 8px;
}
.list-item {
    color: #212121;
    font: 400 16px  Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
    line-height: 1.5em;
    margin-top: 10px;
    padding-left: 28px;
}
.list-item::before {
    content: '★';
    /*暂时先用这个星星代替*/
    margin-left: -28px;
    width: 28px;
    display: inline-block;
}

@keyframes snow{
    0% {
        background-position: -0px 0px;
        }
    100% {
        background-position: -3600px 0px;
    }
}
@media only screen and (min-width: 440px){
    .resume {
    width: calc((100% + 210px) - 2*16px);
    }
}

@media only screen and (min-width: 1070px){
    .resume {
    width: calc((100% + 210px)*8/10 - 24px);
    max-width: 1084px;
    }
}
@media only screen and (min-width: 1280px){
    .resume {
    width: calc((100% + 210px)*2/3 - 24px);
    max-width: 1084px;
    }
}
/*瀑布流每一列的宽度*/
@media only screen and (min-width: 440px){
 .col{
    width: calc((100% + 210px) - 2*16px);
}
}
@media only screen and (min-width: 1070px){
 .col{
    width: calc(((100% + 210px - 24px)*4/10) - 24px);
}
}
@media only screen and (min-width: 1280px){
 .col{
    width: calc(((100% + 210px - 24px)*4/12) - 24px);
}
}
</style>