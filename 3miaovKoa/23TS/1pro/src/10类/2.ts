class Person {
    username: string = '李钟'
    private _age: number = 10
    // age: number = 10

    getAge(): number{
        return this._age
    }

    // 没有返回值的时候设置为void类型
    setAge(age: number): void{
        if(age > 0 && age < 150){
            this._age = age
        }
    }


    // 存取器，这个a并不会作为方法，而是属性去访问
    get a(): number {
        return this._age
    }
}

/**
 * 设置一些要求
 *  允许在外部获取和修改age的值，但是不希望修改成非法的，例如1000岁
 *  分析：
 *      对属性_age设置为私有的，外部不允许直接修改，而是定义一个有逻辑的方法去修改属性值
 */
let p1: Person = new Person()
console.log(p1.getAge())
p1.setAge(50)
p1.setAge(300)
console.log(p1.getAge())
console.log(p1.a)  // 这个a直接作为属性获取，有点类似计算属性





