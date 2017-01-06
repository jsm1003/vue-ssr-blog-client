<template>
  <div id="tag-wrap">
    <h2>标签列表</h2>
    <div class="tag" v-for="tag in tags">
      <div>{{ tag.name }}</div>
      <router-link :to="'/t/' + tag.objectId">链接在这里</router-link>
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
  #tag-wrap {
    border: 1px solid red;
  }
  .tag {
    display: inline-block;
    /*box-sizing: border-box;*/
    border: 1px solid blue;
    position: relative;
    cursor: pointer;
  }

@media only screen and (min-width: 440px){
  #tag-wrap {
    width: calc((100% + 210px) - 2*16px);
    padding: 0 16px;
  }
  .tag {
    /*margin-left: 16px;*/
    margin-left: 0;
    margin-top: 16px;
    max-width: 257px;
    width: 220px;
    width: calc(50% - 8px);
  }
}
@media only screen and (min-width: 1070px){
  #tag-wrap {
    width: calc((100% + 210px)*8/10 - 24px);
    padding: 0 12px;
  } 
  /*.tag:nth-child(4n+1) {
    margin-left: 0;
  }*/
  .tag{
    margin-left: 24px;
    margin-top: 24px;
    max-width: 253px;
    width: calc(25% - 18px);
  }
}
      @media only screen and (min-width: 1280px){
  #tag-wrap {
    width: calc((100% + 210px)*2/3 - 24px);
    }
}
</style>