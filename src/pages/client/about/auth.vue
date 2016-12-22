<template>
  <div>
    <h2>作者信息</h2>
    <div>my name is Josephine</div>
    <router-link :to="{name: 'ar'}">作者简历</router-link>
  </div>
</template>
<script>
  export default {
    name: 'auth'
  }
</script>