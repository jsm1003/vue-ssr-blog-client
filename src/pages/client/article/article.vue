<template>
  <div class="wraper">
    <h1 class="title">{{ article.title }}</h1>
    <div class="entry-meta left">
      <img class="auth-img" src="../../../assets/img/auth.png">
      <!--为什么图片资源不跟着过来了呢？-->
      <span class="auth-name">{{ article.authname }}</span>
      <span class="bull">·</span>
      <time class="time">3个月前</time>
    </div>
    <section class="article" v-html="article.content"></section>
      <router-link class="float" :to="{name: 'newDraft'}">
        <i class="material-icons edit">mode_edit</i>
      </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const fetchArticleData = (store) => {
  return store.dispatch('getArticle',{ //原来这里必须有一个return才行
    id: store.state.route.params.id
  })
}
export default {
  name:'article',//这里写一个名字他才不包括，要不然他是默认把没名字的包括在内的
  computed: {
    ...mapGetters({
      article: 'getArticle',
    })
  },
  preFetch: fetchArticleData,
  beforeMount () {
    //再发起请求之前可以先加载loading画面，然后就不需要beforeDestroy这个钩子了
     fetchArticleData(this.$store)
  },
  // beforeDestroy () {
  //   //符合逻辑了，
  //   //如果销毁vuex的状态，会在数据请求到之前仍然显示之前的数据,我先这么认为,这样是可以的只是加了标题
  //   //但是我感觉这里用css比较好 G+用的是css
  //   this.$store.dispatch('clearArticle')
  // },
  // watch: {
  //   '$route' () {
  //    // console.log('route改变')
  //     //fetchArticleData(this.$store)
  //     }
      //这里的watch是做上一篇下一篇的时候用到
      //但是他切换父级route的时候也改变，就不对了
    
 // }
}
</script>
<style scoped>
  .wraper {
    box-sizing: border-box;
    max-width: 800px;
    width: 100%;
    background-color: #ffffff;
    padding: 15px 25px;
    border-radius: 2px;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12),0px 2px 2px 0px rgba(0,0,0,0.24);
  }
  .title {
    text-align: center;
    font-size: 32px;
    line-height: 45px;
    font-weight: 700;
    color: #333;
    text-decoration: none;
    font-family: -apple-system,"Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  }
  
  .entry-meta {
    margin: 22px 0 0;
    height: 36px;
    line-height: 36px;
  }
  
  .left {
    text-align: left;
  }
  
  .auth-img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
  
  .auth-name {
    font-size: 15px;
    font-weight: 600;
    /*line-height: 1.1;*/
  }
  
  .bull {
    margin: 0 3px;
  }
  
  section {
    margin: 30px 0;
    line-height: 1.7;
    font-weight: 400;
  }
  


  
  .float {
    position: fixed;
    bottom: 32px;
    right: 32px;
    width: 56px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    border-radius: 50%;
    background-color: #db4437;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
  
  .edit {
    color: white;
    padding-top: 15px;
    /*这里不应该有padding的*/
  }
  
  .red {
    background-color: red;
  }
</style>