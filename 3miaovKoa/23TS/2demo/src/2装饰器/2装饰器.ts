// 设置装饰器函数
function Age<T extends {new (...args: any[]) : {}}>(constructor: T): T {
    class Person1 extends constructor {
        age: number = 0
    }
    return Person1
}

// Age是一个装饰器函数，该函数会自动调用，不需要加()调用，调用的时候会传入下面这个对应的class的构造函数
@Age
class Person2 {
    // public username: string = 'lizhong'
    username: string = 'lizhong'

    // constructor(public username: string){
    //     this.username = username
    // }
}
// 现在实例中有两个对象
let p2 = new Person2()
console.log(p2)