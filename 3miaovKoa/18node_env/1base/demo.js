console.log(111);  // (1)

setTimeout(() => {   // 第一个宏任务
    console.log(555);   // (7)  第三个宏任务

    Promise.resolve(888).then(data => {
        console.log(data);  // (8)
    })
})

new Promise((resolve, reject) => {
	console.log(222);  // (2)
	resolve(333)
}).then(data => {
    console.log(data)  //第一个微任务  // (4)
    return 666
}).then(data => {
    console.log(data)  //第一个微任务  // (5)

    setTimeout(() => {   // 微任务的宏任务（第二个宏任务）
        console.log('1010')   // (89) 第四个宏任务
    });
}).then(() => {
    console.log(777)  // (6)
})

console.log(444);   // (3)

