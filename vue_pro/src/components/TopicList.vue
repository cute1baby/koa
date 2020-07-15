<template>
  <div class="topicList df dfdir">
    <!-- <mt-search
      class="search"
      v-model="content"
      cancel-text="取消"
      placeholder="搜索"
      autofocus
    >
    </mt-search> -->
    <ul class="tablist df">
      <li :class="currentTab===t?'active':''"
          v-for="(t,index) in tabs.list"
          :key="index"
          @click="changeTab(t)">{{tabs.nameObj[t]}}</li>
    </ul>
    <div class="list df1"
         v-if="topicList.length > 0">
      <div v-infinite-scroll="getData"
           infinite-scroll-disabled="false"
           infinite-scroll-distance="10"
           class="topic_list">
        <div class="cell df dfc"
             v-for="item in topicList"
             :key="item.id"
             @click="joinDetail(item)">
          <img class="user_avatar"
               :src="item.author.avatar_url"
               alt="">
          <div class="df1 df dfjbw">
            <div class="left df">
              <p>
                <span :class="item.top||item.good ? 'isgreen put_top':'put_top'">{{tabFormat(item.top, item.good, item.tab)}}</span>
              </p>
              <div class="df df1 dfdir">
                <span class="topic_title spill">{{item.title}}</span>
                <p class="count">
                  <span class="count_of_replies">{{item.reply_count}}</span>/<span class="count_of_visits">{{item.visit_count}}</span>
                </p>

              </div>
            </div>
            <span class="last_active_time df dfaie">{{dateFormat(item.last_reply_at)}}</span>
          </div>

        </div>

      </div>
    </div>
    <div class="loading"
            v-if="isLoading">
        <span id="load-text">正在加载...</span>
    </div>
    <div class="seat"></div>
  </div>
</template>

<script>
import moment from 'moment'
// moment.locale('zh-cn')
export default {
  name: 'TopicList',
  data () {
    return {
      pageIndex: 0,
      pageLimit: 15,
      topicList: [],
      isLoading: true,
      currentTab: '',
      tabs: {
        list: ['', 'ask', 'share', 'job'],
        nameObj: {
          '': '全部', ask: '问答', share: '分享', job: '招聘'
        }
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    /**
     * 格式化日期
     */
    dateFormat (date) {
      let num = '';
      const date1 = moment(date).fromNow(true)
      // console.log(date1);
      const formatList = [
        { key: 'second', value: '秒' },
        { key: 'minute', value: '分钟' },
        { key: 'hour', value: '小时' },
        { key: 'day', value: '天' },
        { key: 'month', value: '月' },
        { key: 'year', value: '年' }
      ]
      for (let i = 0; i < formatList.length; i++)      {
        let item = formatList[i];
        if (date1.includes(item.key))        {
          num = date1.split(item.key)[0].includes('a') ? '1' : date1.split(item.key)[0].trim()
          return `${num}${item.value}前`
        }
      }
    },
    /**
     * 格式化类目显示
     */
    tabFormat (istop, isgood, tab) {
      let tabTitle = ''
      if (istop)      {
        return '置顶'
      }
      if (isgood)      {
        return '精华'
      }

      switch (tab)      {
        case 'share':
          tabTitle = '分享'
          break;
        case 'ask':
          tabTitle = '问答'
          break;
        case 'job':
          tabTitle = '招聘'
          break;
        default:
          break;
      }
      return tabTitle
    },
    /**
     * 获取主题数据
     */
    getTopics () {
      const { pageIndex, pageLimit, currentTab } = this
      return this.$axios.get('/vueHost/api/v1/topics', {
        params: {
          page: pageIndex,
          tab: currentTab,
          limit: pageLimit
        }
      })
    },
    async getData () {
        try{
          this.pageIndex++
          this.isLoading = true
          const { data } = await this.getTopics()
          this.topicList = [...this.topicList, ...data.data]
          // 模拟延迟加载的效果
          this.isLoading = false
        } catch (err){
            console.log(err)
        }
    },

    changeTab(t){
        // 初始化状态
        this.pageIndex = 0
        this.topicList = []
        this.currentTab = t
        this.getData()
    },
    /**跳转详情页 */
    joinDetail (item) {
      const path = `/details/${item.id}`
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.topicList {
  height: 100%;
  .tablist {
    padding: .833333rem;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    li {
      font-size: 1.166667rem;
      margin: 0 .833333rem;
      background-color: #f6f6f6;
      color: #369219;
      padding: .333333rem .5rem;
      border-radius: .25rem;
    }
    .active {
      background-color: #369219;
      color: #fff;
    }
  }
  .list {
    padding: 0 .5rem;
    overflow-y: auto;
    .topic_list {
      background: #fff;
      .cell {
        overflow: hidden;
        position: relative;
        padding: .833333rem;
        font-size: 1.166667rem;
        // border-top: 1px solid #f0f0f0;
        .user_avatar {
          width: 2.5rem;
          height: 2.5rem;
          background: #ccc;
          border-radius: .25rem;
          vertical-align: middle;
          margin-right: .833333rem;
        }
        .left {
          max-width: 70%;
          .put_top {
            background-color: #e5e5e5;
            color: #999;
            margin-right: .5rem;
            padding: 2px 4px;
            border-radius: .25rem;
            font-size: 1rem;
          }
          .isgreen {
            background: #369219;
            color: #fff;
          }
          .topic_title {
            // color: #888;
            color: #333;
            font-size: 1.166667rem;
            line-height: 1.2;
          }
          .count {
            line-height: 1.8;
            font-size: .833333rem;
            .count_of_replies {
              color: #9e78c0;
            }
            .count_of_visits {
              color: #b4b4b4;
            }
          }
        }
        .last_active_time {
          font-size: .833333rem;
          color: #777;
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
        // & :nth-child(1) {
        //   border-top: 0;
        // }
      }

    }
  }
  .loading {
    text-align: center;
    padding: .833333rem 0 1.666667rem;
    color: #666;
  }
  .seat {
    height: 5.333333rem;
  }
}
</style>
