<template>
  <div>
    <el-upload
      :action="hostAddress + '/wechat/wechat.material/createTemporary'"
      list-type="picture-card"
      :data="extraParams"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :headers="headers"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" />
    </el-dialog>
    <form  id="uploadForm">
			<input @change="uploadFile" type="file" name="file" accept="image/*" />
		</form>
  </div>
</template>

<script>
// import axios from "@/utils/fetch";
import axios from "axios";
import { hostAddress, hostAddressDev } from "@/config/index.js";
import Cookies from "js-cookie";
export default {
  props: {
    // 上传附加参数
    extraParams: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      hostAddress,
      dialogImageUrl: "",
      dialogVisible: false,

      headers: {}
    };
  },
  mounted() {
    this.headers.Authorization = Cookies.get("LOGINKEY");
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 初始化上传事件
    uploadFile(event) {
			let that = this;
			let { extraParams } = this;
      let uploadBtn = event.target;
      let outputPathFile = uploadBtn.files[0];
      console.log(outputPathFile);
      if (!outputPathFile) {
        return;
			}
			let formData = new FormData();
			formData.append("file", outputPathFile);
			formData.append("name", outputPathFile.name);
			formData.append("type", extraParams.type);
			formData.append("wechatInfoId", extraParams.wechatInfoId);
			axios({
				method: "POST",
				url: hostAddress + "/wechat/wechat.material/createTemporary",
				headers: {
					'Authorization': Cookies.get("LOGINKEY")
				},
				data: formData
			}).then(res => {
				console.log(res);
			});
			// axios
			// 	.post(hostAddress + "/wechat/wechat.material/createTemporary", 
			// 		formData,
			// 		{headers: {'Authorization': Cookies.get("LOGINKEY")}
			// 	})
      //   .then(res => {
      //     console.log(res);
      //   });
    }
  }
};
</script>

<style lang="less" scoped>
</style> 
