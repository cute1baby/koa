class P {
    /**
     * ts中的类，成员属性必须要声明后使用
     * 类的成员属性不是在构造函数中声明的，是在class，方法外
     *
     * public
     *      公开的，所有的地方都能访问，属性和方法默认是public
     * private
     *      私有的，只能在该对象（类）的内部才可以访问
     * protected
     *      受保护的，在类的内部和他的子类中才能访问
     * readonly
     *      只读属性，只能在函数内声明和初始化，不能在函数外赋值
     */
    // private username: string = '';  // 只能当前类的内部访问
    // protected username: string = '';  // 当前类和子类的内部都可以访问

    // readonly username: string = '';  //只读属性，只能在函数内声明和初始化，不能在函数外赋值

    public username: string = '';  //默认是public

    constructor(name: string){
        this.username = name
    }
}


class Student extends P {
    say(){
        console.log(this.username)
    }
}

let p2: P = new P('Kimoo')
console.log(p2.username)