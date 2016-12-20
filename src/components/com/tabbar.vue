<template>
         <ul class="my-tabs">
        <router-link class="tab" tag="li" to="/about/author"><a>author</a></router-link>
        <router-link class="tab" tag="li" to="/about/resume"><a>resume</a></router-link>
        <!--可以动态绑定路由-->
    </ul>
</template>
<style scoped>
     .my-tabs {
         position: fixed;
         top: 64px;
         width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        background-color: #0f9d58;
    }
    
    li {
        list-style: none;
        margin-left: 20px;
    }
</style>