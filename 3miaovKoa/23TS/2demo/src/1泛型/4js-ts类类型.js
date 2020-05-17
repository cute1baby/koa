class Person {
    constructor(username, age){
        this.username = username
        this.age = age
    }
    run(){
        console.log('奔跑吧，兄弟')
    }
}
let p1 = new Person('李钟', 30)

// 接收一个聚义的Person对象
function SuperMan(obj){
    obj.fly = function(){
        console.log('我是超人，我可以飞行了')
    }
}

// 执行这方法之后，就相当于给Person的实例增加了一个fly方法
SuperMan(p1);
p1.fly()



// $(Jquery)的封装思想
function $(constructor){
    return new constructor()
}
const n = $(Array)
// 这里的Person指的是Person的构造函数
const r = $(Person)
r.run()


