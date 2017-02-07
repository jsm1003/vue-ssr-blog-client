<template>
  <div class="tags">


    <h2>标签列表</h2>
    <div class="tag-wrap">
      <div class="tags-inner">
    <div class="tag" v-for="tag in tags">
        <div>{{ tag.name }}</div>
        <router-link :to="'/t/' + tag.objectId">链接在这里</router-link>
      </div>
      </div>
  
    </div>
  </div>
</template>
<script>
  import api from '~src/api'
  import { mapGetters } from 'vuex'
  const fetchTagsData = async (store) => {
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
<style scopoed>
  .tags {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /*上面一行暂时先加上*/
  }
  
  .tag-wrap {
    border: 1px solid red;
    display: inline-block;
    text-align: left;
    position: relative;
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
      margin: 0 auto;
      padding: 0;
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .tag-wrap {
      padding: 0 12px;
    }
  }
  
  @media only screen and (min-width: 1024px) {
    .tag:nth-child(4n+1){
      margin-left: 0;
    }
  }
  
  @media only screen and (min-width: 1024px) {
    .tag:nth-child(2n+1){
      margin-left: 24px;
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .tag:nth-child(4n+1) {
      margin-left: 0;
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .tag:nth-child(2n+1) {
    margin-left: 24px;
  }
}

  @media only screen and (min-width: 1024px) {
    .tag {
      margin-left: 24px;
      margin-top: 24px;
      max-width: 253px;
      width: calc(25% - 18px);
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .tag {
      margin-left: 24px;
      margin-top: 24px;
      max-width: 253px;
      width: calc(25% - 18px);
    }
  }
  
  .tag:nth-child(2n+1) {
    margin-left: 0;
  }
  
  .tag {
    display: inline-block;
    /*box-sizing: border-box;*/
    border: 1px solid blue;
    position: relative;
    cursor: pointer;
  }
</style>