// 测试下面几种用法

/**
 * toBe: 前后是否相等
 * 第一个应该相等，第二个不相等（引用地址不同，报fail）
 */
test('测试007号技师的匹配',()=>{
    expect('007号技师').toBe('007号技师')
}) 
// test('测试严格相等',()=>{
//     const a = {number:'007'}   
//     expect(a).toBe({number:'007'})
// }) 


/**
 * toEqual: 前后的值是否相等
 * 下面的例子相等
 */
test('测试值相等',()=>{
    const a = {number:'007'}   
    expect(a).toEqual({number:'007'})
})

/**
 * toBeNul(): 只匹配null值
 * 下面测试成功
 */
test('toBeNull测试',()=>{
    const a = null   
    expect(a).toBeNull()
})

/**
 * toBeUndifined(): 只匹配undefined值
 * 下面测试成功
 */
test('toBeUndefined测试',()=>{
    const a = undefined   
    expect(a).toBeUndefined()
}) 

/**
 * toBeDefined(): 只要定义过了，都可以匹配成功
 */
test('toBeDefined测试',()=>{
    const a = 'jspang'  
    expect(a).toBeDefined()
}) 

/**
 * toBeTruthy(): 这个是true和false匹配器，就相当于判断真假的
 * 这里值是0，隐式转换为false，测试不通过
 */
// test('toBeTruthy 测试',()=>{
//     const a = 0
//     expect(a).toBeTruthy()
// })

/**
 * toBeFalsy(): 和toBeTruthy()相反，判断是false就通过
 * 这里值是0，隐式转换为false，测试通过
 */
test('toBeFalsy 测试',()=>{
    const a = 0
    expect(a).toBeFalsy()
}) 





/**
 * toBeGreaterThan(): 用来做数字比较，大于传入的数值就可以通过测试
 */
test('toBeGreaterThan匹配器',()=>{
    const count = 10
    expect(count).toBeGreaterThan(9)
})

/**
 * toBeLessThan(): 用来做数字比较，小于传入的数值就可以通过测试
 */
test('toBeLessThan匹配器',()=>{
    const count = 10
    expect(count).toBeLessThan(11)
})

/**
 * toBeGreaterThanOrEqual(): 用来做数字比较，大于等于传入的数值就可以通过测试
 */
test('toBeGreaterThanOrEqual匹配器',()=>{
    const count = 10
    expect(count).toBeGreaterThanOrEqual(10)
})

/**
 * toBeLessThanOrEqual(): 用来做数字比较，小于等于传入的数值就可以通过测试
 */
test('toBeLessThanOrEqual匹配器',()=>{
    const count = 10
    expect(count).toBeLessThanOrEqual(10)
})

/**
 * toBeLessThanOrEqual(): 用来做数字比较，小于等于传入的数值就可以通过测试
 */
test('toBeLessThanOrEqual匹配器',()=>{
    const count = 10
    expect(count).toBeLessThanOrEqual(10)
})


/**
 * toBeCloseTo(): 自动消除js计算的浮点误差。
 * 如：0.1 + 0.2 = 0.3000004，跟0.3是不相等的。使用第一种不通过检查，第二种可通过
 */
// test('toEqual匹配器',()=>{
//     const one = 0.1
//     const two = 0.2
//     expect(one + two).toEqual(0.3)
// })
test('toBeCloseTo匹配器',()=>{
    const one = 0.1
    const two = 0.2
    expect(one + two).toBeCloseTo(0.3)
})




/**
 * toMatch(): 匹配是否存在字符串集合中的某一项。
 */
test('toMatch匹配器',()=>{
    const str="谢大脚、刘英、小红"
    expect(str).toMatch('谢大脚')
})

/**
 * toContain(): 匹配是否存在数组集合中的某一项。
 */
test('toContain匹配器',()=>{
    const arr=['谢大脚','刘英','小红']
    expect(arr).toContain('谢大脚')
})

/**
 * toThrow(): 检测一个方法会不会抛出异常
 */
const throwNewErrorFunc = ()=>{
    throw new Error('this is a new error1111')
}
test('toThrow匹配器',()=>{
    expect(throwNewErrorFunc).toThrow()
})

/**
 * not(): 取反的意思
 * 下面的例子不抛出错误才能通过测试，所以这个例子不通过
 */
// const throwNewErrorFunc = ()=>{
//     throw new Error('this is a new error2222')
// }
// test('toThrow匹配器',()=>{
//     expect(throwNewErrorFunc).not.toThrow()
// })

/**
 * 匹配器自学方法链接
 * https://jestjs.io/docs/en/expect
 */