console.log(111);

setTimeout(() => {
	console.log(555);
})

new Promise((resolve, reject) => {
	console.log(222);
	resolve(333)
}).then(data => {
	console.log(data)  //第一个微任务
}).then(() => {
	console.log(666)  //第一个微任务
})

console.log(444);

// 执行结果：111 222 444  333 666 555