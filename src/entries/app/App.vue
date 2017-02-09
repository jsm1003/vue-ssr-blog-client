<template>
  <div id="app">
    <navbar></navbar>
    <sidebar></sidebar>
    <min-sidebar></min-sidebar>
    <contentbar></contentbar>
    <drop-down></drop-down>
  </div>
</template>
<script>
  import { on } from '~src/utils'
  import NProgress from 'nprogress'
  import throttle from 'lodash/throttle'
  import { mapGetters } from 'vuex'
  import navbar from '~components/com/navbar'
  import sidebar from '~components/com/sidebar'
  import minSidebar from '~components/com/minSidebar'
  import contentbar from '~components/com/contentbar'
  import dropDown from '~components/drop'

  NProgress.configure({
    showSpinner: false,
    //  trickleRate: 0.02,
    //   trickleSpeed: 800,
    //   ease: 'ease', 
    speed: 500
  })
  function easterEgg() {
    if (document.hidden) {
      document.title = "你又分心了，快快看过来"
    } else {
      document.title = 'Jose'
    }
  }
  export default {
    name: 'josephine',
    components: {
      navbar,
      sidebar,
      contentbar,
      minSidebar,
      dropDown
    },
    computed: {
    ...mapGetters({
        gProgress: 'getProgress',
        gPS: 'getGPS',
        dropDown: 'getDrop'
      })
    },
    methods: {
      scroll() {
        console.log('滚动啦')
      },
      updateLogin(e) {
        if (e.key === 'testIsLogin') {
          if (e.newValue === 'yes') {
            this.$store.dispatch('getUserData')
          }
        }
      }
    },
    watch: {
      'gProgress': {
        handler(val) {
          if (this.gPS) {
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
    mounted() {
      if (typeof window !== 'underfined') {
        on(window, 'storage', this.updateLogin)
        on(window, 'scroll', throttle(this.scroll, 1000, { trailing: false }))
        on(document, 'visibilitychange', easterEgg)
        // window.addEventListener('storage', this.updateLogin)
        // window.addEventListener('scroll', throttle(this.scroll, 1000,{trailing: false}))
        //window.addEventListener('resize', throttle(this.resize, 200))
        //默认应该获取一下用户的头像等基本信息       
      }
    }
  }

</script>
<style>
  @import "~assets/css/index.css";
  @import "~assets/css/article.css";
  @import "~assets/css/atom-onelight.css";
  @import "~assets/css/nprogress.css";
</style>
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 1s ease;
  }
  
  .fade-enter,
  .fade-leave-active {
    transform: translateY(-20px);
  }
</style>