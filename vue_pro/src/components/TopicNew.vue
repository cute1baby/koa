<template>
  <div class="topicDetail df dfdir">
      111
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

</style>
