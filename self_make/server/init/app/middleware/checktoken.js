"use strict";
const jwt = require("jsonwebtoken");
const { successRes, failRes } = require("../utils/response");
module.exports = () => {
    return async function (ctx, next) {
        let url = ctx.request.url;
        // await next();
        if (url === "/login") {
            await next();
        } else {
            try {
                if (ctx.headers.authorization) {
                    const tokenStr = ctx.headers.authorization;
                    let {token, exp} = await jwt.verify(tokenStr, "token");
                    console.log('token-=====', token, new Date(1000* exp))
                    if (token) {
                        await next();
                    } else {
                        ctx.body = failRes("接口的非法请求", 1002);
                    }
                } else {
                    ctx.body = failRes("toekn失效", 1001);
                }
            } catch (error) {
                console.log("token校验失败：" + error);
                ctx.body = failRes("toekn失效", 1001);
            }
        }
    };
};
