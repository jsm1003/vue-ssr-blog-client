<template>
  <div class="mycontent" :class="{big: !handleSide}">
    <transition name="fade" mode="out-in">
      <!--这里也可以动态绑定-->
      <keep-alive include="tags,articles">
        <!--2.1的新特性-->
        <router-view></router-view>
        <!--貌似这里的route-view可以动态绑定class，先单独出来看看效果-->
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
            ...mapGetters({
        handleSide: 'getHSide'
      }),
    }
  }
</script>
<style scoped>
  .mycontent {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 64px;
    margin-left: 210px;
    box-sizing: border-box;
    will-change: margin;
    transition: margin .3s cubic-bezier(0.0,0.0,0.5,1);
  }
  .big {
    margin-left: 0
  }
  /*.mymain {
    margin: 0 auto;
    max-width: 800px;
    padding: 0 12px;
    border: 1px solid red;
    text-align: center;
  }*/

  
  .fade-enter-active,
  .fade-leave-active {
    transition: all .3s ease;
  }
  
  .fade-enter {
    opacity: 1;
  }
  
  .fade-leave-active {
    opacity: 0;
  }
  @media only screen and (max-width: 750px) {
    .mycontent {
      margin-left: 0;
    }
  }
  @media only screen and (min-width: 440px) {
    .mycontent {
      padding: 0 16px;
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .mycontent {
      padding: 0 12px;
    }
  }
  /*  
下面这是home里面单个div的自适应
  @media only screen and (min-width: 1280px) {
    .nWGHWc.k7iNHb .jxKp7 {
      width: calc(((100% + 210px - 24px)*4/12) - 24px);
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .nWGHWc.k7iNHb .jxKp7 {
      width: calc(((100% + 210px - 24px)*4/10) - 24px);
    }
  }
  
  @media only screen and (min-width: 440px) {
    .nWGHWc.k7iNHb .jxKp7 {
      width: calc((100% + 210px) - 2*16px);
    }
  }
  
  @media only screen and (min-width: 1280px) {
    .nWGHWc .jxKp7 {
      width: calc(((100% - 24px)*4/12) - 24px);
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .nWGHWc .jxKp7 {
      width: calc(((100% - 24px)*4/10) - 24px);
    }
  }
  
  @media only screen and (min-width: 440px) {
    .UHqyCd .jxKp7,
    .nWGHWc .jxKp7 {
      width: calc(100% - 2*16px);
    }
  }*/
</style>