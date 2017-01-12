<template>
  <div class="mycontent" :class="{oop: transitionEnd}">
      <transition name="fade" mode="out-in">
        <!--这里也可以动态绑定-->
        <keep-alive include="tags,articles,resume">
          <router-view></router-view>
          <!--貌似这里的route-view可以动态绑定class，先单独出来看看效果-->
        </keep-alive>
      </transition>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { on, off, getTransitionEndEvent } from '~src/utils'
  export default {
    data() {
      return {
        transitionEnd: true
      }
    },
    computed: {
            ...mapGetters({
        sidebar: 'getSidebar'
      })
    },
    methods: {
      moveStyle(e) {
        let node = e.target
        if(node !== this.$el) return//防止其他动画效果影响
        this.transitionEnd = !this.transitionEnd
        node.removeAttribute('style')
        this.$store.commit('SIDE_RUN', false)
        off(this.$el, getTransitionEndEvent(), this.moveStyle)
      },
      handleSide(val) {
         on(this.$el, getTransitionEndEvent(), this.moveStyle)
        if (val && this.sidebar.size) {
          this.$el.setAttribute('style', 'transition: transform .3s cubic-bezier(0.0,0.0,0.2,1);transform: translateX(105px);')
        } 
        if(!val && this.sidebar.size) {
          this.$el.setAttribute('style', 'transition: transform .3s ease-in-out;transform: translateX(-105px);')
        }
      }
    },
    mounted() {
      this.$watch(() => (
        this.sidebar.side
      ), this.handleSide)
    }
  }
</script>
<style scoped>
  .mycontent {
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    /*整体使用flex布局*/
    margin-top: 64px;
    box-sizing: border-box;
    /*will-change: margin;*/
    /*transition: margin .3s cubic-bezier(0.0,0.0,0.5,1);*/
  }

  /*.big {
    margin-left: 0;
  }
  .bighandle {
    transition: margin .3s cubic-bezier(0.0,0.0,0.5,1);
    margin-left: 0;
  }*/
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

  @media only screen and (min-width: 440px) {
    .mycontent {
      padding: 0 16px;
    }
  }
    @media only screen and (min-width: 750px) {
    .oop {
      margin-left: 210px;
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