<template>
  <div>
    <div class="home">
      <div class="home_fixed">
        <div class="taglist df dfaic">
          <ul class="navlist df dfaic df1">
            <li>
              <span class="active">推荐</span>
            </li>
            <li>
              <span>关注</span>
            </li>
          </ul>
          <span
            class="tagmanager"
            @click="routerPath('/tagManage')"
          >标签管理</span>
        </div>
      </div>
    </div>

    <!-- 正文 -->
    <div class="container df dfjbw">
      <div class="left df1">
        <div class="navs df">
          <li><span class="active">热门</span></li>
          <li><span>最新</span></li>
          <li><span>热榜</span></li>
        </div>
        <div class="article_list">
          <div 
            class="article df dfdir" 
            v-for="article in articleList"
            :key="article.articleId"
            @click="routerPath(`/article/${article.articleId}`)"
          >
            <p class="f_info">
              <span class="name">{{article.username}}</span>
              <span class="tag">{{article.tagTitle}}</span>
              <span class="time">{{formatTimer(article.createTime)}}</span>
            </p>
            <h4 class="title">{{article.title}}</h4>
            <div class="case df">
              <p 
                :class="article.isLike ? 'is-like df dfc':'df dfc'"
                @click="handleLike(article)" 
               >
                <span class="iconfont">&#xe60c;</span>
                <span class="nums">{{article.likeNums}}</span>
              </p>
              <p class="df dfc">
                <span class="iconfont">&#xe6cb;</span>
                <span class="nums">{{article.commentNums}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="billing df dfc">广告位</div>
        <div class="billing df dfc">广告位</div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import {responseStatus} from '@/config' 
import axios from '@/utils/fetch'
import { mapState } from 'vuex'
import NullBox from '@/components/NullBox'
export default {
  name: "Home",
  data() {
    return {
      articleList: [],
      loading: false,
      isLock: false,
      pageNum: 1, // 当前页数
      pageSize: 20, // 每页显示条目个数
    };
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.bindScroll, false);    //取消绑定滚动事件
  },
  created(){
    this.findArticleList()
  },
  mounted() {
    document.addEventListener("scroll", this.bindScroll, false);    //绑定滚动事件
  },
  computed: {
      ...mapState(['userInfo'])
  },
  methods: {
    formatTimer(timer){
        return  moment(timer).format('YYYY/MM/DD hh:mm')
    },
    routerPath(path, query) {
      this.$router.push({ path, query });
    },
    bindScroll(){
        //真实内容的高度
        var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);
        //视窗的高度
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        //隐藏的高度
        var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if(this.loading || this.isLock){
            return;
        }
        if(pageHeight - viewportHeight - scrollHeight < 10){
            this.pageNum++
            this.findArticleList()
        }
    },
    findArticleList(){
        const {pageNum, pageSize} = this
        this.loading = true
        axios.post('/api/findArticleList', {
            pageNum,
            pageSize
        }).then(res => {
            const {status} = res.data
            if(status === responseStatus){
                this.loading = false
                if(!res.data.data.length){
                    this.isLock = true
                }
                this.articleList = [...this.articleList, ...res.data.data]
            }
        }).catch(err => {
            console.log('查找个人关注接口出现问题：' + err)
        })
    },
    // 点击关注的函数
    handleLike(article){
        const {userId} = this.userInfo
        const {articleId} = article
        if(!article.isLike){
            axios.post('/api/addLike', {
                userId,
                articleId
            }).then(res => {
                const {status} = res.data
                if(status === responseStatus){
                    this.$message({
                        type: 'success',
                        message: '点赞成功'
                    })
                    this.articleList = this.articleList.map(item => {
                        if(item.articleId === articleId){
                            const likeNums = item.likeNums + 1
                            return {...item, isLike: true, likeNums}
                        }
                        return item
                    })
                }
            }).catch(err => {
                console.log('点赞接口出现问题：' + err)
            })
        }else{
            axios.post('/api/cancelLike', {
                userId,
                articleId
            }).then(res => {
                const {status} = res.data
                if(status === responseStatus){
                    this.$message({
                        type: 'success',
                        message: '取消点赞成功'
                    })
                    this.articleList = this.articleList.map(item => {
                        if(item.articleId === articleId){
                            const likeNums = item.likeNums - 1
                            return {...item, isLike: false, likeNums}
                        }
                        return item
                    })
                }
            }).catch(err => {
                console.log('取消点赞接口出现问题：' + err)
            })
        }
        
    },
  },
};
</script>

<style lang="less" scoped>
@active: #007fff;

.home {
  height: 3.833rem;
  margin-bottom: 2rem;
  .home_fixed {
    position: fixed;
    left: 0;
    top: 5rem;
    z-index: 4;
    width: 100%;
    height: 3.833rem;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    color: #909090;
    .taglist {
      max-width: 960px;
      height: 100%;
      margin: auto;
      .navlist {
        height: 100%;
        margin-left: -1rem;
        li {
          padding: 0 1rem;
          span {
            font-size: 1.16rem;
            color: #71777c;
            cursor: pointer;
          }
          .active {
            color: @active;
          }
        }
      }
      .tagmanager {
        font-size: 1.16rem;
        color: #71777c;
        cursor: pointer;
        &:hover {
          color: @active;
        }
      }
    }
  }
}
.container {
  max-width: 960px;
  margin: auto;
  .left {
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-raiuds: 3px;
    .navs {
      padding: 1.3rem 1rem;
      border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
      li {
        font-size: 1.17rem;
        padding: 0 1.2rem;
        border-right: 1px solid hsla(0, 0%, 59.2%, 0.2);
        span {
          color: #909090;
          cursor: pointer;
        }
        .active {
          color: @active;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
    .article_list {
      .article {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid rgba(178,186,194,.15);
        cursor: pointer;
        .f_info {
          font-size: 1rem;
          color: #b2bac2;
          span {
            position: relative;
            &:after {
              content: " · ";
            }
            &:last-child:after {
              content: "";
            }
          }
        }
        .title {
          font-size: 1.4rem;
          font-weight: 600;
          // color: #909090;
          color: #2e3135;
          margin: 0.5rem 0 1rem;
        }
        .case {
          border-left: 1px solid #edeeef;
          p {
            height: 2rem;
            font-size: 1.083rem;
            color: #b2bac2;
            // color: #6cbd45;
            vertical-align: middle;
            padding: 0 0.8rem;
            border: 1px solid #edeeef;
            border-left: none;
            cursor: pointer;
            .nums {
              margin-left: 3px;
              vertical-align: middle;
              line-height: 1;
              display: inline-block;
            }
            &.is-like{
                color: #6cbd45;
            }
          }
        }
        &:last-child{
            border: none;
        }
      }
    }
  }
  .right {
    flex-basis: 20rem;
    margin-left: 2rem;
    .billing {
      width: 100%;
      height: 200px;
      background: #999;
      font-size: 2rem;
      color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      margin-bottom: 1.3rem;
    }
  }
}

@media screen and (max-width: 960px) {
  .taglist {
    padding: 0 2rem;
  }
  .tagmanager {
    display: none;
  }
  .right {
    display: none;
  }
}
</style>
