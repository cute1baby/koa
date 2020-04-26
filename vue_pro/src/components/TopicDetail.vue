<template>
  <div class="topicDetail df dfdir">
      <mt-header fixed title="话题详情" class="header">
        <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="top">
          <h3 class="title">{{topic.title}}</h3>
          <p class="supply" v-html="topic.content"></p>
          
      </div>
      <div class="reply">
          <div v-for="r in topic.replies" :key="r.id" class="replyCon df dfc">
              <div class="slide df1 df dfdir">
                <p class="userinfo df dfaic">
                    <img :src="r.author.avatar_url" alt="">
                    <span class="name">{{r.author.loginname}}</span>
                </p>
                <span class="date">{{dateFormat(r.create_at)}}</span>
                <p class="content" v-html="r.content"></p>
              </div>
              <div class="thumbs df dfaic" @click="handleCollect(r)">
                  <span 
                    class="iconfont"
                    :class="{
                        'collectsolid':r.ups.includes(userInfo.selfId),
                        'collect': !r.ups.includes(userInfo.selfId), 
                        'isCollect' : collectStatus && currentId === r.id
                    }"
                  ></span>
                  <span class="num">{{r.ups.length}}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { Toast } from 'mint-ui';
export default {
  name: 'TopicDetail',
  data () {
    return {
      collectStatus: false,
      currentId: '',
      topic: {}
    }
  },
  created () {
    this.getData()
  },
  computed:{
      ...mapState({
        userInfo: 'userInfo'
      })
  },
  methods: {
    /**
     * 格式化日期
     */
    dateFormat (date) {
       return moment(date).format('YYYY年MM月DD日 HH:mm')
    },
    /**
     * 修改点赞状态
     */
    handleCollect(t){
        console.log(t)
        const reply_id = t.id
        const { accesstoken } = this.userInfo
        this.currentId = reply_id
        
        this.collectStatus = true;
        setTimeout(() => {
            this.collectStatus = false;
        }, 2000);

        this.$axios.post(`/v2/api/v1/reply/${reply_id}/ups`, {
            accesstoken
        }).then(res => {
            const data = res.data
            if(data.success){
                // if(data.action === 'up'){
                //     Toast({
                //         message: '点赞成功',
                //         iconClass: 'icon icon-success'
                //     });
                // }else{
                //     Toast({
                //         message: '取消成功',
                //         iconClass: 'icon icon-success'
                //     });
                // }
                
                this.getData()
            }
        }).catch(err => {
            console.log(err)
        })
    },
    /**
     * 获取主题数据
     */
    getTopics () {
      const { id } = this.$route.params
      return this.$axios.get(`/v2/api/v1/topic/${id}`)
    },
    async getData () {
      try{
        const { data } = await this.getTopics()
        this.topic = data.data
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.topicDetail {
  height: 100%;
  background: #f6f6f6;
  overflow: auto;
  padding:3.333333rem 0 5.333333rem;
  box-sizing: border-box;
  .header{
      background: rgba(54,146,25, 1);
      font-size: 1.24rem;
      >>> button{
          span{
            line-height: 0.8;
          }
          .mint-button-text{
            font-size: 1rem;
        }
      }
  }
  .top{
    margin: .5rem;
    padding: .833333rem;
    background: #fff;
    .title{
        font-size: 1.833333rem;
        font-weight: 700;
        margin: .666667rem 0;
        vertical-align: bottom;
        line-height: 1.2;
    }
    .supply{
        font-size: 1rem;
        line-height: 1.6;
        overflow: hidden;
        >>> h4{
            margin: 1.333333rem 0;
            font-size: 1.166667rem;
            color: #333;
            font-weight: 700;
        }
        >>> p{
            margin: 1rem 0;
        }
        >>> img{
            max-width: 100%;
        }
        >>> li{
            list-style: decimal;
            margin-left: 2em;
        }
        >>> pre{
            overflow: auto;
        }
    }
  }
  .replyCon{
      margin: 0 .5rem;
      padding: .833333rem;
      background: #fff;
      border: 1px solid #f6f6f6;
      .slide{
          .userinfo{
              margin-bottom: .333333rem;
              img{
                  width: 2rem;
                  height: 2rem;
                  border-radius: 50%;
                  background: #ccc;
                  vertical-align: middle;
                  margin-right: .5rem;
              }
              .name{
                  font-size: 1.166667rem;
                  color: #005580;
              }
          }
          .date{
            font-size: .833333rem;
            margin: .833333rem 0;
            color: #3c3c3c;
          }
          .content{
            font-size: 1.166667rem;
            line-height: 1.6;
            color: #3c3c3c;
            >>> img{
                max-width: 100%;
                vertical-align: middle;
            }
          }
      }
      .thumbs{
          flex-basis: 5rem;
          padding-left: .5rem;
          .num{
            font-size: 1.166667rem;
            color: #369219;
            margin-left: .333333rem;
          }
          .iconfont{
              font-size: 1.666667rem;
              color: #369219;
          }
          .isCollect{
              animation: mymove 2s 1;
          }
      }
      &:last-child{
          border: none;
      }
  }

  @keyframes mymove{
    0% {
        transform: scale(1.0);
        opacity: 1;
    }
    70% {
        transform: scale(20);
        opacity: 0.1;
    }
    100% {
        transform: scale(1.0);
        opacity: 1;
    }
  }
}
</style>
