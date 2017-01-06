<template>
    <div v-clickoutside v-if= "dropDown.show" class="list" :style="dropDown.position">
        <content v-for="item in dropDown.data" @click="itemclick(item)">
            <div class="inner">{{ item }}</div>
        </content>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'drop',
        computed: {
            ...mapGetters({
                dropDown: 'getDrop'
            })
        },
        methods: {
            itemclick(item) {
                this.$store.commit('UPDATE_DROP_ITEM',{
                    id: this.dropDown.id,
                    item: item
                })
            }
        }
    }
</script>
<style scoped>
        .list {
        background-color: #ffffff;
        width: 192px;
        height: auto;
        min-width: 192px;
        padding: 16px 0;
        position: absolute;
        box-shadow:  0 3px 10px rgba(0,0,0,.156863),0 3px 10px rgba(0,0,0,.227451);
        z-index: 1000;
    }
    /*.live {
        transition: left .2s cubic-bezier(0.0,0.0,0.2,1),max-width .2s cubic-bezier(0.0,0.0,0.2,1),max-height .2s cubic-bezier(0.0,0.0,0.2,1),opacity .05s linear,top .2s cubic-bezier(0.0,0.0,0.2,1);
    }*/
    content {
        display: flex;
        /*上面这两行可能会删除掉*/
        text-align: left;
        color: #222;
        cursor: pointer;
        display: block;
        outline: none;
        overflow: hidden;
        padding: 0 24px;
        position: relative;
    }
    content:hover {
        background-color: #EEEEEE;
    }
    content .inner {
        display: flex;
        font-size: 14px;
        font-weight: 400;
        line-height: 40px;
        height: 40px;
    }
</style>