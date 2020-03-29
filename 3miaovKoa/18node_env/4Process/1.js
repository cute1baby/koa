// console.log(process)

/**
 * argv：用来获取当前运行node程序的相关参数。如在命令行输入node 1.js -v，此时在argv打印的值中也会把-v打印出来
现实作用：比如通过argv方法给node一些命令做扩展，如node -v,node --save
 */
/**返回的数组默认两个值：一个是node环境路径，一个是当前文件的地址 */
console.log(process.argv)

// 下面我举一个例子，我在命令行输入： node 1.js -v
if (process.argv.includes("-v")){
    console.log("version 1.0.0"); //此时输出该包文件的版本号
}

// 用来区分当前环境是生产模式还是开发模式
// console.log(process.env)

if (process.env.mode == 'dev'){
    console.log('现在是开发模式，会打印错误和警告信息');
}else {
    console.log('生产模式');
}


// 退出程序进程 process.exit()
let a = 0;
setInterval(() => {
    a++;
    console.log(a);
    if(a > 3){
        // 退出程序的进程
        process.exit();
    }
}, 1000)