/**
 * 定义模板函数
 * 加工最终返回给用户的模板
 * 
 */
module.exports = options => {
    console.log('options====', options)
    let replyMessage = `<xml>
    <ToUserName><![CDATA[${options.toUserName}]]></ToUserName>
    <FromUserName><![CDATA[${options.fromUserName}]]></FromUserName>
    <CreateTime>${options.createTime}</CreateTime>
    <MsgType><![CDATA[${options.MsgType}]]></MsgType>`
    
    if(options.MsgType === 'text'){
        replyMessage += `<Content><![CDATA[${options.content}]]></Content>`
    }else if(options.MsgType === 'image'){
        replyMessage += `<Image>
            <MediaId><![CDATA[${options.mediaId}]]></MediaId>
        </Image>`
    }else if(options.MsgType === 'voice'){
        replyMessage += `<Voice>
            <MediaId><![CDATA[${options.mediaId}]]></MediaId>
        </Voice>`
    }else if(options.MsgType === 'video'){
        replyMessage += `<Video>
            <MediaId><![CDATA[${options.mediaId}]]></MediaId>
            <Title><![CDATA[${options.title}]]></Title>
            <Description><![CDATA[${options.description}]]></Description>
        </Video>`
    }else if(options.MsgType === 'music'){
        replyMessage += `<Music>
            <Title><![CDATA[${options.title}TITLE]]></Title>
            <Description><![CDATA[${options.description}]]></Description>
            <MusicUrl><![CDATA[${options.musicUrl}MUSIC_Url]]></MusicUrl>
            <HQMusicUrl><![CDATA[${options.hqMusicUrl}HQ_MUSIC_Url]]></HQMusicUrl>
            <ThumbMediaId><![CDATA[${options.mediaId}]]></ThumbMediaId>
        </Music>`
    }else if(options.MsgType === 'news'){
        replyMessage += `<ArticleCount>${options.content.length}</ArticleCount>
            <Articles>`

            options.content.forEach(element => {
                replyMessage += `<item>
                    <Title><![CDATA[${element.title}]]></Title>
                    <Description><![CDATA[${element.description}]]></Description>
                    <PicUrl><![CDATA[${element.picUrl}]]></PicUrl>
                    <Url><![CDATA[${element.url}]]></Url>
                </item>`
            });
            
            replyMessage += `</Articles>`
    }

    replyMessage += `</xml>`
    // 返回最终返回给用户的xml模板
    return replyMessage
}