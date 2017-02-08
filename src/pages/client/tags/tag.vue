<template>
    <item-list :topic="topics" @needMore="loadMore"></item-list>
</template>
<script>
  import itemList from '~components/item-list'
  import { mapGetters } from 'vuex'
  const fetchListData = (store, config = { page: 1 }) => {
    const base = {
      limit: 10,
      id: store.state.route.params.id,
      ...config
    }
  return store.dispatch('receiveTopics', base)
  }
  export default {
    name: 'tag',
    components: { itemList },
    computed: {
      ...mapGetters({
        topics: 'getTopicInTag'
      })
    },
    preFetch: fetchListData,
    methods: {
      loadMore(page = this.topics.page + 1) {
        fetchListData(this.$store, { page })
      }
    },
     mounted() {
       fetchListData(this.$store)
    }
  }

</script>