const fileObject = {
    name: 'miaovNode',
    fileList: [
        {
            name: 'images',
            type: 'dir'
        },
        {
            name: 'css',
            type: 'dir'
        },
        {
            name: 'js',
            type: 'dir'
        },
        {
            name: 'dist',
            type: 'dir'
        },
        {
            name: 'index.html',
            type: 'file',
            content: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                欢迎来到miaovCli
            </body>
        </html>`
        }
    ]
}

const fs = require('fs');

// 创建脚手架文件夹
function createDirs(){
    try {
        const list = fileObject.fileList;
        if (fileObject.name && !fs.existsSync(fileObject.name)) {
            fs.mkdirSync(fileObject.name)
        }

        if (list && Array.isArray(list)) {
            list.forEach(item => {
                item.path = `${fileObject.name}/${item.name}`;
                item.content = item.content || '';
                switch (item.type) {
                    case 'dir':
                        !fs.existsSync(item.path) && fs.mkdirSync(item.path)
                        break;
                    case 'file':
                        fs.writeFileSync(item.path, item.content)
                        break;
                    default:
                        break;
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}
// createDirs();

try{
    // 创建压缩文件夹。将js中的所有文件合并到dist下面的index.js文件中
    const filedir = `${fileObject.name}/js`;
    const tergetdir = `${fileObject.name}/dist`;
    fs.watch(filedir, function(type,name){
        console.log(type + '/'+ name);  //这里不需要判断file是否有内容
        // 只要有一个文件发生了变化，我们就需要对这个文件夹下面的所有文件进行读取，然后合并
        fs.readdir(filedir, function(err, datalist){
            var arr = []
            datalist.forEach(f => {
                if(f){
                    var info = fs.statSync(filedir + '/' + f)
                    console.log(f);

                    // 文件类型33206
                    if (info.mode === 33206) {
                        arr.push(filedir + '/' + f)
                    }
                }
            })

            // 读取数组中的文件内容，并合并
            var content = "";
            arr.forEach(f => {
                var c = fs.readFileSync(f);
                // 将每个文件的内容换行合并
                content+= c.toString() + '\n';

            })
            console.log("==========>>>>c", content)
            fs.writeFileSync(`${tergetdir}/index.js`, content)
        })
    })
} catch(err){
    console.log(err)
}
