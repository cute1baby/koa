let fn5: (x: number, y: number) => number = function(x, y){
    return x+ y
}
fn5(1, 12)

// 定义某种类型的接口
interface IFn {
    (x: number, y: number): number
}

// 约束效果类似fn5
let fn6: IFn = function(x, y){
    return x + y
}
fn6(1, 5)


// 泛型类型
let fn7: <T>(x: T, y: T) => number = function(x,y){
    return Number(x) + Number(y)
}
fn7(1, 9)


// 泛型接口
interface IFn1 <T> {
    (x: T, y: T): number
}

// 将泛型接口内数据的T定义为字符串
let fn8: IFn1 <string> = function(x,y) {
    return Number(x) + Number(y)
}
fn8('1','5')


