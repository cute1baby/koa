// 引入七牛模块
const qiniu = require('qiniu')


// 进入七牛云的个人中心，在密钥管理就可以看到AccessKey/SecretKey模块
var accessKey = 'OTo8RiOd59WRc7WQOyxtGPkY2-eEE3Vgi6ly71-W';
var secretKey = 'Vo-SEQ2Mi_SvspVnLzGgPGeG77JeP00Tx37Dj3rD';
// 定义鉴权对象
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


// 点击资源管理部分，构建BucketManager对象
var config = new qiniu.conf.Config();
//config.useHttpsDomain = true;
// 设置存储区域。这里的Zone_z0对应华东，可以进行配置，参考以下链接：https://developer.qiniu.com/kodo/manual/1671/region-endpoint
config.zone = qiniu.zone.Zone_z0;
// bucketManager对象上就有所有的方法
var bucketManager = new qiniu.rs.BucketManager(mac, config);

// 资源管理，抓取网络资源到空间（即直接通过url上传到七牛云，不需要下载）
module.exports = (resUrl, key) => {
    return new Promise((resolve, reject) => {
            /**
         * resUrl: 网络资源储存
         * bucket： 存储空间名称
         * key: 重命名网络资源的名称
         */
        // var resUrl = 'http://devtools.qiniu.com/qiniu.png';
        var bucket = "cdn-self";
        // var key = "qiniu.png";

        bucketManager.fetch(resUrl, bucket, key, function(err, respBody, respInfo) {
            if (err) {
                console.log('七牛云方法出了问题:' + err)
                reject('七牛云方法出了问题:' + err)
            } else {
                if (respInfo.statusCode == 200) {
                    resolve()
                    console.log('文件上传成功');
                }
            }
        });
    })
}