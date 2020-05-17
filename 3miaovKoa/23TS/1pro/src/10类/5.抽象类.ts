// 抽象类不能实例化
abstract class Person5 {
    username: string
    constructor(username: string){
        this.username = username
    }

    say(){
        console.log('说说话，呵呵天')
    }

    // 虽然子类都会有这样的特性：学习，但是子类学习具体过程不一样，
    // 所在父类确定不了study方法的具体实现，父类只能有抽象约定，接收什么参数，返回什么内容

    // 如果一个方法是抽象方法，那么这个类也应该是抽象的
    abstract study()  // 抽象方法是没有具体代码的
}


class Student5 extends Person5{
    study() {
        console.log(this.username + '自己学习')
    }
}

class Teacher5 extends Person5{
    study() {
        console.log(this.username + '被老师教')
    }
}

// 如果一个类继承了抽象的父类，就必须实现所有抽象方法，否则这个子类还是必须为抽象类
abstract class P5 extends Person5 {

}


const s5 = new Student5('李钟ss')
s5.study()
const t5 = new Teacher5('李钟tt')
t5.study()