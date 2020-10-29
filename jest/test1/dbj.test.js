/**
 * 使用CommonJS的require写法引入文件
 */
// const { baojian1 , baojian2 } = require('./dbj.js')

// // 测试两个用例
// test('保健1 300元',()=>{
//     expect(baojian1(300)).toBe('至尊享受')
// })

// test('保健2  2000元',()=>{
//     expect(baojian2(2000)).toBe('双人服务')
// })


/**
 * 使用es6的import引入方式
 */
import {baojian1,baojian2} from './dbj.js'

// 测试两个用例
test('保健1 300元',()=>{
    expect(baojian1(300)).toBe('至尊享受')
})

test('保健2  2000元',()=>{
    expect(baojian2(2000)).toBe('双人服务')
})