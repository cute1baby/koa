/**
 * 这个接口描述的是一个包含有fn并且值的类型为函数的结构体。并不是描述函数结构，
 * 而是一个包含函数的对象结构
 */
interface Options5 {
    fn: Function
}

let o: Options5 = {
    fn: function(){
        console.log(111)
    }
}


let fn8: (x: number, y: number) => number = function (x, y) {
    return x + y
}

fn8(10, 15)
/**
 * 定义一个事件函数，那么这个函数必须有一定的规则；我们不能随便的把一个函数
 */
function f4(x: Event){
    console.log(x.target)
}
document.onclick = f4



// 我们也可以使用interface来约定定义函数的结构
// 定义的是函数接口
interface IFn {
    (x: number, y: number): number
}
let fn11: IFn = function (x: number, y: number): number {return x+ y}



// 定义一个接受一个MouseEvent类型
interface MouseEventCallBack{
    (e: MouseEvent): void
}

let fn12: MouseEventCallBack = function(a: Event){

}

document.onclick = fn12

// 定义接口返回的数据检测
interface AjaxData {
    code: number,
    data: any
}
// 定义回调函数检测
interface AjaxCallback {
    (rs: AjaxData): any
}

// 定义回调函数
function ajax(callback: AjaxCallback){
    callback({
        code: 0,
        data: {
            name: "李钟",
            age: 20
        }
    })
}

// 调用函数
ajax(function (x: AjaxData){
    console.log(x.code, x.data)
})

