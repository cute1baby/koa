<template>
  <div class="TopicList">
    <mt-search
      class="search"
      v-model="content"
      cancel-text="取消"
      placeholder="搜索"
      autofocus
    >

    </mt-search>
    <div class="list" v-if="topicList.length > 0">
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isLoading"
          infinite-scroll-distance="10"
        >
          <li v-for="item in topicList" :key="item.id">
            {{ item.title }}
          </li>
        </ul>
      </div>

  </div>
</template>

<script>
export default {
  name: 'TopicList',
  data () {
    return {
      content: '',
      topicList: [],
      isLoading: false,
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getTopics(){
      return this.$axios.get('/v2/api/v1/topics', {
        params: {
          page: 1,
          tab: '',
          limit: 10
        }
      })
    },
    async getData(){
      try{
        this.isLoading = true;
        const {data} = await this.getTopics()
        this.topicList = [...this.topicList, ...data.data]
        this.isLoading = false;
      }catch(err){
        console.log(err);
      }
    },
    loadMore(){

    }

  }
}
</script>

<style scoped>
.search{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.list{
  margin-top: 64px;
}
</style>
