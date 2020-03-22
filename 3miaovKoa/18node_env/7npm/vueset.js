const commander = require('commander');

// 设置当前命令的版本，同时设置别名-v
commander.version('v1.0.0', '-v --version')

// 自定义指令，一个参数的情况。输入node vueset create hello
// option就是一个参数（选项） option('-p, --path <path>')
// let subCommander = commander.command('create <app-name>');
// subCommander.action((create) => {
//     console.log('我的create', create)
// })

// 自定义指令，多个参数的情况.输入node vueset create hello 1 2
let subCommander = commander.command('create <a> <b> <c>');
subCommander.action((a,b,c) => {
    console.log('我的create', a, b, c)
})

commander.parse(process.argv);
