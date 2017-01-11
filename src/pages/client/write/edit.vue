<template>
    <div class="wrap">
        <e-tag :tags="tags" :allTags="allTags" :id="draft.objectId" @addTag="addTag" @removeTag="removeTag" />
        <div class="title"><input class="tag-input" :value="draft.title" @input="titling">标题</div>
        <!--<div data-loader="arrow-circle"></div>-->
        <i class="material-icons icon">cached</i>

        <div class="edit">
            <div class="inputer">
                <textarea :value="draft.content" @input="contenting"></textarea>
                <!--<textarea  v-model.lazy="draft.content"></textarea>-->
            </div>
            <div class="preview" v-html="mark"></div>
        </div>
        <div class="float" @click="publish">
            <i class="material-icons">publish</i>
        </div>
    </div>
</template>
<script>

    import eTag from '~components/eTag'
    import { markdown } from '~src/filters'
    import {mapGetters} from 'vuex'
    import debounce from 'lodash/debounce'
    import api from '~src/api'
    export default {
        //编辑这一块暂时先不弄preFetch呢，
        name: 'edit',
        components: {
             eTag
        },
        data () {
            return {
                 draft: {
                    title: 'new title',
                    content: 'new content',
                    objectId: ''
                },
                tags: [],
                allTags: [] 
            }
        },
         computed:{
             ...mapGetters({
                 user: 'getUserInfo'
             }),
             mark () {
                 return markdown(this.draft.content)
                 //箭头函数的this这一块先等会
                 //双冒号语法？
             }
        },
        // watch: {
        //     content : {
        //         handler (newValue, oldValue) {
                    
        //             console.log(oldValue)
        //         }
        //     }
        // },
        methods: {
            addTag (tag) {
                this.tags.push(tag)
            },
            removeTag(index){
                this.tags.splice(index, 1)
            }, 
            titling (e) {
                this.draft.title = e.target.value.trim()
                this.delayTitle('/draft/edit/title', {
                    id: this.draft.objectId,
                    title: this.draft.title
                })
            },
            contenting(e) {
                this.draft.content = e.target.value
                this.delayContent('/draft/edit/content', {
                    id: this.draft.objectId,
                    content: this.draft.content
                })
            },
            async publish() {
                 const tags = this.tags.map(i => JSON.parse(JSON.stringify(i)))
                 const draft = JSON.parse(JSON.stringify(this.draft))
                if (this.$route.name === 'aEdit') {
                    var {data} = await api.post('/draft/edit/publishold', {draft, tags, id: this.$route.params.id})
                    console.log(data)
                } else {    
                    var {data} = await api.post('/draft/edit/publishnew', {draft, tags,user: this.user})
                    console.log(data)
                }
            },
            delayTitle: debounce( async (url, data) => {
                 var {data} = await api.patch(url, data)
                 console.log(data)
                //some other code be here..
                },3000),
                //这两个debounce不能和到一起去，如果和到一起，会触发同一个debounce事件，这样就不对了
                //比如用户刚输入完title紧接着又去输入content，这时title内容就不会被保存
            delayContent: debounce( async (url, data) => {
                 var {data} = await api.patch(url, data)
                 console.log(data)
                //some other code be here..
                },3000),
            async getDraft (url, id) {
                 let {data: {allTags, draft,tags,code, msg}} = await api.get(url, id)
                    this.allTags = allTags
                    if(tags.length !== 0) {
                         this.tags = tags.map(({objectId, name}) => {objectId, name})
                    } else {
                        console.log('没有标签')
                    }                
                    this.draft = draft
                    this.$store.dispatch('gHide')
            }
        },          
        async mounted () {
            const routeName = this.$route.name
            switch (routeName)
            {
                case 'aEdit'://已发布文章草稿
                this.getDraft('/draft',{id:this.$route.params.id})//总感觉这个id应该还能优化
                break
                case 'newDraft'://新草稿
                var {data:{newDraft:{objectId}, allTags}} = await api.post('/draft/new',{draft: this.draft})
                this.draft.objectId = objectId
                this.allTags = allTags
                this.$store.dispatch('gHide')
                break
                case 'oldDraft'://未发布文章草稿
                this.getDraft('/freshdraft',{id:this.$route.params.id})
                break
            }       
        },
        beforeRouteLeave (to, from, next) {
            this.$store.dispatch('gShow')
            next()
        }
    }
</script>
<style scoped>
    .icon {
        color: #666;
    }
    .wrap {
        max-width: 1000px;
        width: 100%;
    }
    .edit {
        box-sizing: border-box;
        height: 100%;
        padding: 10px;
        padding-bottom: 55px;
        display: flex;
        justify-content: center;
        transition: all ease .5s;
    }
    
    .float {
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 40px;
        height: 40px;
        /*line-height: 56px;*/
        /*text-align: center;*/
        border-radius: 50%;
        background-color: #db4437;
        box-shadow: 0 3px 10px rgba(0,0,0,.156863),0 3px 10px rgba(0,0,0,.227451);
    }
</style>
<style scoped lang="less">
    .inputer {
        width: 50%;
        height: 500px;
        margin-right: 10px;
        textarea {
            box-sizing: border-box;
            height: 100%;
            width: 100%;
            vertical-align: top;
            padding: 15px;
            resize: none;
            border: none;
            background-color: #f5f5f5;
            outline: none;
            font-family: inherit;
            font-size: 18px;
            color: #616161;
            box-shadow: 4px 5px 3px #aaa;
            transition: all ease .3s;
        }
    }
    
    .preview {
        box-sizing: border-box;
        height: 500px;
        width: 50%;
        padding: 15px;
        resize: none;
        border: none;
        background-color: #f5f5f5;
        outline: none;
        font-family: inherit;
        font-size: 18px;
        color: #616161;
        box-shadow: 4px 5px 3px #aaa;
        white-space: normal;
        overflow-y: scroll;
        /*不知道他这里为什么要显示滚动条先这么着，等最后再统一处理css的问题*/
        word-wrap: break-word;
    }
</style>