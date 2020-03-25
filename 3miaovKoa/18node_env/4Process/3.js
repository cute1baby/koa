// 现在来写一段程序来做一个加法计算

process.stdout.write('来做一个加法计算。首先请输入a的值：')

var a,b;
process.stdin.on('data', e => {
    const eval = e.toString().replace('\r\n', '');
    // console.log('>>>>>e', eval)
    if(!eval){
        console.log('请输入a的值：')
    }else{
        if(!a){
            a = Number(eval);
            console.log('请输入b的值：')
        }else{
            b = Number(eval);
            console.log('输出结果是：' + (a+b))
            // 变量置空
            a = b = ''
        }
    }

})
