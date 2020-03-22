// 现在来写一段程序来做一个加法计算

process.stdout.write('来做一个加法计算。首先请输入a的值：')

var a,b;
process.stdin.on('data', e => {
    if(!a){
        a = Number(e);
        console.log('请输入b的值：')
    }else{
        b = Number(e);
        console.log('输出结果是：' + (a+b))
    }
})