/**
 * Created by rencan on 2019/6/18 0018.
 */
//需引用Util.js
//uploadMultipleVideo
//uploadSingleVideoSecond
//uploadSingleVideoBaiShanYun
//uploadSingleAudioBaiShanYun
//uploadSingleImgQiNiuYun

//视频类型
var videoType = [
    'video/mp4'
];
//音频类型
var audioType = [
    'audio/mpeg'
];
//图片类型
var imgType = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/bmp'
];
//pdf文件类型
var pdfType = [
    'application/pdf'
];

//正在上传的视频个数
var uploadingVideoCount = 0;
//正在上传的音频个数
var uploadingAudioCount = 0;
//正在上传的PDF文件个数
var uploadingPdfCount = 0;
//正在上传的图片文件个数
var uploadingImgCount = 0;

var UploadCustom = {

    /**
     * 选择文件
     * @param ele
     */
    selectFile: function (ele) {
        //触发 文件选择的click事件
        var fileId = $(ele).data('fileid');
        $("#" + fileId).trigger("click");
    }

    /**
     * 上传视频文件 - 单个 - 七牛
     * @param file
     */
    , uploadSingleVideo: function (file) {

        //选择文件时
        if (file.files && file.files[0]) {

            //视频文件
            var video = file.files[0];

            //文件类型
            var type = video.type;
            //是否是视频文件
            var index = $.inArray(type, videoType);
            if (index < 0) {
                layer.alert('只能选择MP4文件哦', {icon: 5});
                return false;
            }

            //变量值
            var fileId = $(file).attr('id');
            var previewId = $(file).data('previewid');
            var inputId = $(file).data('inputid');
            var progressId = $(file).data('progressid');
            var progressFilter = $(file).data('progressfilter');  //进度

            //显示进度条
            $('#' + progressId).show();

            //获取文件后缀名
            var i = video.name.lastIndexOf('.');
            var fileExt = video.name.substring(i + 1);

            //发送请求 - 获取key - 成功后 - 预览
            $.request({
                type: 'GET'
                , url: '/communal/qiniu/getToken'
                , dataType: 'json'
                , data: {
                    fileExt: fileExt
                }
                , success: function (jsonData) {

                    //变量值
                    var key = jsonData.data.key;
                    var token = jsonData.data.token;
                    var domain = jsonData.data.domain;

                    //region 七牛进度配置
                    var config = {
                        useCdnDomain: true,
                        region: qiniu.region.z0
                    };

                    var putExtra = {
                        fname: video.name,
                        params: {},
                        mimeType: videoType
                    };

                    var observer = {
                        next: function (res) {
                            console.log('next：');
                            console.log(res);

                            var percent = res.total.percent;
                            element.progress(progressFilter, percent + '%');
                        },
                        error: function (err) {
                            console.log('err：');
                            console.log(err);
                            layer.alert('CODE：' + err.code + '；MSG:' + err.message, {
                                icon: 5
                                , title: '错误提示'
                            });
                            return false;
                        },
                        complete: function (res) {
                            console.log('complete：');
                            console.log(res);
                            //进度条隐藏
                            $('#' + progressId).hide();
                            //视频地址
                            var videoUrl = domain + key;
                            //赋文本值
                            $('#' + inputId).val(videoUrl);

                            //视频预览
                            document.getElementById(previewId).innerHTML = '<li>'
                                + '   <video style="width: 60vh" controls="controls"'
                                + '   src="' + videoUrl + '"></video>'
                                + '   <a href="javascript:void(0);" name="rmSingle" '
                                + '         data-previewid="' + previewId + '" '
                                + '         data-fileid="' + fileId + '" '
                                + '         data-inputid="' + inputId + '"'
                                + '         class="btn btn-danger btn-xs btn-trash">'
                                + '       <i class="fa fa-trash"></i>'
                                + '   </a>'
                                + '</li>';
                        }
                    };
                    //endregion

                    //上传视频
                    var observable = qiniu.upload(video, key, token, putExtra, config);
                    var subscription = observable.subscribe(observer); // 上传开始
                    //取消上传使用
                    //console.log(subscription);
                    //subscription.unsubscribe();
                }
            });
        }
    }

    /**
     * 上传视频文件 - 单个 - 第二版上传样式 - 七牛
     * @param file
     */
    , uploadSingleVideoSecond: function (file) {

        //选择文件时
        if (file.files && file.files[0]) {

            //视频文件
            var video = file.files[0];

            //文件类型
            var type = video.type;
            //是否是视频文件
            var index = $.inArray(type, videoType);
            if (index < 0) {
                layer.alert('只能选择MP4文件哦', {icon: 5});
                return false;
            }

            //视频上传个数 - 自增1
            uploadingVideoCount += 1;

            //变量值
            var fileId = $(file).attr('id');
            var previewId = $(file).data('previewid');
            var inputId = $(file).data('inputid');
            var tableId = $(file).data('table');

            //进度table显示
            $('#' + tableId).show();

            //region 显示进度
            var trId = UtilCustomer.uuid(10);
            var size = parseFloat(video.size / 1048576).toFixed(2);
            var trHtml = '<tr id="' + trId + '">'
                + ' <td>' + video.name + '</td>'
                + ' <td>' + size + ' mb</td>'
                + ' <td>'
                + '     <div class="progress progress-xs">'
                + '         <div name="divSingleProgress" class="progress-bar progress-bar-danger" style="width: 0%"></div> '
                + '     </div>'
                + ' </td> '
                + ' <td><span class="badge bg-red" name="spanSingleProgress">0%</span></td> '
                + ' <td><button class="btn btn-xs btn-danger" name="btnCancelSingleUpload">取消</button></td> '
                + '</tr>';
            $('#' + tableId).append(trHtml);
            //endregion

            //获取文件后缀名
            var i = video.name.lastIndexOf('.');
            var fileExt = video.name.substring(i + 1);

            //发送请求 - 获取key - 成功后 - 预览
            $.request({
                type: 'GET'
                , url: '/communal/qiniu/getToken'
                , dataType: 'json'
                , data: {
                    fileExt: fileExt
                }
                , success: function (jsonData) {

                    //变量值
                    var key = jsonData.data.key;
                    var token = jsonData.data.token;
                    var domain = jsonData.data.domain;

                    //region 七牛进度配置
                    var config = {
                        useCdnDomain: true,
                        region: qiniu.region.z0
                    };

                    var putExtra = {
                        fname: video.name,
                        params: {},
                        mimeType: videoType
                    };

                    var observer = {
                        next: function (res) {
                            console.log('next：');
                            console.log(res);

                            //进度值
                            var percent = res.total.percent;
                            //进度更新
                            $('#' + trId).find("span[name='spanSingleProgress']").text(percent + '%');
                            $('#' + trId).find("div[name='divSingleProgress']").css('width', percent + '%');
                        },
                        error: function (err) {
                            console.log('err：');
                            console.log(err);
                            layer.alert('FILE:' + video.name + '；CODE：' + err.code + '；MSG:' + err.message, {
                                icon: 5
                                , title: '错误提示'
                            });
                            return false;
                        },
                        complete: function (res) {
                            console.log('complete：');
                            console.log(res);

                            //正在上传的视频个数自减
                            uploadingVideoCount -= 1;
                            //进度table - 当前列删除
                            $('#' + trId).remove();
                            //table进度条表格隐藏
                            $('#' + tableId).hide();
                            //视频地址
                            var videoUrl = domain + key;
                            //赋文本值
                            $('#' + inputId).val(videoUrl);

                            //region 视频预览
                            document.getElementById(previewId).innerHTML = '<li>'
                                + '   <video style="width: 60vh" controls="controls"'
                                + '   src="' + videoUrl + '"></video>'
                                + '   <a href="javascript:void(0);" name="rmSingle" '
                                + '         data-previewid="' + previewId + '" '
                                + '         data-fileid="' + fileId + '" '
                                + '         data-inputid="' + inputId + '"'
                                + '         class="btn btn-danger btn-xs">'
                                + '       <i class="fa fa-trash"></i>'
                                + '   </a>'
                                + '</li>';
                            //endregion
                        }
                    };
                    //endregion

                    //上传视频
                    var observable = qiniu.upload(video, key, token, putExtra, config);
                    var subscription = observable.subscribe(observer); // 上传开始
                    //取消上传使用 - subscription.unsubscribe();
                    $('#' + trId).find("button[name='btnCancelSingleUpload']").on('click', function () {
                        //取消七牛上传
                        subscription.unsubscribe();
                        //正在上传的视频个数自减
                        uploadingVideoCount -= 1;
                        //上传当前的tr列
                        $('#'+trId).remove();
                        //进度table隐藏
                        $('#' + tableId).hide();
                        //file控件清空
                        var inputFile = document.getElementById(fileId);
                        if (inputFile.outerHTML) {
                            inputFile.outerHTML = inputFile.outerHTML;
                        } else {
                            inputFile.value = '';
                        }
                    });
                }
            });
        }
    }

    /**
     * 上传视频文件 - 单个 - 白山云【参考】
     *
     * @param file
     */
    , uploadSingleVideoBaiShanYun: function (file) {

        //回调函数
        var callback = arguments[1] ? arguments[1] : function () {};

        //选择文件时
        if (file.files && file.files[0]) {

            //region 文件校验
            //视频文件
            var video = file.files[0];
            //文件类型
            var type = video.type;
            //是否是视频文件
            var index = $.inArray(type, videoType);
            if (index < 0) {
                layer.alert('只能选择MP4文件哦', {icon: 5});
                return false;
            }
            //endregion

            //视频上传个数 - 自增加1
            uploadingVideoCount += 1;

            //region 变量值
            var fileId = $(file).attr('id');
            var previewId = $(file).data('previewid');
            var inputId = $(file).data('inputid');
            var tableId = $(file).data('table');
            //endregion

            //进度table显示
            $('#' + tableId).show();

            //region 显示进度
            var trId = UtilCustomer.uuid(10);
            var size = parseFloat(video.size / 1048576).toFixed(2);
            var trHtml = '<tr id="' + trId + '">'
                + ' <td>' + video.name + '</td>'
                + ' <td>' + size + ' mb</td>'
                + ' <td>'
                + '     <div class="progress progress-xs">'
                + '         <div name="divSingleProgress" class="progress-bar progress-bar-danger" style="width: 0%"></div> '
                + '     </div>'
                + ' </td> '
                + ' <td><span class="badge bg-red" name="spanSingleProgress">0%</span></td>'
                + ' <td>正在上传</td>'
                + '</tr>';
            $('#' + tableId).append(trHtml);
            //endregion

            //region 获取文件后缀名及新文件名
            var i = video.name.lastIndexOf('.');
            var fileExt = video.name.substring(i + 1);
            var tmpName = new Date().getTime();
            var fileName = tmpName + '.' + fileExt;
            //endregion

            //发送请求 - 获取key - 成功后 - 预览
            $.request({
                type: 'GET'
                , url: 'admin.ichazuo.cn/communal/baishan_cloud/getConfigInfo'
                , dataType: 'json'
                , success: function (jsonData) {

                    //region 获取返回值
                    var accessKeyId = jsonData.data.accessKeyId;
                    var secretAccessKey = jsonData.data.secretAccessKey;
                    var bucket = jsonData.data.bucket;
                    var domain = jsonData.data.domain;
                    //endregion

                    //视频URL地址
                    var videoUrl = domain + fileName;

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
                    s3.upload(params).on('httpUploadProgress', function(evt) {
                        //当前进度
                        var loadedMul = evt.loaded.mul(100);
                        var loadedDiv = loadedMul.div(evt.total);
                        var percent = loadedDiv.toFixed(2);
                        //进度更新
                        $('#' + trId).find("span[name='spanSingleProgress']").text(percent + '%');
                        $('#' + trId).find("div[name='divSingleProgress']").css('width', percent + '%');
                    }).send(function (err, data) {
                        //console.log(err, data);
                        if (err === null){
                            //region 上传完成

                            //正在上传的视频个数自减
                            uploadingVideoCount -= 1;
                            //进度table - 当前列删除
                            $('#' + trId).remove();
                            //table进度条表格隐藏
                            $('#' + tableId).hide();
                            //赋文本值
                            $('#' + inputId).val(videoUrl);

                            //回调函数
                            if(typeof callback === "function"){
                                callback();
                            }

                            //region 视频预览
                            document.getElementById(previewId).innerHTML = '<li>'
                                + '   <video style="width: 60vh" controls="controls"'
                                + '   src="' + videoUrl + '"></video>'
                                + '   <a href="javascript:void(0);" name="rmSingle" '
                                + '         data-previewid="' + previewId + '" '
                                + '         data-fileid="' + fileId + '" '
                                + '         data-inputid="' + inputId + '"'
                                + '         class="btn btn-danger btn-xs">'
                                + '       <i class="fa fa-trash"></i>'
                                + '   </a>'
                                + '</li>';
                            //endregion

                            //endregion

                            return false;
                        }

                        layer.alert('FILE:' + video.name + '；ERROR:' + err, {
                            icon: 5
                            , title: '错误提示'
                        });
                    });
                }
            });
        }
    }


    /**
     * 上传视频文件 - 多个
     *
     * @param file
     */
    , uploadMultipleVideo: function (file) {

        //选择文件时
        if (file.files) {

            //其他地方有视频文件正在上传
            if (uploadingVideoCount > 0) {
                layui.use('layer', function () {
                    layer.alert('其他地方有视频文件正在上传，请稍后再试！', {icon: 5});
                    return false;
                });
            }

            $.each(file.files, function (i, ele) {

                //视频文件
                var video = file.files[i];
                //文件类型
                var type = video.type;
                //是否是视频文件
                var index = $.inArray(type, videoType);
                //如果是视频文件
                if (index >= 0) {
                    uploadingVideoCount += 1;

                    //region 变量值
                    var fileId = $(file).attr('id');
                    var previewId = $(file).data('previewid');
                    var inputName = $(file).data('inputname');
                    var tableId = $(file).data('table');
                    //endregion

                    //进度table显示
                    $('#' + tableId).show();

                    //region 显示进度
                    var trId = UtilCustomer.uuid(10);
                    var size = parseFloat(video.size / 1048576).toFixed(2);
                    var trHtml = '<tr id="' + trId + '">'
                        + ' <td>' + video.name + '</td>'
                        + ' <td>' + size + ' mb</td>'
                        + ' <td>'
                        + '     <div class="progress progress-xs">'
                        + '         <div name="divMultipleProgress" class="progress-bar progress-bar-danger" style="width: 0%"></div> '
                        + '     </div>'
                        + ' </td> '
                        + ' <td><span class="badge bg-red" name="spanMultipleProgress">0%</span></td> '
                        + ' <td><button class="btn btn-xs btn-danger" name="btnCancelMultipleUpload">取消</button></td> '
                        + '</tr>';
                    //document.getElementById(tableId).append(trHtml);
                    $('#' + tableId).append(trHtml);
                    //endregion

                    //获取文件后缀名
                    var findIndex = video.name.lastIndexOf('.');
                    var fileExt = video.name.substring(findIndex + 1);

                    //发送请求 - 获取key - 成功后 - 预览
                    $.request({
                        type: 'GET'
                        , url: '/communal/qiniu/getToken'
                        , dataType: 'json'
                        , data: {
                            fileExt: fileExt
                        }
                        , success: function (jsonData) {

                            //变量值
                            var key = jsonData.data.key;
                            var token = jsonData.data.token;
                            var domain = jsonData.data.domain;

                            //region 七牛进度配置
                            var config = {
                                useCdnDomain: true,
                                region: qiniu.region.z0
                            };

                            var putExtra = {
                                fname: video.name,
                                params: {},
                                mimeType: videoType
                            };

                            var observer = {
                                next: function (res) {
                                    console.log('next：');
                                    console.log(res);

                                    //进度值
                                    var percent = res.total.percent;
                                    //进度更新
                                    $('#' + trId).find("span[name='spanMultipleProgress']").text(percent + '%');
                                    $('#' + trId).find("div[name='divMultipleProgress']").css('width', percent + '%');
                                },
                                error: function (err) {
                                    console.log('err：');
                                    console.log(err);
                                    layer.alert('FILE:' + video.name + '；CODE：' + err.code + '；MSG:' + err.message, {
                                        icon: 5
                                        , title: '错误提示'
                                    });
                                    return false;
                                },
                                complete: function (res) {
                                    console.log('complete：');
                                    console.log(res);

                                    //正在上传的视频个数自减
                                    uploadingVideoCount -= 1;
                                    console.log(uploadingVideoCount);

                                    //视频地址
                                    var videoUrl = domain + key;

                                    //进度table - 当前列删除
                                    $('#' + trId).remove();

                                    //进度table隐藏
                                    if (uploadingVideoCount === 0) {
                                        $('#' + tableId).hide();
                                        //file控件清空
                                        var inputFile = document.getElementById(fileId);
                                        if (inputFile.outerHTML) {
                                            inputFile.outerHTML = inputFile.outerHTML;
                                        } else {
                                            inputFile.value = '';
                                        }
                                    }

                                    if (uploadingVideoCount <= -1){
                                        return false;
                                    }

                                    //region 视频预览
                                    var newInputName = inputName + '[]';
                                    var previewHtml = '<li> '
                                        + ' <input type="hidden" name="' + newInputName + '" value="' + videoUrl + '">'
                                        + ' <video style="width: 25vh" controls="controls" src="' + videoUrl + '"></video>'
                                        + ' <a href="javascript:void(0);" name="rmMultiple" class="btn btn-danger btn-xs">'
                                        + '     <i class="fa fa-trash"></i>'
                                        + ' </a> '
                                        + '</li>';
                                    $('#' + previewId).append(previewHtml);
                                    //endregion
                                }
                            };
                            //endregion

                            //上传视频
                            var observable = qiniu.upload(video, key, token, putExtra, config);
                            var subscription = observable.subscribe(observer); // 上传开始

                            //取消上传使用
                            //subscription.unsubscribe();
                            $('#' + trId).find("button[name='btnCancelMultipleUpload']").on('click', function () {
                                //取消七牛上传
                                subscription.unsubscribe();
                                console.log(subscription);
                                //正在上传的视频个数自减
                                uploadingVideoCount -= 1;
                                //上传当前的tr列
                                $('#'+trId).remove();

                                //如果真正上传的视频个数小于0时
                                if(uploadingVideoCount <= 0){
                                    //进度table隐藏
                                    $('#' + tableId).hide();
                                    //file控件清空
                                    var inputFile = document.getElementById(fileId);
                                    if (inputFile.outerHTML) {
                                        inputFile.outerHTML = inputFile.outerHTML;
                                    } else {
                                        inputFile.value = '';
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    }

    /**
     * 上传音频文件 - 单个 - 白山云
     *
     * @param file
     */
    , uploadSingleAudioBaiShanYun: function (file) {

        //回调函数
        var callback = arguments[1] ? arguments[1] : function () {};

        //选择文件时
        if (file.files && file.files[0]) {

            //region 文件校验
            //音频文件
            var audio = file.files[0];
            //文件类型
            var type = audio.type;
            //是否是视频文件
            var index = $.inArray(type, audioType);
            if (index < 0) {
                layer.alert('只能选择MP3文件哦', {icon: 5});
                return false;
            }
            //endregion

            //音频上传个数 - 自增加1
            uploadingAudioCount += 1;

            //region 变量值
            var fileId = $(file).attr('id');
            var previewId = $(file).data('previewid');
            var inputId = $(file).data('inputid');
            var tableId = $(file).data('table');
            //endregion

            //进度table显示
            $('#' + tableId).show();

            //region 显示进度
            var trId = UtilCustomer.uuid(10);
            var size = parseFloat(audio.size / 1048576).toFixed(2);
            var trHtml = '<tr id="' + trId + '">'
                + ' <td>' + audio.name + '</td>'
                + ' <td>' + size + ' mb</td>'
                + ' <td>'
                + '     <div class="progress progress-xs">'
                + '         <div name="divSingleProgress" class="progress-bar progress-bar-danger" style="width: 0%"></div> '
                + '     </div>'
                + ' </td> '
                + ' <td><span class="badge bg-red" name="spanSingleProgress">0%</span></td>'
                + ' <td>正在上传</td>'
                + '</tr>';
            $('#' + tableId).append(trHtml);
            //endregion

            //region 获取文件后缀名及新文件名
            var i = audio.name.lastIndexOf('.');
            var fileExt = audio.name.substring(i + 1);
            var tmpName = new Date().getTime();
            var fileName = tmpName + '.' + fileExt;
            //endregion

            //发送请求 - 获取key - 成功后 - 预览
            $.request({
                type: 'GET'
                , url: '/communal/baishan_cloud/getConfigInfo'
                , dataType: 'json'
                , success: function (jsonData) {

                    //region 获取返回值
                    var accessKeyId = jsonData.data.accessKeyId;
                    var secretAccessKey = jsonData.data.secretAccessKey;
                    var bucket = jsonData.data.bucket;
                    var domain = jsonData.data.domain;
                    //endregion

                    //音频URL地址
                    var audioUrl = domain + fileName;

                    //region 文件上传请求参数配置
                    var params = {Key: fileName, ContentType: type, Body: audio};
                    AWS.config.update({
                        accessKeyId: accessKeyId
                        , secretAccessKey:secretAccessKey
                    });
                    AWS.config.region = 'us-west-1';
                    AWS.config.endpoint = 'http://ss.bscstorage.com';
                    AWS.config.s3ForcePathStyle = true;
                    //endregion

                    var s3 = new AWS.S3({params: {Bucket: bucket}});
                    s3.upload(params).on('httpUploadProgress', function(evt) {
                        //当前进度
                        var loadedMul = evt.loaded.mul(100);
                        var loadedDiv = loadedMul.div(evt.total);
                        var percent = loadedDiv.toFixed(2);
                        //进度更新
                        $('#' + trId).find("span[name='spanSingleProgress']").text(percent + '%');
                        $('#' + trId).find("div[name='divSingleProgress']").css('width', percent + '%');
                    }).send(function (err, data) {
                        //console.log(err, data);
                        if (err === null){

                            //region 上传完成

                            //正在上传的音频个数自减
                            uploadingAudioCount -= 1;
                            //进度table - 当前列删除
                            $('#' + trId).remove();
                            //table进度条表格隐藏
                            $('#' + tableId).hide();
                            //赋文本值
                            $('#' + inputId).val(audioUrl);

                            //回调函数
                            if(typeof callback === "function"){
                                callback();
                            }

                            //region 音频预览
                            document.getElementById(previewId).innerHTML = '<li>'
                                + '   <audio style="width: 60vh" controls="controls"'
                                + '   src="' + audioUrl + '"></audio>'
                                + '   <a href="javascript:void(0);" name="rmSingle" '
                                + '         data-previewid="' + previewId + '" '
                                + '         data-fileid="' + fileId + '" '
                                + '         data-inputid="' + inputId + '"'
                                + '         class="btn btn-danger btn-xs">'
                                + '       <i class="fa fa-trash"></i>'
                                + '   </a>'
                                + '</li>';
                            //endregion

                            //endregion

                            return false;
                        }

                        layer.alert('FILE:' + audio.name + '；ERROR:' + err, {
                            icon: 5
                            , title: '错误提示'
                        });
                    });
                }
            });
        }
    }

    /**
     * 上传PDF文件 - 单个
     * @param file
     */
    , uploadSinglePdf: function (file) {

        //选择文件时
        if (file.files && file.files[0]) {

            //视频文件
            var pdf = file.files[0];

            //文件类型
            var type = pdf.type;
            //是否是视频文件
            var index = $.inArray(type, pdfType);
            if (index < 0) {
                layer.alert('只能选择PDF文件哦', {icon: 5});
                return false;
            }

            //视频上传个数 - 自增1
            uploadingPdfCount += 1;

            //变量值
            var fileId = $(file).attr('id');
            var previewId = $(file).data('previewid');
            var inputId = $(file).data('inputid');
            var tableId = $(file).data('table');

            //进度table显示
            $('#' + tableId).show();

            //region 显示进度
            var trId = UtilCustomer.uuid(10);
            var size = parseFloat(pdf.size / 1048576).toFixed(2);
            var trHtml = '<tr id="' + trId + '">'
                + ' <td>' + pdf.name + '</td>'
                + ' <td>' + size + ' mb</td>'
                + ' <td>'
                + '     <div class="progress progress-xs">'
                + '         <div name="divSingleProgress" class="progress-bar progress-bar-danger" style="width: 0%"></div> '
                + '     </div>'
                + ' </td> '
                + ' <td><span class="badge bg-red" name="spanSingleProgress">0%</span></td> '
                + ' <td><button class="btn btn-xs btn-danger" name="btnCancelSingleUpload">取消</button></td> '
                + '</tr>';
            $('#' + tableId).append(trHtml);
            //endregion

            //获取文件后缀名
            var i = pdf.name.lastIndexOf('.');
            var fileExt = pdf.name.substring(i + 1);

            //发送请求 - 获取key - 成功后 - 预览
            $.request({
                type: 'GET'
                , url: '/communal/qiniu/getToken'
                , dataType: 'json'
                , data: {
                    fileExt: fileExt
                }
                , success: function (jsonData) {

                    //变量值
                    var key = jsonData.data.key;
                    var token = jsonData.data.token;
                    var domain = jsonData.data.domain;

                    //region 七牛进度配置
                    var config = {
                        useCdnDomain: true,
                        region: qiniu.region.z0
                    };

                    var putExtra = {
                        fname: pdf.name,
                        params: {},
                        mimeType: pdfType
                    };

                    var observer = {
                        next: function (res) {
                            console.log('next：');
                            console.log(res);

                            //进度值
                            var percent = res.total.percent;
                            //进度更新
                            $('#' + trId).find("span[name='spanSingleProgress']").text(percent + '%');
                            $('#' + trId).find("div[name='divSingleProgress']").css('width', percent + '%');
                        },
                        error: function (err) {
                            console.log('err：');
                            console.log(err);
                            layer.alert('FILE:' + video.name + '；CODE：' + err.code + '；MSG:' + err.message, {
                                icon: 5
                                , title: '错误提示'
                            });
                            return false;
                        },
                        complete: function (res) {
                            console.log('complete：');
                            console.log(res);

                            //正在上传的视频个数自减
                            uploadingPdfCount -= 1;
                            //进度table - 当前列删除
                            $('#' + trId).remove();
                            //table进度条表格隐藏
                            $('#' + tableId).hide();
                            //视频地址
                            var pdfUrl = domain + key;
                            //赋文本值
                            $('#' + inputId).val(pdfUrl);

                            //region PDF预览
                            document.getElementById(previewId).innerHTML = '<li>'
                                + '   <embed style="width: 80vh" controls="controls"'
                                + '   src="' + pdfUrl + '"></embed>'
                                + '   <a href="javascript:void(0);" name="rmSingle" '
                                + '         data-previewid="' + previewId + '" '
                                + '         data-fileid="' + fileId + '" '
                                + '         data-inputid="' + inputId + '"'
                                + '         class="btn btn-danger btn-xs">'
                                + '       <i class="fa fa-trash"></i>'
                                + '   </a>'
                                + '</li>';
                            //endregion
                        }
                    };
                    //endregion

                    //上传视频
                    var observable = qiniu.upload(pdf, key, token, putExtra, config);
                    // 上传开始
                    var subscription = observable.subscribe(observer);
                    //取消上传使用 - subscription.unsubscribe();
                    $('#' + trId).find("button[name='btnCancelSingleUpload']").on('click', function () {
                        //取消七牛上传
                        subscription.unsubscribe();
                        //正在上传的视频个数自减
                        uploadingPdfCount -= 1;
                        //上传当前的tr列
                        $('#'+trId).remove();
                        //进度table隐藏
                        $('#' + tableId).hide();
                        //file控件清空
                        var inputFile = document.getElementById(fileId);
                        if (inputFile.outerHTML) {
                            inputFile.outerHTML = inputFile.outerHTML;
                        } else {
                            inputFile.value = '';
                        }
                    });
                }
            });
        }
    }

    /**
     * 上传图片文件 - 单个
     *
     * @param file
     */
    , uploadSingleImg: function (file) {

        //选择文件时
        if (file.files && file.files[0]) {

            //视频文件
            var img = file.files[0];

            //文件类型
            var type = img.type;
            //是否是图片文件
            var index = $.inArray(type, imgType);
            if (index < 0) {
                layer.alert('只能选择图片文件哦', {icon: 5});
                return false;
            }

            //变量值
            var fileId = $(file).attr('id');
            var previewId = $(file).data('previewid');
            var inputId = $(file).data('inputid');

            //获取文件后缀名
            var i = img.name.lastIndexOf('.');
            var fileExt = img.name.substring(i + 1);

            //发送请求 - 获取key - 成功后 - 预览
            $.request({
                type: 'GET'
                , url: '/communal/qiniu/getToken'
                , dataType: 'json'
                , data: {
                    fileExt: fileExt
                }
                , success: function (jsonData) {

                    //变量值
                    var key = jsonData.data.key;
                    var token = jsonData.data.token;
                    var domain = jsonData.data.domain;

                    //region 七牛进度配置
                    var config = {
                        useCdnDomain: true,
                        region: qiniu.region.z0
                    };

                    var putExtra = {
                        fname: img.name,
                        params: {},
                        mimeType: imgType
                    };

                    var observer = {
                        next: function (res) {
                            console.log('next：');
                            console.log(res);
                        },
                        error: function (err) {
                            console.log('err：');
                            console.log(err);
                            layer.alert('CODE：' + err.code + '；MSG:' + err.message, {
                                icon: 5
                                , title: '错误提示'
                            });
                            return false;
                        },
                        complete: function (res) {
                            console.log('complete：');
                            console.log(res);

                            //视频地址
                            var imgUrl = domain + key;
                            //赋文本值
                            $('#' + inputId).val(imgUrl);

                            //图片预览
                            document.getElementById(previewId).innerHTML = '<li>'
                                + '<img width="128px" class="imgDemo" style="cursor: pointer;" src="' + imgUrl + '">'
                                + '<a href="javascript:void(0);" name="rmSingle" '
                                + '         data-previewid="' + previewId + '" '
                                + '         data-fileid="' + fileId + '" '
                                + '         data-inputid="' + inputId + '"'
                                + '         class="btn btn-danger btn-xs btn-trash">'
                                + '  <i class="fa fa-trash"></i>'
                                + ' </a></li>';
                        }
                    };
                    //endregion

                    //上传视频
                    var observable = qiniu.upload(img, key, token, putExtra, config);
                    var subscription = observable.subscribe(observer); // 上传开始
                    //取消上传使用
                    //console.log(subscription);
                }
            });
        }
    }

    /**
     * 上传图片文件(进度显示) - 单个 - 七牛云
     *
     * @param file
     */
    , uploadSingleImgQiNiuYun: function (file) {

        //选择文件时
        if (file.files && file.files[0]) {

            //region 图片文件校验
            //图片文件
            var imgFile = file.files[0];
            //文件类型
            var type = imgFile.type;
            //是否是图片文件
            var index = $.inArray(type, imgType);
            if (index < 0) {
                layer.alert('只能选择图片类文件', {icon: 5});
                return false;
            }
            //endregion

            //图片上传个数 - 自增1
            uploadingImgCount += 1;

            //region 变量值
            var fileId = $(file).attr('id');
            var previewId = $(file).data('previewid');
            var inputId = $(file).data('inputid');
            var tableId = $(file).data('table');
            //endregion

            //文件上传进度TABLE样式显示
            $('#' + tableId).show();

            //region 显示文件上传实时进度
            var trId = UtilCustomer.uuid(10);
            var size = parseFloat(imgFile.size / 1048576).toFixed(2);
            var trHtml = '<tr id="' + trId + '">'
                + ' <td>' + imgFile.name + '</td>'
                + ' <td>' + size + ' mb</td>'
                + ' <td>'
                + '     <div class="progress progress-xs">'
                + '         <div name="divSingleProgress" class="progress-bar progress-bar-danger" style="width: 0%"></div> '
                + '     </div>'
                + ' </td> '
                + ' <td><span class="badge bg-red" name="spanSingleProgress">0%</span></td> '
                + ' <td><button class="btn btn-xs btn-danger" name="btnCancelSingleUpload">取消</button></td> '
                + '</tr>';
            $('#' + tableId).append(trHtml);
            //endregion

            //region 获取文件后缀名
            var i = imgFile.name.lastIndexOf('.');
            var fileExt = imgFile.name.substring(i + 1);
            //endregion

            //region 发送请求 - 获取key - 成功后 - 预览
            $.request({
                type: 'GET'
                , url: '/communal/qiniu/getToken'
                , dataType: 'json'
                , data: {
                    fileExt: fileExt
                }
                , success: function (jsonData) {

                    //region 变量值
                    var key = jsonData.data.key;  //图片实际文件名值
                    var domain = jsonData.data.domain;  //图片上传后显示的域名值
                    var token = jsonData.data.token;  //上传七牛云服务器token秘钥值
                    //endregion

                    //region 七牛进度配置
                    var config = {
                        useCdnDomain: true,
                        region: qiniu.region.z0
                    };

                    var putExtra = {
                        fname: imgFile.name,
                        params: {},
                        mimeType: imgType
                    };

                    var observer = {
                        next: function (res) {
                            console.log('next：');
                            console.log(res);

                            //进度值
                            var percent = res.total.percent;
                            //进度样式更新
                            $('#' + trId).find("span[name='spanSingleProgress']").text(percent + '%');
                            $('#' + trId).find("div[name='divSingleProgress']").css('width', percent + '%');
                        },
                        error: function (err) {
                            console.log('err：');
                            console.log(err);

                            layui.use('layer', function () {
                                var layer = layui.layer;
                                layer.alert('FILE:' + imgFile.name + '；CODE：' + err.code + '；MSG:' + err.message, {
                                    icon: 5
                                    , title: '错误提示'
                                });
                            });
                            return false;
                        },
                        complete: function (res) {
                            console.log('complete：');
                            console.log(res);

                            //region 图片上传完逻辑闭环处理
                            //正在上传的图片个数自减
                            uploadingImgCount -= 1;
                            //进度table - 当前行删除
                            $('#' + trId).remove();
                            //table进度条表格隐藏
                            $('#' + tableId).hide();
                            //图片地址
                            var imgUrl = domain + key;
                            //赋文本值
                            $('#' + inputId).val(imgUrl);
                            //endregion

                            //region 图片预览
                            document.getElementById(previewId).innerHTML = '<li>'
                                + '<img width="128px" class="imgDemo" style="cursor: pointer;" src="' + imgUrl + '">'
                                + '<a href="javascript:void(0);" name="rmSingle" '
                                + '         data-previewid="' + previewId + '" '
                                + '         data-fileid="' + fileId + '" '
                                + '         data-inputid="' + inputId + '"'
                                + '         class="btn btn-xs btn-danger">'
                                + '  <i class="fa fa-trash"></i>'
                                + ' </a></li>';
                            //endregion
                        }
                    };
                    //endregion

                    //上传图片
                    var observable = qiniu.upload(imgFile, key, token, putExtra, config);
                    // 上传开始
                    var subscription = observable.subscribe(observer);
                    //取消上传使用 - subscription.unsubscribe();
                    $('#' + trId).find("button[name='btnCancelSingleUpload']").on('click', function () {
                        //取消七牛上传
                        subscription.unsubscribe();
                        //正在上传的图片个数自减
                        uploadingImgCount -= 1;
                        //移除当前上传进度的tr行
                        $('#'+trId).remove();
                        //进度table隐藏
                        $('#' + tableId).hide();
                        //region file控件清空
                        var file = document.getElementById(fileId);
                        if (file.outerHTML) {
                            file.outerHTML = file.outerHTML;
                        } else {
                            file.value = '';
                        }
                        //endregion
                    });
                }
            });
            //endregion
        }
    }

    /**
     * 模拟上传视频文件 - 单个
     *
     * @param file
     * @returns {boolean}
     */
    , simulateUploadSingleVideo: function (file) {
        //选择文件时
        if (file.files && file.files[0]) {

            //视频文件
            var video = file.files[0];

            //文件类型
            var type = video.type;
            //是否是视频文件
            var index = $.inArray(type, videoType);
            if (index < 0) {
                layer.alert('只能选择MP4文件哦', {icon: 5});
                return false;
            }

            //变量值
            var fileId = $(file).attr('id');
            var previewId = $(file).data('previewid');
            var inputId = $(file).data('inputid');
            var progressId = $(file).data('progressid');
            var progressFilter = $(file).data('progressfilter');  //进度

            //模拟loading
            var n = 0, timer = setInterval(function () {
                n = n + Math.random() * 10 | 0;
                if (n >= 100) {
                    n = 100;
                    clearInterval(timer);
                }
                element.progress(progressFilter, n + '%');

                if (n === 100) {

                    setTimeout(function () {

                        //进度条隐藏
                        $('#' + progressId).hide();

                        //input框显示文件名
                        $('#' + inputId).val(video.name);

                        //视频本地地址
                        var url = URL.createObjectURL(video);

                        //视频预览
                        document.getElementById(previewId).innerHTML = '<li>'
                            + '   <video style="width: 60vh" controls="controls"'
                            + '   src="' + url + '"></video>'
                            + '   <a href="javascript:void(0);" name="rmSingle" '
                            + '         data-previewid="' + previewId + '" '
                            + '         data-fileid="' + fileId + '" '
                            + '         data-inputid="' + inputId + '"'
                            + '         class="btn btn-danger btn-xs btn-trash">'
                            + '       <i class="fa fa-trash"></i>'
                            + '   </a>'
                            + '</li>';
                    }, 500);
                }

            }, 300 + Math.random() * 1000);
        }
    }

    /**
     * 模拟上传视频文件 - 多个
     *
     * @param file
     */
    , simulateUploadMultipleVideo: function (file) {

        //选择文件时
        if (file.files) {

            //其他地方有视频文件正在上传
            if (uploadingVideoCount > 0) {
                layui.use('layer', function () {
                    layer.alert('其他地方有视频文件正在上传，请稍后再试！', {icon: 5});
                    return false;
                });
            }

            $.each(file.files, function (i, ele) {

                //视频文件
                var video = file.files[i];
                //文件类型
                var type = video.type;
                //是否是视频文件
                var index = $.inArray(type, videoType);
                //如果是视频文件
                if (index >= 0) {

                    //视频正在上传个数自增加1
                    uploadingVideoCount += 1;

                    //region 变量值
                    var fileId = $(file).attr('id');
                    var previewId = $(file).data('previewid');
                    var inputName = $(file).data('inputname');
                    var tableId = $(file).data('table');
                    //endregion

                    //进度table显示
                    $('#' + tableId).show();

                    //region 显示进度
                    var trId = UtilCustomer.uuid(10);
                    var size = parseFloat(video.size / 1048576).toFixed(2);
                    var trHtml = '<tr id="' + trId + '">'
                        + ' <td>' + video.name + '</td>'
                        + ' <td>' + size + ' mb</td>'
                        + ' <td>'
                        + '     <div class="progress progress-xs">'
                        + '         <div name="divMultipleProgress" class="progress-bar progress-bar-danger" style="width: 0%"></div> '
                        + '     </div>'
                        + ' </td> '
                        + ' <td><span class="badge bg-red" name="spanMultipleProgress">0%</span></td> '
                        + ' <td><button class="btn btn-xs btn-danger" name="btnMultipleProgress">取消</button></td> '
                        + '</tr>';
                    //document.getElementById(tableId).append(trHtml);
                    $('#' + tableId).append(trHtml);
                    //endregion

                    //模拟loading
                    var n = 0, timer = setInterval(function () {
                        n = n + Math.random() * 10 | 0;
                        if (n >= 100) {
                            n = 100;
                            clearInterval(timer);
                        }

                        //进度更新
                        $('#' + trId).find("span[name='spanMultipleProgress']").text(n + '%');
                        $('#' + trId).find("div[name='divMultipleProgress']").css('width', n + '%');

                        //取消上传
                        $('#' + trId).find("button[name='btnMultipleProgress']").on('click', function () {
                            $('#' + trId).remove();
                        });

                        if (n === 100) {

                            setTimeout(function () {

                                //正在上传的视频个数自减
                                uploadingVideoCount -= 1;
                                console.log(uploadingVideoCount);

                                //视频本地地址
                                var url = URL.createObjectURL(video);

                                //进度table - 当前列删除
                                $('#' + trId).remove();

                                //进度table隐藏
                                if (uploadingVideoCount <= 0) {
                                    $('#' + tableId).hide();
                                    //file控件清空
                                    var inputFile = document.getElementById(fileId);
                                    if (inputFile.outerHTML) {
                                        inputFile.outerHTML = inputFile.outerHTML;
                                    } else {
                                        inputFile.value = '';
                                    }
                                }

                                //region 视频预览
                                var newInputName = inputName + '[]';
                                var previewHtml = '<li> '
                                    + ' <input type="hidden" name="' + newInputName + '" value="' + url + '">'
                                    + ' <video style="width: 25vh" controls="controls" src="' + url + '"></video>'
                                    + ' <a href="javascript:void(0);" name="rmMultiple" class="btn btn-danger btn-xs">'
                                    + '     <i class="fa fa-trash"></i>'
                                    + ' </a> '
                                    + '</li>';
                                //document.getElementById(previewId).appendChild(previewHtml);
                                $('#' + previewId).append(previewHtml);
                                //endregion

                            }, 500);
                        }

                    }, 300 + Math.random() * 1000);
                }
            });
        }
    }
};

/**
 * 移除 - file控件为单文件时
 */
$(document.body).on('click', "a[name='rmSingle']", function () {
    var previewId = $(this).data('previewid');
    var inputId = $(this).data('inputid');
    var fileid = $(this).data('fileid');

    //预览区清空
    var prevDiv = document.getElementById(previewId);
    prevDiv.innerHTML = '';

    //文件地址清空
    $('#' + inputId).val('');

    //file控件清空
    var file = document.getElementById(fileid);
    if (file.outerHTML) {
        file.outerHTML = file.outerHTML;
    } else {
        file.value = '';
    }
});

/**
 * 移除 - file控件为多文件时
 */
$(document.body).on('click', "a[name='rmMultiple']", function () {
    $(this).parents('li').remove();
});

$(function () {
    layui.use(['layer'],function () {

        var layer = layui.layer;

        $(document.body).on('click','.imgDemo',function () {
            var src = $(this).attr('src');
            if (typeof src === 'undefined'){
                layer.alert('暂无示例图片',{icon:5,shadeClose:true});
                return false;
            }

            var num = src.lastIndexOf('/')+1;
            var name = src.substring(num);
            layer.photos({
                photos: {
                    "id": 1, //相册id
                    "data": [{
                        "alt": name,
                        "pid": 1, //图片id
                        "src": src //原图地址
                    }]
                }
            });
        });
    });
});