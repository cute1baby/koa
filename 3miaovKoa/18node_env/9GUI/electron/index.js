// const electron = require('electron')
const { app, BrowserWindow } = require('electron')

/**
 * 事件
 * 属性
 * 方法
 */
// Event.Emmiter
app.on('ready', () => {
    // console.log('ok')

    const parentBw1 = new BrowserWindow({
        width: 800,
        height: 500,
    })

    const bw1 = new BrowserWindow({
        width: 400,
        height: 200,
        // webPreferences: {
        //     nodeIntegration: true
        // },
        title: '千百度',
        //frame: false,  //无边框窗口 => false是无边框
        transparent: true,  //透明窗口
        parent: parentBw1,  //父子窗口
        modal: true,   //模态窗口，子窗口不关闭就不能操作父窗口

    })

    // 与窗口有关的浏览器中的内容都是通过下面的属性类操作的
    bw1.webContents;
    bw1.webContents.openDevTools();
    console.log('窗口的id='+ bw1.id);

    /**
     * 加载指定的页面到窗口中，支持绝对路径，但是推荐使用相对路径。
     * 而且路径在解析的时候会被处理，相对路径默认指向程序的根目录
     */
    bw1.loadFile('./layout/index.html')

    // 支持加载远程文件，支持http协议，支持file协议
    bw1.loadURL('http://www.baidu.com')
})

