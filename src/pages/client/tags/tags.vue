<template>
  <div class="tag-wrap">
    <h2 class="tags-inner">标签列表</h2>
    <div class="tags-inner">
      <div class="tag" v-for="tag in tags">
        <router-link class="item" :to="'/t/' + tag.objectId">
          <div class="img-wrap">
            <img class="tag-img" src="http://oaxfgzulv.bkt.clouddn.com/cat.jpg" alt="tag">
          </div>
          <div class="tag-info">
            <div class="tag-name">{{tag.name}}</div>
            <div class="tag-count">几篇文章</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  const fetchTagsData = (store) => {
    return store.dispatch('getAllTags')
  }
  export default {
    name: 'tags',
    preFetch: fetchTagsData,
    computed: {
        ...mapGetters({
        tags: 'getAllTags'
      })
    },
    mounted() {
      fetchTagsData(this.$store)
    }
  }

</script>
<style scoped>
div{
  box-sizing: border-box;
}
  .tag-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  
  .tags-inner {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 530px;
    width: 100%;
  }
  .item {
    background-color: #ffffff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
  }
  .tag-info {
    position: absolute;
    height: 50px;
    bottom: 16px;
    left: 16px;
    right: 16px;
  }
  .tag-name {
    /*text-align: center;*/
    color: rgba(0,0,0,.87);
    font-size: 16px;
    line-height: 20px;
    max-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
  .tag-count {
    font-size: 12px;
    color: rgba(0,0,0,.54);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  @media (min-width: 440px) {
    .tag-wrap {
      width: 95%;
    }
  }
  
  @media (min-width: 500px) {
    .tag-wrap {
      width: 92%;
    }
  }
  
  @media (min-width: 650px) {
    .tag-wrap {
      width: 85%;
    }
  }
  
  @media (min-width: 440px) {
    .tag-wrap {
      margin: 20px auto 0;
      padding: 0;
    }
    .tags-inner {
      width: 100%;
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .tag-wrap {
      padding: 0 12px;
    }
  }
  
  .tag {
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: calc(50% - 2px);
  }
.tag::after {
    content: '';
    display: block;
    padding-top: calc(50% + 90px);
    /*自适应高度小技巧*/
}
.img-wrap {
  padding-top: 56.25%;
  position: relative;
}
.tag-img {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}
  @media only screen and (min-width: 440px) {
    .tag {
      margin-top: 16px;
      max-width: 257px;
      width: calc(50% - 8px);
    }
    .item {
      border-radius: 2px;
    }
  }

  @media only screen and (min-width: 1024px) {
    .tag {
      margin-top: 24px;
      max-width: 253px;
      width: calc(25% - 18px);
    }
    .tags-inner {
      max-width: 1084px;
    }
  }

</style>