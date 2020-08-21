/**
 * 定义模板函数
 * 处理用户发送的消息类型和内容，决定返回不同的内容给用户
 * 
 */
module.exports = message => {
    const options = {
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName,
        createTime: Date.now(),
        msgType: message.MsgType
    }

    let content = '你在说什么，我听不懂'
    if(message.MsgType === 'text'){
        // 判断用户发送的内容具体是什么
        if(message.Content === '1'){ //全局匹配
            content = '小新，我爱你'
        }else if(message.Content === '2'){
            content = '小新，我要娶你'
        }else if(message.Content.match('爱')){
            content = '做吧，再不疯狂我们就老了'
        }
    }else if(message.MsgType === 'image'){
        // 用户发送图片消息
        options.MediaId = message.MediaId
        console.log(message.PicUrl)
    }else if(message.MsgType === 'voice'){
        // 用户发送语音消息
        // options.msgType = message.MsgType
        options.MediaId = message.MediaId
        console.log(message.Format, message.Recognition)
    }else if(message.MsgType === 'location'){
        // 用户发送位置信息
        content = `纬度：${message.Location_X}
            经度：${message.Location_Y}
            缩放大小：${message.Scale}
            位置：${message.Label}
        `
        // options.msgType = message.MsgType
        options.MediaId = message.MediaId
        console.log(message.Format, message.Recognition)
    // 下面开始是一些事件消息
    }else if(message.MsgType === 'event'){
        if(message.Event === 'subscribe'){
            // 用户订阅事件
            content = '欢迎您的订阅'
            if(message.EventKey){
                content = '用户扫描带参数的二维码关注事件'
            }
        }else if(message.Event === 'unsubscribe'){
            // 用户取消关注
            console.log('无情取关')
        }else if(message.Event === 'SCAN'){
            content = '用户已经关注，再扫描带参数的二维码关注事件'
        }else if(message.Event === 'LOCATION'){
            // 上报地理位置事件
            content = `纬度：${message.Latitude}
            经度：${message.Longitude}
            位置精度${message.Precision}
        `
        }else if(message.Event === 'CLICK'){
            // 上报地理位置事件
            content = `您点击了按钮，按钮key值是：${message.EventKey}`
        }
    }
    

    options.content = content

    return options
}