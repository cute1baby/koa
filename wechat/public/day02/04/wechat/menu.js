const {url} = require('../config/index')
/**
 * 自定义菜单
 */
module.exports = {
    "button": [
        {
            "type": "view",
            "name": "硅谷电影",
            "url": `${url}/movies`
        },
        {
            "type": "view",
            "name": "语音搜索",
            "url": `${url}/search`
        },
        {
            "name": "戳我啊",
            "sub_button": [
                {
                    "type": "view",
                    "name": "官网",
                    "url": "http://www.family.cn/"
                },
                {
                    "type": "click", 
                    "name": "帮助", 
                    "key": "help"
                }
            ]
        }
    ]
}