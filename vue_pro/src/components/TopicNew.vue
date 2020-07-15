<template>
  <div class="topicDetail df dfdir">
    <div class="header">
      <router-link to="/">主页</router-link>/<span>发布话题</span>
    </div>
    <div class="container">
      <mt-field label="标题" placeholder="请输入标题" v-model="title"></mt-field>
      <mt-radio
        class="radios"
        title="单选框列表"
        v-model="tab"
        :options="options">
      </mt-radio>
      <mt-field class="content" placeholder="请输入内容" type="textarea" rows="6" v-model="content"></mt-field>
      <mt-button type="primary" class="button" @click="submitData">提交</mt-button>
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
        title:'',
        tab: 'ask',
        content: '',
        options: [
          {
            label: '问答',
            value: 'ask'
          },
          {
            label: '分享',
            value: 'share'
          },
          {
            label: '招聘',
            value: 'job'
          }
        ]
      }
    },

    computed:{
        ...mapState({
          userInfo: 'userInfo'
        })
    },
    methods: {
      validateForm(){
        const {title, content} = this;
        let status = true;
        if(!title.trim()){
          status = false
          Toast({
            message: '请输入标题'
          });
          return status
        }
        if(!content.trim()){
          status = false
          Toast({
            message: '请输入内容'
          });
          return status
        }
        if(title.length < 10){
          status = false
          Toast({
            message: '标题字数至少为10'
          });
          return status
        }

        return status
      },

      async submitData(){
        const {title, tab, content} = this;
        const { accesstoken } = this.userInfo
        if(!this.validateForm()){
          return
        }

        // 提交数据
        this.$axios.post('/vueHost/api/v1/topics', {
          accesstoken,
          title,
          tab,
          content
        }).then(res => {
          const data = res.data
          if(data.success){
            Toast({
              message: '新建主题成功',
              iconClass: 'icon icon-success',
              duration: 2000
            });
            setTimeout(() => {
              this.$router.push('/')
            })
          }
        }).catch(err => {
          console.log(err)
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
.topicDetail{
  background: #fff;
  height: 100%;
  padding: 0 .5rem;
  .header{
    margin-left: .833333rem;
    height: 3.333333rem;
    line-height: 3.333333rem;
    font-size: 1.333333rem;
    font-weight: 600;
    position: relative;
    a{
      color: #369219;
      margin-right: .5rem;
    }
    span{
      margin-left: 6px;
    }
    &:after{
      content:"";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: #f0f0f0;
      transform: scaleY(0.5);
    }
  }
  .container{
    >>> .mint-cell-wrapper{
      background-image: none;
      .mint-cell-title{
          width: 3.833333rem;
      }
      .mint-radio-input:checked + .mint-radio-core{
        background-color: rgba(54,146,25, 0.8);
        border-color: rgba(54,146,25, 0.8);
      }
    }

    .button{
      width: 80%;
      background: rgba(54,146,25, 0.8);
      margin: 1.666667rem auto;
      display: block;
    }
  }
}
</style>
