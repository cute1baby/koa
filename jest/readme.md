### 案例1
test1文件夹，如何执行？
```
npm run test
```

### npx jest --coverage是什么意思？
其实是相当于在package.json中做如下配置和操作：
```
"scripts": {
    "coverage":"jest --coverage"
}
```

### 匹配器
见文件`matchers.test.js`

### 开启自动测试
在package.json中配置如下，就不用每次修改之后再手动`npm run test`
```
"scripts": {
    "test": "jest --watchAll"
}
```

### 匹配器自学方法链接
`https://jestjs.io/docs/en/expect`


### 如何让Jest支持import和ES6语法
- 1、安装Babel转换器
```
npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D
```

- 2、在项目根目录下新建一个.babelrc的文件，并做如下配置
```
{
    "presets":[
        [
                "@babel/preset-env",{
                "targets":{
                    "node":"current"
                }
            }
        ]
    ]
}
```

- 3、在`dbj.test.js`写入如下es6语法，完成后执行`npm run test`
```
import {baojian1,baojian2} from './dbj.js'

// 测试两个用例
test('保健1 300元',()=>{
    expect(baojian1(300)).toBe('至尊享受')
})

test('保健2  2000元',()=>{
    expect(baojian2(2000)).toBe('双人服务')
})
```