import axios from 'axios'
import Vue from 'vue'
import caculate from './caculate'
//正在上传的视频个数
var uploadingVideoCount = 0;
//正在上传的图片文件个数
var uploadingImgCount = 0;
//视频类型
var videoType = [
    'video/mp4'
];
//图片类型
var imgType = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/bmp'
];

const v = new Vue()

const getBaiShanInfoApi = () => {
    return axios.get('http://admin.ichazuo.cn/communal/baishan_cloud/getConfigInfo')
}
// 上传图片
const uploadPic = async (file, progressCb, successCb) => {
    try {
        //选择文件时
        if (file && file[0]) {
            //region 文件校验
            //视频文件
            var image = file[0];
            //文件类型
            var type = image.type;
            console.log('>>>>>>图片类型type', type)

            //是否是视频文件
            var index = imgType.indexOf(type)
            if (index < 0) {
                return v.$message('只能选择图片文件哦')
            }
            //视频上传个数 - 自增加1
            uploadingImgCount += 1;

            //region 获取文件后缀名及新文件名
            var i = image.name.lastIndexOf('.');
            var fileExt = image.name.substring(i + 1);
            var tmpName = new Date().getTime();
            var fileName = tmpName + '.' + fileExt;
            // 去除后缀名的名称
            var upName = image.name.substring(0, i);

            const { data } = await getBaiShanInfoApi()
            const {
                accessKeyId,
                secretAccessKey,
                bucket,
                domain
            } = data.data

            //视频URL地址
            var imageUrl = domain + fileName;

            //region 文件上传请求参数配置
            var params = {Key: fileName, ContentType: type, Body: image};
            AWS.config.update({
                accessKeyId: accessKeyId
                , secretAccessKey:secretAccessKey
            });
            AWS.config.region = 'us-west-1';
            AWS.config.endpoint = 'http://ss.bscstorage.com';
            AWS.config.s3ForcePathStyle = true;

            var s3 = new AWS.S3({params: {Bucket: bucket}});
            s3.upload(params).on('httpUploadProgress', (evt) => {
                //获取当前进度
                var loadedMul = evt.loaded.mul(100);
                var loadedDiv = loadedMul.div(evt.total);
                var percent = loadedDiv.toFixed(2);
                console.log('获取进度>>>', percent)
                progressCb && progressCb(percent)
            }).send((err, data) => {
                if (!err){
                    //正在上传的视频个数自减
                    uploadingImgCount -= 1;
                    const params = {
                        name: upName,
                        cover: '',
                        address: imageUrl,
                        size: image.size
                    }
                    // 赋值
                    successCb && successCb(params)
                    
                    return false;
                }
            })
        }
        
    } catch (error) {
        console.log('获取上传图片接口报错：'+ error)
    }
}

// 上传视频
const uploadVideo = async (file, progressCb, successCb) => {
    try {
        //选择文件时
        if (file && file[0]) {
            //region 文件校验
            //视频文件
            var video = file[0];
            //文件类型
            var type = video.type;
            console.log('>>>>>>视频类型type', type)

            //是否是视频文件
            var index = videoType.indexOf(type)
            if (index < 0) {
                return v.$message('只能选择MP4文件哦')
            }
            //视频上传个数 - 自增加1
            uploadingVideoCount += 1;

            //region 获取文件后缀名及新文件名
            var i = video.name.lastIndexOf('.');
            var fileExt = video.name.substring(i + 1);
            var tmpName = new Date().getTime();
            var fileName = tmpName + '.' + fileExt;
            // 去除后缀名的名称
            var upName = video.name.substring(0, i)

            const { data } = await getBaiShanInfoApi()
            const {
                accessKeyId,
                secretAccessKey,
                bucket,
                domain
            } = data.data

            //视频URL地址
            var videoUrl = domain + fileName;
            console.log('videoUrl====', videoUrl)

            //region 文件上传请求参数配置
            var params = {Key: fileName, ContentType: type, Body: video};
            AWS.config.update({
                accessKeyId: accessKeyId
                , secretAccessKey:secretAccessKey
            });
            AWS.config.region = 'us-west-1';
            AWS.config.endpoint = 'http://ss.bscstorage.com';
            AWS.config.s3ForcePathStyle = true;
            //endregion

            var s3 = new AWS.S3({params: {Bucket: bucket}});
            s3.upload(params).on('httpUploadProgress', (evt) => {
                //当前进度
                var loadedMul = evt.loaded.mul(100);
                var loadedDiv = loadedMul.div(evt.total);
                var percent = loadedDiv.toFixed(2);
                console.log('获取进度>>>', percent)
                progressCb && progressCb(percent)
            }).send((err, data) => {
                if (!err){
                    //正在上传的视频个数自减
                    uploadingVideoCount -= 1;
                    // 赋值
                    const defaultCover = `https://sslfile.ichazuo.cn/15961814048784.png`;
                    const params = {
                        name: upName,
                        cover: defaultCover,
                        isDefault: 1,
                        address: videoUrl,
                        size: video.size
                    }

                    // 赋值
                    successCb && successCb(params)
                    return false;
                }
            })
        }
        
    } catch (error) {
        console.log('获取上传视频接口报错：'+ error)
    }
}

export {
    uploadPic,
    uploadVideo
}