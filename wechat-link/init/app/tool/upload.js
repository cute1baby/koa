// 引入七牛模块
const qiniu = require('qiniu')

// 现在设置为每次上传文件都重新请求一次token，避免token过期。
function uploadToken(){
    // 进入七牛云的个人中心，在密钥管理就可以看到AccessKey/SecretKey模块
    var accessKey = 'OTo8RiOd59WRc7WQOyxtGPkY2-eEE3Vgi6ly71-W';
    var secretKey = 'Vo-SEQ2Mi_SvspVnLzGgPGeG77JeP00Tx37Dj3rD';
    // 定义鉴权对象
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    var bucket = "cdn-self";


    //自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
    // 我设置了过期时间之后，过一段时间反而不能用，于是我把expires属性去掉了
    var options = {
        scope: bucket
        // expires: 7200
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var token = putPolicy.uploadToken(mac);

    return token;
}


module.exports = uploadToken;

