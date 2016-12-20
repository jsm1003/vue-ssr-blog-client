<template>
  <item-list :topic="topic" @needMore="loadMore"></item-list>
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
    //现在就看这里的this管不管用了
  }
  export default {
    name: 'articles',//如果有更新，给他一个按钮，他会自动更新一遍数据
    components: {
      itemList
    },
    computed: {
      ...mapGetters({
        topic: 'getTopics'
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