<template>
  <div>
    <el-upload
      :action="hostAddress + '/wechat/wechat.material/createTemporary'"
      list-type="picture-card"
      :limit="1"
      :file-list="fileList"
      :data="extraParams"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :headers="uploadHeaders"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" />
    </el-dialog>
  </div>
</template>

<script>
import { get as _get } from "lodash";
import { hostAddress, hostAddressDev } from "@/config/index.js";
import Cookies from "js-cookie";
export default {
  props: {
    // 上传附加参数
    extraParams: {
      type: Object,
      default: {}
    },
    imageUrl: {
        type: String,
        default: ''
    }
  },
  computed: {
    fileList(){
      return this.imageUrl ? [{url: this.imageUrl}] : []
    }
  },
  data() {
    return {
      hostAddress: hostAddress,
      dialogImageUrl: "",
      dialogVisible: false,

      uploadHeaders: {}
    };
  },
  mounted() {
    this.uploadHeaders.Authorization = Cookies.get("LOGINKEY");
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.$emit("handleImgComplete", '');
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(req) {
      let status = _get(req, 'code')
      let imageId = _get(req, 'data.id')

      // 上传失败
      if (status !== 0) {
        return this.$message({
          message: _get(req, 'msg'),
          type: "error"
        });
      }

      if (!imageId) {
        this.$message({
          message: '图片上传成功，但id未返回',
          type: "error"
        });
      }
      
      this.$emit("handleImgComplete", imageId);
    }
  }
};
</script>

<style lang="less" scoped>
</style> 
