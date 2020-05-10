let div1 = document.querySelector('div')

// 约束我们对该数据的使用（可能存在null的情况，所以报错）
div1.style.color = 'red'

// 所以正确的写法是判断存在div1，才执行上面的语句
if (div1){
    div1.style.color = 'red'
}