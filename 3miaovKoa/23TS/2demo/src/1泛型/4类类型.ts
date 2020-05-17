// 定义索引类型,允许添加Person对象的自定义属性
interface Person {
    [attr: string]: any
}
class Person {
    // 直接定义Person对象的属性
    constructor(public username: string, public age: number){

    }
}

// 这里的p1: Person中的Person指的是一个拥有Person类型对应特征的对象
let p1: Person = new Person('李钟', 20)


function SuperMan(obj: Person) {
    // 如果前面没有定义Person的索引类型，这里的fly方法就会报错
    obj.fly = function(){
        console.log('fly')
    }
}


// 想约束传入的必须是一个构造函数
// function getPersonObj(constructor: Person) {
//     // 而这里的Person指的是一个Person对象，
//     // 我们这里要的是Person的构造函数，不是她的对象，所以这样约束不能达到效果
//     return new constructor();
// }


// 使用{new()}的方式表示一个构造函数的约束
function getArray(constructor: { new(): Array<string> }) {
    return new constructor();
}
getArray(Array)



// 所以上面的getPersonObj方法应该是这样的
function getPersonObj(constructor: { new(): Person }) {
    return new constructor();
}
// 疑问：如何设置Person的构造函数作为参数呢？
getPersonObj( Person )



// 我们通常在js中会绑定一些属性在window上，但是直接这样使用会报错
window.a = 10

// 我们需要给window设置一个类型约束，允许我们添加自定义属性
interface Window{
    [attr: string]: any
}