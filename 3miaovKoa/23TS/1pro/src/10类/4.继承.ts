class Person1 {
    // 在构造函数的参数中如果直接使用public等修饰符，则等同于同时创建了该属性
    constructor(public username: string){
        this.username = username
    }
}

class S extends Person1 {
    // 如果子类没有重写构造函数，则直接使用父类的方法
    // 如果子类重写了构造函数，那么需要主动去调用父类的构造函数
    // super: 关键字，表示父类
    constructor(public username: string, public type: string) {
        super(username)
        this.type = type
    }
}

const ps: Person1 = new Person1('李钟')
const s: S = new S('李钟11', '1')
console.log(ps.username)
console.log(s.username, s.type)