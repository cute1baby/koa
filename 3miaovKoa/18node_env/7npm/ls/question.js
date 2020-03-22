// 常见的交互式命令行用户界面的集合
const inquirer = require('inquirer');

inquirer.prompt([
    {
        type: 'input',
        name: 'appName',
        message: '请输入产品的名称',
        default: 'app',
        validate(val){
            // 对输入的内容进行验证，验证成功返回布尔值true
            if (val.trim() === '') {
                return '应用名称不能为空';
            }
            return true;
        },
        filter(val){
            // 对输入的值进行过滤和规则转化
            return val.toLowerCase();   //将值转化为小写
        }
    },{
        type: 'confirm',
        name: 'isEslint',
        message: '是否要使用eslint进行规则校验',
        default: true
    },
    {
        type: 'list',
        name: 'useFrame',
        message: '对下面几种框架进行选择',
        choices:[
            'Vue', 'Anglar', 'React'
        ],
        default: 'Vue'
    },
    {
        type: 'rawlist',
        name: 'useFrame1',
        message: '对下面几种框架进行选择',
        choices: [
            'Vue', 'Anglar', 'React'
        ],
        default: 1
    }, {
        type: 'checkbox',
        name: 'tools',
        message: '开发工具',
        choices: [
            {
                name: '使用ESLint',
                value: 'eslint',
                checked: true
            },
            {
                name: '使用mocha单元测试',
                value: 'mocha'
            },{
                name: '使用babel进行编码',
                value: 'babel'
            }
        ]
    }
]).then(answers => {
    console.log('打印最后选择的值====', answers);
})
