"use strict";
const jwt = require("jsonwebtoken");
const { successRes, failRes } = require("../utils/response");
module.exports = () => {
    return async function (ctx, next) {
        let url = ctx.request.url;
        console.log('>>>>>>>>>>>>>>>url', url)
        // await next();
        if (
            url.includes("/login") || 
            url.includes("/findUser") || 
            url.includes("/findArticleList") || 
            url.includes("/findArticleDetails")
        ) {
            await next();
        } else {
            try {
                if (ctx.headers.authorization) {
                    const tokenStr = ctx.headers.authorization;
                    let {token, exp} = await jwt.verify(tokenStr, "token");
                    console.log('token-==111111111===', token, new Date(1000* exp))
                    if (token) {
                        await next();
                    } else {
                        ctx.body = failRes("接口的非法请求", 1002);
                    }
                } else {
                    ctx.body = failRes("token失效", 1001);
                }
            } catch (error) {
                console.log("token校验失败：" + error);
                ctx.body = failRes("不存在token", 1001);
            }
        }
    };
};
