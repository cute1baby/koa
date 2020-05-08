let input: HTMLInputElement = document.querySelector('.ipt')
let btn:HTMLButtonElement = document.querySelector('button')
/**
 * 对数据类型进行约束
 */
btn.onclick = function(){
    let value: number = Number(input.value) + 10
    console.log(value)
}