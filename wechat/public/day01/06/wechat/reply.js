/**
 * 定义模板函数
 * 加工最终返回给用户的模板
 * 
 */
module.exports = options => {
    let replyMessage = '' 
    // const options = {
    //     toUserName: message.FromUserName,
    //     fromUserName: message.ToUserName,
    //     createTime: Date.now(),
    //     msgType: 'text'
    // }

    if(message.MsgType === 'text'){
        // 判断用户发送的内容具体是什么
        if(message.Content === '1'){ //全局匹配
            content = '小新，我爱你'
        }else if(message.Content === '2'){
            content = '小新，我要娶你'
        }else if(message.Content.match('爱')){
            content = '做吧，再不疯狂我们就老了'
        }
    }
    options.content = content

    return options
}