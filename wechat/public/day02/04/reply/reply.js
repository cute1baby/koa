// 引入db数据库模块
const db = require('../db')
const {url} = require('../config')
const rp = require('request-promise-native')
const Theaters = require('../model/Theaters')
/**
 * 定义模板函数
 * 处理用户发送的消息类型和内容，决定返回不同的内容给用户
 * 
 */
module.exports = async message => {
    const options = {
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName,
        createTime: Date.now(),
        msgType: message.MsgType
    }
    // 连接数据库（切记，使用之前要连接数据库）
    await db
    let content = '你在说什么，我听不懂'
    if(message.MsgType === 'text'){
        // 判断用户发送的内容具体是什么
        if(message.Content === '热门'){ //全局匹配
            // 用户回复热门，返回图文列表
            const data = await Theaters.find({}, {
                title: 1,
                summary: 1,
                image: 1,
                doubanId: 1,
                _id: 0
            })
            console.log('返回值热门=====>>>>>>', data)
            // 将回复内容初始化
            content = []
            // 将type设置为图文类型
            options.MsgType = 'news'
            for (let index = 0; index < data.length; index++) {
                const element = data[index]
                content.push({
                    title: element.title,
                    description: element.summary,
                    picUrl: element.image,
                    url: `${url}/detail/${element.doubanId}`
                })
            }
        }else if(message.Content === '首页'){
            

            content = '小新，我要娶你'
        }else{
            // 通过输入某个字符获取电影信息
            const {subjects} = await rp({
                method: 'GET',
                url: `${url}/moviesSearch`,
                json: true,
                qs: {
                    q: message.Content
                }
            })
            if(!subjects && subjects.length){
                options.MsgType = 'text'
                content = '暂未找到匹配的电影信息'
            }else{
                // 将type设置为图文类型
                options.MsgType = 'news'
                content = []
                //console.log('subjects=====', subjects)
                for (let index = 0; index < subjects.length; index++) {
                    const element = subjects[index]
                    // 该接口的url没有提供对应的链接跳转地址（用image的跳转代替） 
                    content.push({
                        title: element.title,
                        description: `由${element.directors[0].name}`,
                        picUrl: element.images.large,
                        url: element.images.large
                    })
                }
            }
        }
    }else if(message.MsgType === 'voice'){
        // 用户发送语音消息
        options.MediaId = message.MediaId
        // 语音识别结果
        const recognition = message.Recognition
        // 通过输入某个字符获取电影信息
        const {subjects} = await rp({
            method: 'GET',
            url: `${url}/moviesSearch`,
            json: true,
            qs: {
                q: recognition
            }
        })
        if(!subjects && subjects.length){
            options.MsgType = 'text'
            content = '暂未找到匹配的电影信息'
        }else{
            // 将type设置为图文类型
            options.MsgType = 'news'
            content = []
            //console.log('subjects=====', subjects)
            for (let index = 0; index < subjects.length; index++) {
                const element = subjects[index]
                // 该接口的url没有提供对应的链接跳转地址（用image的跳转代替） 
                content.push({
                    title: element.title,
                    description: `由${element.directors[0].name}`,
                    picUrl: element.images.large,
                    url: element.images.large
                })
            }
        }
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