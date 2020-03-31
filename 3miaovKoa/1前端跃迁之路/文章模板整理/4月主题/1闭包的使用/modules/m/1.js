// 使用闭包的的方式保护模块内的变量不被污染
(function(){
    const name ="老李"
    const age = 20

    // 将方法和变量向外暴露，赋值给mde。
    exports.mde = {
        age,
        getUser: function(){
            console.log(name);
        }
    }
})()