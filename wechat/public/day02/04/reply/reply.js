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
    }else if(message.MsgType === 'voice'){
        // 用户发送语音消息
        // options.msgType = message.MsgType
        options.MediaId = message.MediaId
        console.log(message.Format, message.Recognition)
    }else if(message.MsgType === 'event'){
        // 下面开始是一些事件消息,接下来的一些Event都建立在MsgType是event的基础上
        if(message.Event === 'subscribe'){
            // 用户订阅事件
            content = '欢迎您的订阅\n' + 
            '回复【首页】搜索最新电影预告片\n' + 
            '回复【热门】搜索最新最热门的电影\n' + 
            '回复文本查看指定的电影信息\n' + 
            '回复语音查看指定的电影信息\n' + 
            '或者点击下面的菜单了解公众号'
        }else if(message.Event === 'unsubscribe'){
            // 用户取消关注
            console.log('无情取关')
        }else if(message.Event === 'CLICK'){
            // 上报地理位置事件
            content = '您可以根据以下提示进行操作：\n' + 
            '回复【首页】搜索最新电影预告片\n' + 
            '回复【热门】搜索最新最热门的电影\n' + 
            '回复文本查看指定的电影信息\n' + 
            '回复语音查看指定的电影信息\n' + 
            '或者点击下面的菜单了解公众号'
        }
    }
    

    options.content = content

    return options
}