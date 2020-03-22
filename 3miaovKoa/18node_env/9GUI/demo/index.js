const { app, BrowserWindow, ipcMain } = require('electron')

let userName = 'lizhhong';
global.userName = userName;

let datas = {
    userName: 'lili',
    gender: 'female'
}
// 主线程
app.on('ready', () =>{
    const win = new BrowserWindow({

        webPreferences: {  // 解决渲染线程require报错问题
            nodeIntegration: true
        }
    })

    // 开启开发工具
    win.webContents.openDevTools();

    win.loadFile('./layout/index.html')

    // 监听渲染进程中发过来的数据
    ipcMain.on('getData', function(e, key){
        console.log('>>>>get data=', key)
        // 返回数据给渲染进程中
        e.sender.send('sendData', datas[key])
    })


    // 主线程主动发消息给渲染线程
    setTimeout(() => {
        win.webContents.send('hello', 'welcome to China......', 1, 23);
    }, 2000)





    // 创建第二个窗口
    const win2 = new BrowserWindow({

        webPreferences: {  // 解决渲染线程require报错问题
            nodeIntegration: true
        }
    })
    // 开启开发工具
    win2.webContents.openDevTools();

    win2.loadFile('./layout/index2.html')

})