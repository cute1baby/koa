<template>
  <div class="topicDetail df dfdir">
      <mt-header fixed title="话题详情" class="header">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
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
  padding:40px 0 64px;
  box-sizing: border-box;
  .header{
      background: #369219;
  }
  .top{
    margin: 6px;
    padding: 10px;
    background: #fff;
    .title{
        font-size: 22px;
        font-weight: 700;
        margin: 8px 0;
        vertical-align: bottom;
        line-height: 1.2;
    }
    .supply{
        font-size: 12px;
        line-height: 1.6;
        >>> h4{
            margin: 16px 0;
            font-size: 14px;
            color: #333;
            font-weight: 700;
        }
        >>> p{
            margin: 12px 0;
        }
        >>> img{
            max-width: 100%;
        }
        >>> li{
            list-style: decimal;
            margin-left: 2em;
        }
    }
  }
  .replyCon{
      margin: 0 6px;
      padding: 10px;
      background: #fff;
      border: 1px solid #f6f6f6;
      .slide{
          .userinfo{
              margin-bottom: 4px;
              img{
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #ccc;
                  vertical-align: middle;
                  margin-right: 6px;
              }
              .name{
                  font-size: 14px;
                  color: #005580;
              }
          }
          .date{
            font-size: 10px;
            margin: 10px 0;
            color: #3c3c3c;
          }
          .content{
            font-size: 14px;
            line-height: 1.6;
            color: #3c3c3c;
          }
      }
      .thumbs{
          flex-basis: 60px;
          padding-left: 6px;
          .num{
            font-size: 14px;
            color: #666;
            margin-left: 4px;
          }
          .iconfont{
              font-size: 20px;
              color: #666;
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
