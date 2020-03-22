const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
    const win = new BrowserWindow({
        webPreferences: {  // 解决渲染线程require报错问题
            nodeIntegration: true
        },
        width: 540,
        height: 760,
        frame: false,
        resizable: false  //不可拖拽
    })

    // 开启开发工具
    win.webContents.openDevTools();

    win.loadFile('./layout/index.html')

})