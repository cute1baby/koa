const { app, BrowserWindow, Menu, MenuItem } = require('electron')

app.on('ready', () => {
    // 创建窗口
    const bw1 = new BrowserWindow({

    })

    // 创建菜单对象
    let m1 = new Menu()

    // 创建菜单项
    const item1 = new MenuItem({
        type: 'normal',
        label: '文件'
    })

    const item2 = new MenuItem({
        type: 'submenu',
        label: '帮助',
        submenu: [
            { type: 'normal', label: '欢迎使用' },
            { type: 'normal', label: '文档'},
            { type: 'normal', label: '隐私声明' },
            { type: 'separator', label: '分割线' },
            // { role: 'quit', label: '退出' },
            { type: 'normal', label: '退出', click(){
                app.quit();
            }},
        ]
    })
    // 将菜单项添加到菜单里
    m1.append(item1)
    m1.append(item2)

    // 指定该菜单显示的主体（具体哪个窗口，右键-上下文）
    /**
     * 1、应用顶层菜单
     * 2、上下文菜单
    */
    // 菜单添加到应用程序的最顶层
    Menu.setApplicationMenu(m1)
})

