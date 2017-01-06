<template>
  <div class="myposts">
    <div class="item" v-for="item in topic.list">
      <h2 class="item-title">
        <router-link :to="'/a/' + item.objectId ">{{ item.title }}</router-link>
      </h2>
      <div class="item-people">
        <div class="answer-meta">
          <div class="author-info">
            <img class="author-img" src="../assets/img/auth.jpg"></img>
            <div class="author-content">
              <div class="author-name">{{ item.authname }}</div>
              <div class="author-badge">前端开发</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-content">
        <span class="RichText" v-text="cutStr(item.content)"></span>
        <router-link class="readmore" :to="'/a/' + item.objectId ">阅读全文</router-link>
      </div>
    </div>
    <div class="more-item">
      <a v-if="topic.haveNext" @click="loadMore" href="javascript:;">more</a>
      <span v-else>Looks like you've reached the end</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'item-list',
    props: ['topic'],
    methods: {
      loadMore() {
        this.$emit('needMore')
      },
      cutStr(content) {
        return content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
        //先替换后截取比较好一些 还是有一些缺陷，转义字符不能够转换
        //临时办法，后续会修改
        //更多方法http://www.cnblogs.com/snandy/p/3200433.html
      }
    }
  }
</script>
<style scoped>
  .myposts {
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    
    /*animation: slideContent .3s cubic-bezier(0.0,0.0,0.2,1);*/
    /*初次加载向上滑动特效*/
  }
  .item {
    display: inline-block;
    box-sizing: border-box;
    text-align: left;
    max-width: 730px;
    width: 100%;
    padding: 20px 24px;
    border-radius: 2px;
    /*box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12),0px 2px 2px 0px rgba(0,0,0,0.24);*/
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
    margin-top: 10px;
    background-color: #ffffff;
  }
  .item-title {
    font-size: 20px;
    font-weight: 400;
    line-height: 1.6;
    color: #333;
  }
  .item-title a {
    color: inherit;
  }
  .item-people {
    margin-top: 2px;
    font-size: 15px;
    line-height: 1.6;
    color: #555;
  }
  .answer-meta {
    margin-top: 10px;
  }
  .author-img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
  .author-info {
    margin-bottom: 12px;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .author-name {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.1;
  }
  .author-badge {
    margin-top: 6px;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-content {
    overflow: hidden;
    font-size: 15px;
    line-height: 27px;
  }
  .RichText {
    color: #404040;
  }
  .readmore {
    color: #8590a6;
  }
  .more-item {
    width: 100%;
    font-size: 14px;
    color: #9e9e9e;
  }
  
  /*果然是，后写的会把先写的顶替掉*/
  @media only screen and (min-width: 440px) {
    .myposts {
      width: calc((100% + 210px) - 2*16px);
      /*max-width: 800px;*/
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .myposts {
      width: calc((100% + 210px)*8/10 - 24px);
    }
  }
  
  @media only screen and (min-width: 1280px) {
    .myposts {
      width: calc((100% + 210px)*2/3 - 24px);
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .nWGHWc .t1KkGe {
      max-width: 1084px;
      width: calc(80% - 24px);
    }
  }
  
  @media only screen and (min-width: 1280px) {
    .nWGHWc .t1KkGe {
      max-width: 1084px;
      width: calc(66.66% - 24px);
    }
  }
</style>