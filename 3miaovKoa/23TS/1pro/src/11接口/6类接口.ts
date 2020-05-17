/**
 * 类接口
 *      使用接口让某个类去符合某种契约
 *
 * 类可以通过 implements 关键字去实现某个接口
 *  - implements 某个接口的类必须实现这个接口中确定所有的内容
 *  - 一个类智能有一个父类，但是可以implements多个接口，多个接口使用逗号分割
 *
 *
 */
interface ISuper {
    fly(): void
}

 class Persons {
    constructor(public name: string){

    }
 }

 // 让方法fly符合ISuper的契约
class SuperMan extends Persons implements ISuper {
    fly(){
        console.log('超人在飞哦')

    }
}

class Cat extends Persons implements ISuper {
    fly() {
        console.log('猫咪也学会了人的飞行哦')
    }
}

const s10 = new SuperMan('小李')
s10.fly()
const c1 = new Cat('小猫咪')
c1.fly()