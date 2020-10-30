---
lang: zh-CN
sidebar: auto
sidebarDepth: 5
editLink: false
meta:
  - name: description
    content: 记录七牛云如何使用
  - name: keywords
    content: 个人成长,前端,技术博客
---

# 记录七牛如何使用

## 参考文档
- 进入七牛云官网并登录自己的账号
- 进入`文档`的类目，进入`开发者中心`
- 点击`对象存储`，点击`SDK&工具`的类目，进入`官方SDK`。
- 选择`Node.js(服务端)`，进入`文档`。[文档链接](https://developer.qiniu.com/kodo/sdk/1289/nodejs)


- 七牛云文件上传的例子：[点这里](http://wechat.familyli.cn/uploadFile.html)
- 例子的项目链接：https://github.com/cute1baby/koa/tree/master/wechat-link/js

## 定义上传文件的方法
[使用参考例子](https://github.com/cute1baby/koa/blob/master/wechat/public/day02/04/server/qiniu/index.js)

### 1、引入七牛模块
```
const qiniu = require('qiniu')
```

### 2、获取秘钥
进入七牛云的`个人中心`，在密钥管理就可以看到AccessKey/SecretKey模块
```
var accessKey = 'OTo8RiOd59WRc7WQOyxtGPkY2-eEE3Vgi6ly71-W';
var secretKey = 'Vo-SEQ2Mi_SvspVnLzGgPGeG77JeP00Tx37Dj3rD';
```

### 3、定义鉴权对象
```
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
```

### 4、构建BucketManager对象
参考文档连接：https://developer.qiniu.com/kodo/sdk/1289/nodejs#7
```
// 点击[资源管理]部分，构建BucketManager对象
var config = new qiniu.conf.Config();

// 设置存储区域。这里的Zone_z0对应华东，可以进行配置，参考以下链接：https://developer.qiniu.com/kodo/manual/1671/region-endpoint
config.zone = qiniu.zone.Zone_z0;

// bucketManager对象上就有所有的方法
var bucketManager = new qiniu.rs.BucketManager(mac, config);
```

### 5、定义上传文件方法
[资源管理，抓取网络资源到空间]（即直接通过url上传到七牛云，不需要下载）。
```
// upload.js
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
```
以上，通过上面5步就将文件上传七牛的方法定义成功。下面看如何调用



## 调用文件上传七牛方法
```
// index.js
const upload = require('./upload')
// 生成唯一key方法，引入的一个插件
const nanoid = require('nanoid')
(async () => {
  var url = 'http://devtools.qiniu.com/qiniu.png'
  var key = `${nanoid(10)}.jpg`
  await upload(url, key)
})()
```