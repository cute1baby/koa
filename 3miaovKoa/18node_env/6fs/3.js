let fs = require('fs')

/**
 * 创建文件夹（不会进行递归创建）
 * fs.mkdirSync(path[, options])
 */
try {
    // 创建文件夹images，并且在文件夹下面创建1.txt，2.txt，3.txt文件。
    fs.mkdirSync('./images')
    fs.writeFileSync('./images/1.txt', 'hello world11')
    fs.writeFileSync('./images/2.txt', 'hello world22')
    fs.writeFileSync('./images/3.txt', 'hello world33')
    // 创建images/data文件夹并且创建a.doc，b.doc
    fs.mkdirSync('./images/data')
    fs.writeFileSync('./images/data/a.doc', 'hello world11')
    fs.writeFileSync('./images/data/b.doc', 'hello world22')
}catch(err){
    console.log(err)
}


/**
 * 移除文件夹（只能删除空文件夹，即需要把里面清空才能删除）
 * fs.rmdirSync(path[, options])
 */
// try {
//     fs.rmdirSync('./images')
// } catch (err) {
//     console.log(err)
// }


// 当一个文件夹中既有文件又有文件夹时，需要封装一个递归方法
function removeDir(path){
    try{
        const files = fs.readdirSync(path);
        files && files.forEach(child => {
            let childPath = `${ path }/${child}`;
            // 判断当前是否为文件夹
            if (fs.statSync(childPath).isDirectory()){
                // 当前的子目录有可能是文件，也有可能是文件夹，所以需要调用递归继续检索
                removeDir(childPath)
            }else{
                // 当前目录为文件，直接删除文件
                fs.unlinkSync(childPath)
            }
        })
        // 最后再删除最外层的文件
        fs.rmdirSync(path)
    }catch(err){
        console.log(err);
    }
}
// 调用删除方法
//removeDir('./images')