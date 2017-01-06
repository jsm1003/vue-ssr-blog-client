<template>
  <div>
    <h2>作者信息</h2>
    <div>my name is Josephine</div>
    <!--<v-pagination :length="length" v-model="page"></v-pagination>-->
    <router-link :to="{name: 'ar'}">作者简历</router-link>
  </div>
</template>
<script>
  export default {
    name: 'auth',
    data () {
      return {
        length: 5,
        page: 1
      }
    }
  }
</script>