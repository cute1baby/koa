// 引入七牛模块
const qiniu = require('qiniu')


// 进入七牛云的个人中心，在密钥管理就可以看到AccessKey/SecretKey模块
var accessKey = 'OTo8RiOd59WRc7WQOyxtGPkY2-eEE3Vgi6ly71-W';
var secretKey = 'Vo-SEQ2Mi_SvspVnLzGgPGeG77JeP00Tx37Dj3rD';
// 定义鉴权对象
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var bucket = "cdn-self";


//自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
var options = {
    scope: bucket,
    expires: 7200
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

module.exports = uploadToken

