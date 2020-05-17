// 演示：将泛型的约束设置为继承HTMLElement
function fn<T extends HTMLElement>(a: T) {
    a.querySelector('div')
}

interface Len {
    length: number
}

// 对所有传入的参数进行约束，让传入的参数必须有length属性，否则报错
function fn1<T extends Len>(a: T) {
    // 不是所有的类型都有length
    a.length
}

fn1(1)  //数字没有length属性，所以报错
fn1('1')  // string有length属性，所以该参数传入成功


