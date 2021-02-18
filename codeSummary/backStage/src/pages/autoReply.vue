<template>
  <div>
    <!-- 选择公众号 -->
    111
  </div>
</template>

<script>
import { get as _get, cloneDeep as _cloneDeep } from "lodash";
import axios from "@/utils/fetch";
import { hostAddress } from "@/config/index.js";
const UploadImg = () => import("@/components/UploadImgV2");
const EditReply = () => import("@/components/EditReply");
const ERR_OK = 0;
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 20,
      total: 0, // 总条目数
      wechatList: [], // 公众号列表
      wxActiveIndex: 0, //	被选中的 index
      wxActiveInfo: {}, // 被选中的公众号

      activeName: "1", // 当前选择的一级栏目 1 被关注回复、2 关键词回复、3 收到消息回复
      subActiveName: "1", // 当前选择的二级栏目 1 回复文本消息、2 回复图片消息、3 回复语音消息、4 回复视频消息、5 回复音乐消息、6 回复图文消息

      // 上传文件额外携带参数
      UploadExtraParams: {
        type: "image", // 图片（image）语音（voice）视频（video）缩略图（thumb）
        name: "test", // 文件名
        wechatInfoId: "" // 公众号ID
      },

      // 图文的form
      twForm: {},

      // 回复详情
      reply: {},

      // 关键词回复列表
      replyList: [],

      // 被关注回复文案
      replyTextContent: '',

      // 保存数据对象
      replySaveParams: {
        type: '1', // 1:关注自动回复，2:关键词自动回复
        reply_type: '1', // 1 回复文本消息、2 回复图片消息、3 回复语音消息、4 回复视频消息、5 回复音乐消息、6 回复图文消息
        keyword_like: '',
        keyword: '',
        weight: '',
        reply_text: '',
        wechat_info_id: '',
      },

      // 展示关键词回复编辑状态
      showKeywordReply: false,

      // 关键词回复默认参数
      keywordReplyDef: {
        type: '2', // 1:关注自动回复，2:关键词自动回复
        reply_type: '1', // 1 回复文本消息、2 回复图片消息、3 回复语音消息、4 回复视频消息、5 回复音乐消息、6 回复图文消息
        keyword_like: '',
        keyword: '',
        weight: '',
        reply_text: {
          // 文本回复
          content: '',
          // 图片回复
          imageId: '',
          // 图文回复
          title: '',
          url: '',
          description: '',
          picurl: '', 
          // 链接回复
          pageUrl: ''
        },
        wechat_info_id: '',
      },
    };
  },
  created() {
    // this.getWechatInfoList();
  },
  methods: {
    // tab 切换
    handleClick(tab, even) {
      let { activeName, subActiveName } = this;
      this.replySaveParams['type'] = activeName;
      this.replySaveParams['reply_type'] = subActiveName;
      if (activeName === '1') { // 1:关注自动回复，2:关键词自动回复
        this.reply = this.wxActiveInfo.reply || _cloneDeep(this.replySaveParams);
      }
      if (activeName === '2') { // 1:关注自动回复，2:关键词自动回复
        this.showKeywordReply = false;
      }
    },
    // 编辑关键词
    editKeywordReply(reply) {
      this.reply = reply || _cloneDeep(this.keywordReplyDef);
      this.showKeywordReply = true;
      console.log('编辑关键词' + this.activeName, this.reply)
    },
    // 添加关键词
    addKeywordReply(){
      this.reply = _cloneDeep(this.keywordReplyDef);
      this.showKeywordReply = true;
      console.log('添加关键词' + this.activeName, this.reply);
    },
    // 删除某条关键词回复
    delKeywordReply(reply) {
      console.log('删除某条关键词回复', reply)
      const keywordReplyId = reply.id;
      keywordReplyId && axios
        .get(hostAddress + "/wechat/wechat.reply/del", {
          params: {
            id: keywordReplyId,
          }
        })
        .then(res => {
          const status = _get(res, "data.code");
          if (Number(status) === ERR_OK) {
            this.changeWxActive(this.wxActiveIndex);
            this.$message({
              message: '删除成功',
              type: "success"
            });
          } else {
            const message = _get(res, "data.msg");
            this.$message({
              message: message,
              type: "error"
            });
          }
        });
    },
    // 上传图片回调
    handleImgComplete(imageId) {
      this.imageId = imageId;
    },
    // 公众号列表
    getWechatInfoList() {
      const { pageNum, pageSize } = this;
      axios
        .get(hostAddress + "/wechat/wechat.info/list", {
          params: {
            id: "",
            wechatName: "",
            page: pageNum,
            limit: pageSize
          }
        })
        .then(res => {
          const status = _get(res, "data.code");
          if (Number(status) === ERR_OK) {
            this.wechatList = _get(res, "data.data") || [];
            this.changeWxActive(this.wxActiveIndex)
          } else {
            const message = _get(res, "data.msg");
            this.$message({
              message: message,
              type: "error"
            });
          }
        });
    },
    // 公众号详情
    getWechatInfo(wechatInfoId) {
      axios
        .get(hostAddress + "/wechat/wechat.info/info", {
          params: {
            id: wechatInfoId,
          }
        })
        .then(res => {
          const status = _get(res, "data.code");
          if (Number(status) === ERR_OK) {
            this.wxActiveInfo = _get(res, "data.data") || {};
            this.reply = _get(res, "data.data.reply") || {};
            let replyId = _get(res, "data.data.reply.id");
            replyId && this.getWechatReplyInfo(replyId);
          } else {
            const message = _get(res, "data.msg");
            this.$message({
              message: message,
              type: "error"
            });
          }
        });
    },
    // 关键词回复列表
    getWechatReplyList(wechatInfoId) {
      const { pageNum, pageSize} = this;
      axios
        .get(hostAddress + "/wechat/wechat.reply/list", {
          params: {
            wechatInfoId: wechatInfoId,
            page: pageNum,
            limit: pageSize,
            type: 2, // 1:关注自动回复，2:关键词自动回复
          }
        })
        .then(res => {
          const status = _get(res, "data.code");
          if (Number(status) === ERR_OK) {
            this.replyList = _get(res, "data.data") || [];
          } else {
            const message = _get(res, "data.msg");
            this.$message({
              message: message,
              type: "error"
            });
          }
        });
    },
    // 回复详情
    getWechatReplyInfo(wechatInfoId) {
      axios
        .get(hostAddress + "/wechat/wechat.reply/info", {
          params: {
            id: wechatInfoId // 
          }
        })
        .then(res => {
          const status = _get(res, "data.code");
          if (Number(status) === ERR_OK) {
            this.reply = _get(res, "data.data") || {};
          } else {
            const message = _get(res, "data.msg");
            this.$message({
              message: message,
              type: "error"
            });
          }
        });
    },
    // 保存
    saveWechatReply() {
      let { wxActiveInfo, replySaveParams } = this;
      replySaveParams = {
        wechat_info_id: wxActiveInfo.id,
        ...replySaveParams,
      }
      // 自动回复
      if (String(replySaveParams.type) === '1') {
        // 回复文本消息
        if (String(replySaveParams.reply_type) === '1') {
          const { replyTextContent } = this;
          if (!replyTextContent) {
            return this.$message({
              message: '请填写回复内容',
              type: "warning"
            });
          }
          replySaveParams['reply_text'] = {
            title: '',                      // 图文回复 - 标题
            description: '',                // 图文回复 - 描述
            textContent: replyTextContent,  // 自动回复 - 纯文本
            imageId: '',                    // 图片 id
            url: ''                         // 跳转链接
          }
        }

        // 回复图片消息
        if (String(replySaveParams.reply_type) === '2') {
          const { imageId } = this;
          replySaveParams['reply_text'] = {
            title: '',              // 图文回复 - 标题
            description: '',        // 图文回复 - 描述
            textContent: '',        // 自动回复 - 纯文本
            imageId: imageId,       // 图片 id
            url: ''                 // 跳转链接
          }
        }

        // 回复图文消息
        if (String(replySaveParams.reply_type) === '3') {
          const { imageId } = this;
          replySaveParams['reply_text'] = {
            title: '',              // 图文回复 - 标题
            description: '',        // 图文回复 - 描述
            textContent: '',        // 自动回复 - 纯文本
            imageId: imageId,       // 图片 id
            url: ''                 // 跳转链接
          }
        }
      }
      console.info('replySaveParams', replySaveParams);
      axios
        .post(hostAddress + "/wechat/wechat.reply/save", {
          ...replySaveParams,
          reply_text: JSON.stringify(replySaveParams.reply_text)
        })
        .then(res => {
          const status = _get(res, "data.code");
          if (Number(status) === ERR_OK) {
            this.$message({
              message: '上传成功',
              type: "success"
            });
          } else {
            const message = _get(res, "data.msg");
            this.$message({
              message: message,
              type: "error"
            });
          }
        });
    },
    // 选择公众号
    changeWxActive(index) {
      const { wechatList } = this;
      const item = wechatList[index]
      console.log('选择公众号', item);
      if (typeof item === "object") {
        this.getWechatInfo(item.id);
        this.UploadExtraParams["wechatInfoId"] = item.id;
        this.replySaveParams['wechat_info_id'] = item.id;
        // 刷新数据
        this.getWechatReplyList(item.id);
        this.showKeywordReply = false;
      }
    }
  },
  components: {
    UploadImg,
    EditReply
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #ffffff;
  height: 100px !important;
  border-radius: 6px;
  .title {
    font-size: 18px;
    margin-right: 12px;
  }
}
.el-main {
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 6px;
  .add-keyword-reply {
    width: 160px;
    height: 40px;
    color: #ffffff;
    background: #06609a;
    border-radius: 4px;
    border: none;
  }
  .edit-keyword-reply {
    color: #06609A;
  }
  .del-keyword-reply {
    color: #DF1E25;
  }
  
  /deep/ * {
    .el-tabs__item {
      font-size: 18px;
      font-weight: 600;
      height: 52px;
      line-height: 52px;
    }
    .el-table__header {
      margin-top: 16px;
      background: #ecf0f5 !important;
    }
    .reply-title-tr, .reply-title-th {
      background-color: transparent !important;
    }
    .el-tabs--border-card {
      box-shadow: none;
    }
    .el-tabs__item.is-active,
    .el-tabs__item:hover {
      color: #06609a;
    }
    .el-tabs__active-bar {
      height: 4px;
      background-color: #06609a;
    }
    .el-tabs__nav-wrap::after {
      height: 1px;
      color: #ecf0f5;
    }
    .el-tabs__item.is-active {
      background-color: transparent;
      border-color: transparent;
    }
  }
}
</style>