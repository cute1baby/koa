module.exports = {
    // 运行环境
    "env": {
        "browser": true,
        "es6": true
    },
    // 默认核心规则
    "extends": "eslint:recommended",
    // 脚本在执行期间访问的额外的全局变量
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,  // ECMAScript支持的版本
        "sourceType": "module" // 指定来源的类型，有script和module
    },
    // 配置规则
    "rules": {
        'no-console': 0,
        'indent': [ 'error', 4 ]
    }
};