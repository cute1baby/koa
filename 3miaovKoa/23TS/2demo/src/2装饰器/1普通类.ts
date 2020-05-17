/**
 * 存在这样一个问题：
 *      这里我写了很多类，他们都继承Person1。这里有一个study方法在很多类都重写了，现在我们想简单化一些
 *      在不改变继承类的情况下，扩展当前类的功能。那就要引入装饰器了
 */
class Person1 {

    constructor(public username: string, public age: number){
        this.username = username
        this.age = age
    }

    say(){
        console.log('say')
    }
}


class Baby extends Person1{
    wawa(){
        console.log('wawa')
    }
}

class Teacher extends Person1 {
    study(){
        console.log('study')
    }
    teach(){
        console.log('教书')
    }
}

class Student extends Person1 {
    study() {
        console.log('study')
    }
}

const s = new Student('小李', 10)
s.study()