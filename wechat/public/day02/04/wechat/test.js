// 测试promise的关系
function test1(){
    return new Promise((resolve, reject) => {
        resolve(1)
    }).then(res => {
        console.log(res)
        return Promise.resolve(2)
    }).then(res => {
        resolve(res)
    })
}


function test2(){
    new Promise((resolve, reject) => {
        resolve(1)
    }).then(res => {
        console.log(res)
        return Promise.resolve(2)
    }).then(res => {
        console.log(res)
        return Promise.resolve(res)
    })
}

(async () => {
    const t1 = await test1()
    // const t2 = await test2()
    console.log(t1)
})()
