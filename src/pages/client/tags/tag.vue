<template>
  <div>
    <item-list :topic="topic" @needMore="loadMore"></item-list>
  </div>
</template>
<script>
  import itemList from '~components/item-list'
  import { mapGetters } from 'vuex'
  const fetchListData = (store, config = { page: 1 }) => {
    const base = {
      ...config,
    limit: 10,
      id: store.state.route.params.id
    }
  return store.dispatch('receiveTopics', base)
  }
  export default {
    name: 'tag',
    components: {
      itemList
    },
    computed: {
      ...mapGetters({
        topic: 'topicInTag'
      })
    },
    preFetch: fetchListData,
    methods: {
      loadMore(page = this.topic.page + 1) {
        fetchListData(this.$store, { page })
      }
    },
    mounted() {
      fetchListData(this.$store)
    }
  }
</script>