<template>
  <div class="linshi">
    <item-list :topic="topic" @needMore="loadMore"></item-list>
    <router-link v-if="logState" class="float" :to="{name: 'newDraft'}" title="撰写新文章">
      <i class="material-icons edit">mode_edit</i>
    </router-link>
  </div>
</template>
<script>
  import itemList from 'components/item-list'
  import { mapGetters } from 'vuex'
  const fetchListData = (store, config = { page: 1 }) => {
    const base = {
      ...config,
      limit: 10,
    }
  return store.dispatch('receiveTopics', base)
  }
  export default {
    name: 'articles',//如果有更新，给他一个按钮，他会自动更新一遍数据
    components: {
      itemList
    },
    computed: {
      ...mapGetters({
        topic: 'getTopics',
        logState: 'getLogState'
      })
    },
    preFetch: fetchListData,//终于明白prefetch的作用了！
    methods: {
      loadMore(page = this.topic.page + 1) {
        fetchListData(this.$store, { page })
      }
    },
    mounted() {
      //先不考虑list数 < 0 的情况
      fetchListData(this.$store)
    }
  }
</script>
<style scoped>
  .linshi {
    width: 100%;
    text-align: center;
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
</style>