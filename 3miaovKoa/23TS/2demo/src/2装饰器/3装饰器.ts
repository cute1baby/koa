
/**
 * 我们希望壮实出来的age属性的值不是固定的
 * 装饰器函数不是我们主动调用的
 * 如果我们希望传入构造值，那么就的使用闭包
 *
 * 所以Age就不能直接作为装饰器函数
 * 该函数执行完成之后需要返回一个函数，这个返回的函数将作为实际的装饰器函数
 */
function Age(v: number){
    // 这个返回的函数才是真正的装饰器函数
    return function <T extends { new(...args: any[]): {} }>(constructor: T): T {
        class Person1 extends constructor {
            age: number = v
        }
        return Person1
    }
}

@Age(10)
class Person3 {
    // 限制了数据类型
    username: string = 'lizhong2'
}

@Age(20)
class Student3 {
    // 没有限制数据类型
    username = '逍遥'
}

const p3 = new Person3()
console.log(p3)
const s3 = new Student3()
console.log(s3)