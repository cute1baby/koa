<template>
  <el-row class="control-wrapper">
    <div v-if="activeNameDef === '2'" class="keywords-wrap df dfaic">
      <span class="label">关键词</span>
      <el-input 
        v-model="reply.keyword" 
        placeholder="请输入关键词"
        style="width:300px;"
      ></el-input>
      <span class="tip" v-if="!reply.id">*支持多个关键词，用英文“,”隔开</span>
    </div>

    <el-tabs type="border-card" class="subtabs" v-model="subActiveName" @tab-click="handleClick">
      <!-- 文本 -->
      <el-tab-pane name="1" class="text-group">
        <span slot="label">
          <span class="df dfc">
            <i class="el-icon-edit"></i> 文本
          </span>
        </span>
        <el-input type="textarea" id="inputKeyword" v-model="replyTextContent" placeholder="请输入内容"></el-input>
      </el-tab-pane>
      <!-- 图片 -->
      <el-tab-pane name="2" label="图片">
        <span slot="label">
          <span class="df dfc">
            <i class="el-icon-picture-outline"></i> 图片
          </span>
        </span>
        <UploadImg
          :extraParams="UploadExtraParams"
          :imageUrl="imageUrl"
          @handleImgComplete="handleImgComplete"
        />
      </el-tab-pane>
      <!-- 图文 -->
      <el-tab-pane name="6" label="图文">
        <span slot="label">
          <span class="df dfc">
            <i class="el-icon-picture"></i> 图文
          </span>
        </span>
        <el-form label-width="88px" :model="twForm" ref="twForm">
          <el-form-item label="标题"
            prop="title"
            :rules="[
              { required: true, message: '请输入标题', trigger: 'blur' },
            ]"
          >
            <el-input v-model="twForm.title"></el-input>
          </el-form-item>
          <el-form-item label="描述"
            prop="description"
            :rules="[
              { required: true, message: '请输入描述', trigger: 'blur' },
            ]"
          >
            <el-input type="textarea" v-model="twForm.description"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接"
            prop="url"
            :rules="[
              { required: true, message: '请输入跳转链接', trigger: 'blur' },
            ]"
          >
            <el-input v-model="twForm.url"></el-input>
          </el-form-item>
          <el-form-item label="上传封面图">
            <UploadByBaishan 
              @fileUploadSucess="handleGraphicComplete"
              :picurl="twForm.picurl"
              class="up-img"/>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-row class="control-wrapper">
      <el-button @click="saveWechatReplyCheck" class="save">保存</el-button>
      <el-button v-if="activeNameDef === '2'" class="del" @click="hideKeywordReply">取消</el-button>
      <el-button v-else class="del" @click="delReply">删除回复</el-button>
    </el-row>
  </el-row>
</template>

<script>
const UploadImg = () => import("@/components/UploadImgV2");
const UploadByBaishan = () => import("@/components/UploadByBaishan");
import axios from "@/utils/fetch";
import { get as _get, assign as _assign } from "lodash";
import { hostAddress } from "@/config/index.js";
import Cookies from "js-cookie";
const ERR_OK = 0;
export default {
  props: {
    // 当前选择的一级栏目 1 被关注回复、2 关键词回复、3 收到消息回复
    activeNameDef: {
      type: String,
      default: "1"
    },
    // 关键词回复
    reply: {
      type: Object,
      default: {}
    },
    // 当前公众号信息
    wxActiveInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {
    // 从父层接收tab变化
    activeNameDef(newVal, oldVal) {
      if (newVal !== this.activeName) {
        this.activeName = newVal;
      }
      // 初始化数据
      this.initPage();
    },
    // 从父层接收服务号信息变化
    wxActiveInfo(newVal, oldVal) {
      if (newVal.id !== oldVal.id) {
        // 初始化数据
        this.initPage();
      }
    }
  },
  data() {
    return {
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

      // 被关注回复文案
      replyTextContent: "",

      // 保存数据对象
      replySaveParams: {
        type: "", // 1:关注自动回复，2:关键词自动回复
        reply_type: "", // 1 回复文本消息、2 回复图片消息、3 回复语音消息、4 回复视频消息、5 回复音乐消息、6 回复图文消息
        keyword_like: "",
        keyword: "",
        weight: "1",
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
        wechat_info_id: ""
      },

      // 图片回复 图片地址
      imageUrl: ""
    };
  },
  mounted() {
    let { reply } = this;
    let reply_type = String(reply.reply_type || 1);
    this.activeName = this.activeNameDef;
    this.subActiveName = reply_type;
    // 初始化数据
    this.initPage();
  },
  methods: {
    // 初始化数据
    async initPage() {
      this.UploadExtraParams["wechatInfoId"] = this.wxActiveInfo.id;

      // 数据回显
      let { activeName, subActiveName, reply } = this;
      let reply_text = "";
      if (reply.reply_text) {
        try {
          reply_text = JSON.parse(reply.reply_text);
        } catch (error) {
          console.log('JSON.parse(reply.reply_text)', error);
        }
      } else {
        this.imageId = "";
        this.replyTextContent = "";
        this.twForm = {};
      }

      console.log('#####' + activeName + subActiveName)

      this.replySaveParams["type"] = activeName;
      this.replySaveParams["reply_type"] = subActiveName;

      // 被关注回复
      if (activeName === "1") {
        // 1 回复文本消息
        if (subActiveName === "1") {
          this.replyTextContent = reply_text.content;
        }
        // 2 回复图片消息
        if (subActiveName === "2") {
          let imageId = reply_text.imageId;
          if (imageId) {
            this.imageId = imageId;
            const { data } = await this.getImgUrlById(imageId);
            this.imageUrl = _get(data, "data.url");
          } else {
            this.imageUrl = '';
          }
        }
        // 6 回复图文消息
        if (subActiveName === "6") {
          this.twForm = reply_text || {};
        }
      }
      // 关键词回复
      if (activeName === "2") {
        // 1 回复文本消息
        if (subActiveName === "1") {
          this.replyTextContent = reply_text.content;
        }
        // 2 回复图片消息
        if (subActiveName === "2") {
          let imageId = reply_text.imageId;
          if (imageId) {
            this.imageId = imageId;
            const { data } = await this.getImgUrlById(imageId);
            this.imageUrl = _get(data, "data.url");
          } else {
            this.imageUrl = '';
          }
        }
        // 6 回复图文消息
        if (subActiveName === "6") {
          this.twForm = reply_text || {};
          console.log('#####' + activeName + subActiveName, this.twForm.picurl);
        }
      }
    },
    // 上传图文回调
    handleGraphicComplete(picurl) {
      this.twForm['picurl'] = picurl;
      console.log('图片好了：' + picurl)
    },
    // 图片id换图片url
    getImgUrlById(id) {
      return axios.get(hostAddress + "/wechat/wechat.material/info", {
        params: {
          id
        }
      });
    },
    // 上传图片回调
    handleImgComplete(imageId) {
      this.imageId = imageId;
    },
    // tab 切换
    handleClick(tab, even) {
      let { activeName, subActiveName } = this;
      this.replySaveParams["type"] = activeName;
      this.replySaveParams["reply_type"] = subActiveName;
      this.initPage();
    },
    // 保存校验
    saveWechatReplyCheck() {
      let { wxActiveInfo, replySaveParams, activeNameDef, reply } = this;
      replySaveParams = {
        ...replySaveParams,
        id: reply.id || 0, // 0:新增、有值时:编辑
        wechat_info_id: wxActiveInfo.id,
        type: activeNameDef // 1:关注自动回复，2:关键词自动回复
      };
      // 自动回复
      if (String(replySaveParams.type) === "1") {
        // 回复文本消息
        if (String(replySaveParams.reply_type) === "1") {
          const { replyTextContent } = this;
          if (!replyTextContent) {
            return this.$message({
              message: "请填写回复内容",
              type: "warning"
            });
          }
          // 自动回复 - 纯文本
          _assign(replySaveParams["reply_text"], {
            content: replyTextContent
          })
          return this.saveWechatReply(replySaveParams);
        }

        // 回复图片消息
        if (String(replySaveParams.reply_type) === "2") {
          const { imageId } = this;
          _assign(replySaveParams["reply_text"], {
            imageId: imageId, // 图片 id
          })
          return this.saveWechatReply(replySaveParams);
        }

        // 回复图文消息
        if (String(replySaveParams.reply_type) === "6") {
          const { imageId, twForm } = this;
          this.$refs['twForm'].validate((valid) => {
            if (valid) {
              console.log('submit!');
              _assign(replySaveParams["reply_text"], twForm)
              return this.saveWechatReply(replySaveParams);
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }

      // 关键词回复
      if (String(replySaveParams.type) === "2") {
        // 关键词
        if (!reply.keyword) {
          return this.$message({
            message: "请填写关键词",
            type: "warning"
          });
        }

        let keyword = reply.keyword.trim();
        if (reply.id) {
          this.saveWechatKeywordReply(keyword, replySaveParams);
        } else {
          let keywordArr = reply.keyword.split(',')
          keywordArr.forEach(keyword => {
            this.saveWechatKeywordReply(keyword, replySaveParams);
          });
        }
      }
    },
    // 关键词回复保存
    saveWechatKeywordReply(keyword, replySaveParams) {
      // 关键词
      replySaveParams['keyword'] = keyword;
      // 回复文本消息
      if (String(replySaveParams.reply_type) === "1") {
        const { replyTextContent } = this;
        if (!replyTextContent) {
          return this.$message({
            message: "请填写回复内容",
            type: "warning"
          });
        }
        _assign(replySaveParams["reply_text"], {
          content: replyTextContent
        })
        return this.saveWechatReply(replySaveParams);
      }
      // 回复图片消息
      if (String(replySaveParams.reply_type) === "2") {
        const { imageId } = this;
        _assign(replySaveParams["reply_text"], {
          imageId: imageId, // 图片 id
        })
        return this.saveWechatReply(replySaveParams);
      }
      // 回复图文消息
      if (String(replySaveParams.reply_type) === "6") {
        const { imageId, twForm } = this;
        this.$refs['twForm'].validate((valid) => {
          if (valid) {
            _assign(replySaveParams["reply_text"], twForm)
            return this.saveWechatReply(replySaveParams);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    // 自动回复保存
    saveWechatReply(replySaveParams) {
      console.info("replySaveParams", replySaveParams);
      axios
        .post(hostAddress + "/wechat/wechat.reply/save", {
          ...replySaveParams,
          reply_text: JSON.stringify(replySaveParams.reply_text)
        })
        .then(res => {
          const status = _get(res, "data.code");
          if (Number(status) === ERR_OK) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$emit('update')
          } else {
            const message = _get(res, "data.msg");
            this.$message({
              message: message,
              type: "error"
            });
          }
        });
    },
    // 取消保存
    hideKeywordReply() {
      this.$emit('hideKeywordReply')
    },
    // 删除被关注回复
    delReply() {
      console.log('删除被关注回复')
      let { wxActiveInfo } = this;
      const keywordReplyId = _get(wxActiveInfo, 'reply.id');
      keywordReplyId && axios
        .get(hostAddress + "/wechat/wechat.reply/del", {
          params: {
            id: keywordReplyId,
          }
        })
        .then(res => {
          const status = _get(res, "data.code");
          if (Number(status) === ERR_OK) {
            this.$message({
              message: '删除成功',
              type: "success"
            });
            this.$emit('update')
            this.replyTextContent = "";
            this.twForm = {};
          } else {
            const message = _get(res, "data.msg");
            this.$message({
              message: message,
              type: "error"
            });
          }
        });
    },
  },
  components: {
    UploadImg,
    UploadByBaishan
  }
};
</script>

<style lang="less" scoped>
/deep/ .subtabs {
  border-color: #ecf0f5;
  .el-tabs__item {
    font-size: 14px;
    padding: 0 38px;
  }
  .text-group {
    .el-textarea__inner {
      min-height: 230px !important;
      border: none;
      resize: none;
    }
  }
  .el-tabs__content {
    min-height: 230px;
  }
  .el-tabs__header {
    border-color: #ecf0f5;
    background-color: #ecf0f5;
  }
  .el-icon-edit::before {
    font-size: 17px;
    margin-right: 2px;
  }
  .el-icon-picture-outline::before {
    font-size: 18px;
    margin-right: 2px;
  }
  .el-icon-picture::before {
    font-size: 18px;
    margin-right: 2px;
  }
}
/deep/ .control-wrapper {
  margin-top: 32px;
  .save {
    width: 120px;
    height: 40px;
    color: #ffffff;
    background: #06609a;
    border-radius: 4px;
    border: none;
  }
  .add {
    height: 40px;
    color: #ffffff;
    background: #06609a;
    border-radius: 4px;
  }
  .del {
    width: 120px;
    height: 40px;
    color: #06609a;
    background: #ecf0f5;
    border-radius: 4px;
    border: none;
  }
}
.keywords-wrap {
  margin: 10px 0 18px;
  .label {
    margin-right: 8px;
    font-size: 15px;
    font-weight: 600;
  }
  .tip {
    margin-left: 8px;
    color: #DAA487;
    font-size: 12px;
  }
}
</style> 
