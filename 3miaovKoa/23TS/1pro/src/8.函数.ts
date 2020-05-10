/**
 * 函数
 *  函数声明 function a(){}
 *  函数表达式 var a = function(){}
 *
 * 类型约束
 *  函数参数
 *  函数返回值
 *
 * 如果函数没有返回值，使用void，不是undefiend
 */

 // 函数声明的方式
 function fn1(x: number, y: number): number {
     return x + y
 }
fn1(1,2)
fn1('1', '2') // 这种方式会报错，因为不是参数不是给定的类型


// 函数表达式的方式（同时要对fn2这个变量进行约束，后面参数约束可以简写）
var fn2: (x:number, y:number) => number = function(x, y) {
    return x + y
}
fn2(3, 5)
fn2(3)  //这个写的话第二个参数是必填的，所以会报错。但是我们有可选参数的需求


// 设置第二个是可选参数，并且没有返回值
function fn3(x: number, y?: number): void {
    console.log(1)
}
fn3(3)


// 参数默认值
function fn4(x: number, y=2): void {
    console.log(y)
}
fn4(3)


// 剩余参数，设置约束是数组
function fn5(...args: any[]): void {
    console.log(args)
}
fn5(3)




// 现在有一种情况：参数既要是数字类型，也可以是字符串类型的，怎么去定义呢？函数重载
function fn6(x: number, y: number): number;
function fn6(x: string, y: string): string;

function fn6(x: any, y: any): any{
    return x + y
}

// 调用的时候参数是number或者string类型都没有报错
fn6(5, 10)
fn6('5', '10')
fn6(5, '10')  // 这样就会报错


