<template>
  <div id="app">
    <navbar></navbar>
    <sidebar></sidebar>
    <min-sidebar></min-sidebar>
    <contentbar></contentbar>
  </div>
</template>
<script>
//import ls from 'local-storage' //这个localstorage不行啊，先不用了擦
import NProgress from 'nprogress'
import throttle from 'lodash/throttle'
import {mapGetters} from 'vuex'
import navbar from './components/com/navbar'
import sidebar from './components/com/sidebar'
import minSidebar from './components/com/minSidebar'
import contentbar from './components/com/contentbar'

NProgress.configure({ 
  showSpinner: false,
//  trickleRate: 0.02,
//   trickleSpeed: 800,
//   ease: 'ease', 
   speed: 500
 })
export default {
  components: {
    navbar,
    sidebar,
    contentbar,
    minSidebar
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
          side: 'side',
          gProgress: 'getProgress',
          gPS: 'getGPS',
          dropshow: 'getDrop'
     })
  },
  methods: {
    scroll () {
      console.log('滚动啦')
    },
    resize () {
      if(window.innerWidth > 750) {
        this.$store.dispatch('autoOpen')
      } else {
        console.log('xiao')
        this.$store.dispatch('autoClose')
      }
    },
    updateLogin (e) {
      if(e.key === 'testIsLogin') {
        if(e.newValue === 'yes') {
          this.$store.dispatch('getUserData')
         }
      } 
    },
    handleClick (e) {
      if(this.dropshow) {
        this.$store.dispatch('closeDrop')
        e.preventDefault()
      } 
    }
  },
  watch: {
    'gProgress' : {
      handler (val) {
          if(this.gPS) {
              if (val.start) NProgress.start()
              if (val.finish) {
                  NProgress.done()
                  this.$store.dispatch('gDone')
            }
        } 
      },
    deep: true
    }

  },
  mounted () {
    if(typeof window !== 'underfined') {
        this.resize()//开始时执行一遍
        window.addEventListener('storage', this.updateLogin)
        window.addEventListener('scroll', throttle(this.scroll, 1000,{trailing: false}))
        window.addEventListener('resize', throttle(this.resize, 800))
        document.addEventListener('click', this.handleClick,{capture: true})//事件捕获阻止路由跳转
        //默认应该获取一下用户的头像等基本信息       
    }
  }
}

</script>
<style src="assets/css/index.css"></style>
<style src="assets/css/article.css"></style>
<style src="assets/css/atom-onelight.css"></style>
<style src="assets/css/arrow-circle.css"></style>
<style src="assets/css/nprogress.css"></style>
<style scoped>
      .fade-enter-active, .fade-leave-active {
        transition: all 1s ease;
    }
    .fade-enter, .fade-leave-active{
        transform: translateY(-20px);
    }
</style>
<!--我这里把css文件单独拿出来了-->

