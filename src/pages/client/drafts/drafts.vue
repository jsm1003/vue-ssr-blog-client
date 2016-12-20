<template>
    <div class="myposts">
    <div class="item" v-for="item in list">
      <h2 class="item-title">
        <router-link :to="'/aaa/a/' + item.objectId ">{{ item.title }}</router-link>
        </h2>
      <div class="item-people">
        <div class="answer-meta">
          <div class="author-info">
            <img class="author-img" src="assets/img/auth.png"></img>
            <div class="author-content">
              <div class="author-name">萌新</div>
              <div class="author-badge">前端开发</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-content">
        <span class="RichText">{{ item.content }}一大堆blabla一大堆blabla一大堆blabla一大堆blabla一大堆blabla一大堆blabla一大堆blabla</span>
         <router-link class="readmore" :to="'/aaa/w/' + item.objectId ">...编辑</router-link>
      </div>
    </div>
     <div class="more-item">
      <a v-if="haveNext" @click="loadMore()" href="javascript:;">more</a>
      <span v-else>all above</span>
    </div>
  </div>
</template>
<script>
import api from 'src/api'
    export default {
      //这里不应该做缓存
      //因为是httponly所以客户端并不能访问到这个cookie，只能通过推出后给出一个vuex状态，然后根据这个状态来动态设置cookie
      //不过好像设置一个beforegard就可以了，推出之后无法访问这一页，（而这一项的判断方式貌似是有没有这两个cookie）
      name:'draft',
        data () {
            return {
                list: [],
                haveNext: false,
                page:1
            }
        },
        methods: {
            async fetchInitialData (config = {page:this.page}) {
                const base = {
                    ...config,
                    limit:10
                }
                var {data:{drafts,code, msg}} = await api.get('/drafts',base)
                    var {list, haveNext} = {
                        list: drafts[1].map(({objectId, title, content}) => {
                        return {objectId,title,content}
                        }),
                        haveNext: drafts[0] > base.page * base.limit
                    }
                    if (this.page === 1) {
                        this.list = [].concat(list)
                    } else {
                        this.list = this.list.concat(list)
                    }
                    this.haveNext = haveNext

            },
            loadMore () {
                this.page ++ //这里用++比较好？
                this.fetchInitialData()
            }
        },
         mounted () {
             this.fetchInitialData()
            //var {data} = await api.get('/drafts', )
        }
    }
</script>
<style scoped> 
  .myposts {
    display: inline-block;
    box-sizing: border-box;
    text-align: left;
  }
  .item {
    padding: 20px 24px;
  }
  .item-title {
    font-size: 20px;
    font-weight: 400;
    line-height: 1.6;
    color: #333;
  }
  .item-people {
    margin-top: 2px;
    font-size: 15px;
    line-height: 1.6;
    color: #555;
  }
  .answer-meta {
    margin-top: 10px;
  }
  .author-img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
  .author-info {
    margin-bottom: 12px;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .author-name {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.1;
  }
  .author-badge {
    margin-top: 6px;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-content {
    overflow: hidden;
    font-size: 15px;
    line-height: 27px;
  }
  .RichText {
    color: #404040;
  }
  .readmore {
    color: #8590a6;
  }
  .more-item {
    width: 100%;
    font-size: 20px;
    color: #0f88eb;
  }
  
  /*果然是，后写的会把先写的顶替掉*/
  @media only screen and (min-width: 440px) {
    .myposts {
      width: calc((100% + 210px) - 2*16px);
      /*max-width: 800px;*/
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .myposts {
      width: calc((100% + 210px)*8/10 - 24px);
    }
  }
  
  @media only screen and (min-width: 1280px) {
    .myposts {
      width: calc((100% + 210px)*2/3 - 24px);
    }
  }
  
  @media only screen and (min-width: 1070px) {
    .nWGHWc .t1KkGe {
      max-width: 1084px;
      width: calc(80% - 24px);
    }
  }
  
  @media only screen and (min-width: 1280px) {
    .nWGHWc .t1KkGe {
      max-width: 1084px;
      width: calc(66.66% - 24px);
    }
  }
</style>