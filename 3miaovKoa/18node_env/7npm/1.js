#!/usr/bin/env node

const commander = require('commander');

// 设置当前命令的版本，同时设置别名-v
commander.version('v1.0.0', '-v --version')

// 设置除-h,-v的其他参数，后面的[val]是当前这个选项的参数值；[]表示可选。<>表示必填
// 如果第三个参数是一个函数的话，那么该函数会接收来自用户输入的值，并返回一个值作为最后这个选项实际的值
// commander.option('-n --name [val]', 'set name', 'miav_lizhong')
// 如输入node 1 -n lizhong
commander.option('-n --name [val]', 'set name', (val) => {
    console.log('val====>>', val)
    return val.toUpperCase();
})

// 设置命令的动作,如输入node 1 -n lizhong。这里的commander.name就是对应上面commander.option的name
commander.action(() => {
    console.log('hello ' + commander.name)
})

// 解析来自process.argv上的数据，会自动帮助我们添加一个-h的解析
commander.parse(process.argv);

