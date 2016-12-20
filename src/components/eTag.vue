<template>
    <div>
        <div>从已有标签选择</div>
        <div class="allTag point" v-for="tag in allTags" @click="addInTags(tag)">{{ tag.name }}</div>
        <div class="chips focus">
            <div class="allTag" v-for="(tag, index) in tags">
                <!--他这里在刷新时老闪烁，看来用成dispatch比较好？-->
                <!--不用dispatch，将来加个css效果就可以-->
                {{tag.name}}
                <i class="material-icons close" @click="removeTag(tag, index)">close</i>
            </div>
            <input class="tag-input" v-model.trim="currentTag" @keyup.enter="tagEnter">
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import api from 'src/api'
    export default {
        //tag编辑这一块先不弄debounce呢
        //需不需要name属性呢？
        name: 'eTag',
        props:['tags', 'id', 'allTags'],
        data () {
            return {
                //allTags: [],//所有tags列表
                currentTag: ''
            }
        },
         computed: {
           haveInAllTags () {
               return this.allTags.some(i => {
                     return (i.name === this.currentTag)
            })
           },
           haveInTags () {
               return this.tags.some(i => {
                     return (i.name === this.currentTag)
                 })
           }
        },
        methods: {
              async tagEnter () {
                 if (this.haveInTags) {
                     console.log('已经添加了')
                 } else if (this.haveInAllTags) {
                     //console.log(this.allTags)
                     var tag = this.allTags.find(i => {
                         return i.name === this.currentTag
                     })
                     this.$emit('addTag', tag)
                     //console.log(tag)
                     await api.patch('/draft/edit/oldtag',{tag, id:this.id})
                     console.log('添加旧标签')
                 } else {
                     var {data:{newTag:{name, objectId}}} = await api.patch('/draft/edit/newtag',{tag:this.currentTag,id:this.id})
                     this.$emit('addTag',{name,objectId})
                     this.allTags.push({name,objectId})
                     console.log('添加新标签')
                 }
                 this.currentTag = ''
                //  this.$store.dispatch('addNewTag', {dId:this.dId, tag: e.target.value.trim()})
                //  e.target.value = ''
                //  console.log('云端添加成功')                 
           },
           async removeTag(tag,index) {
               this.$emit('removeTag', index)
               var {data:{remove}} = await api.delete('/draft/edit/removetag', {tag, id: this.id})             
               if (remove) {
                   var dTag = this.allTags.find(i => {
                       return i.objectId === tag.objectId
                   })
                   this.allTags.splice(this.allTags.indexOf(dTag),1)
               } 
               console.log('标签删除成功')  
           },
           async addInTags (tag){
               var have = this.tags.some(i => {
                   return (i.name === tag.name)
               })
               if (have) {
                   console.log('重复了')
                   return
               } else {
                   this.$emit('addTag', tag)
                   var {data} = await api.patch('/draft/edit/oldtag', {tag, id: this.id})
                   //this.$store.dispatch('addOldTag', tag)
                   console.log(data)
               }
               //if(this.deepCopy(this.tags).includes(this.deepCopy(this.tags)[index])) {
                //由此可见，虽然对象的内容一样，但是不是同一个对象，所以includes方法行不通
            //    console.log(tag)
           }
        }
       //async mounted () {
           //这里有个并发请求(和edit.vue)
           //以后再想想怎么弄
           //如果合并成一个请求，那应该是后端在弄一下
        //    var {data:{tags, code, msg}} = await api.get('/tags')
        //    this.allTags = tags.map(({name, objectId}) => {
        //        return {name, objectId}
        //    })
       // }
    }
</script>
<style>
    .allTag {
        display: inline-block;
        height: 32px;
        font-size: 13px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
        line-height: 32px;
        padding: 0 12px;
        border-radius: 16px;
        background-color: #e4e4e4;
        margin-bottom: 5px;
        margin-right: 5px;
    }
    
    .point {
        cursor: pointer;
    }
    
    .close {
        cursor: pointer;
        float: right;
        font-size: 16px;
        line-height: 32px;
        padding-left: 8px;
    }
    
    .tag-input {
        background: none;
        border: 0;
        color: rgba(0, 0, 0, 0.6);
        display: inline-block;
        font-size: 1rem;
        height: 3rem;
        line-height: 32px;
        outline: 0;
        margin: 0;
        padding: 0;
        width: 120px;
    }
    
    .chips {
        border: none;
        border-bottom: 1px solid #9e9e9e;
        box-shadow: none;
        margin: 0 0 20px 0;
        min-height: 45px;
        outline: none;
        transition: all .3s;
    }
    
    .focus {
        border-bottom: 1px solid #26a69a;
        box-shadow: 0 1px 0 0 #26a69a;
    }
</style>