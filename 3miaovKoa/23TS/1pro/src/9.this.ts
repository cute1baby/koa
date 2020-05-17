/**
 * ts中默认情况下函数中的this默认指向：any
 */

 let obj = {
     a: 10,
     f(){
         // 因为默认情况下，this是any类型，any类型ts不能提示有任何属性方法
        // let document:any
        // any的值，ts不能提示或者进行类型检测
        console.log(this.a)  //10

        // 在文件tsconfig.json中设置noImplicitThis: true，那么this就不会指向any类型了，这样就可以检测了

     }
 }
obj.f()  // 10

// ts会自动推导时间函数中的this
document.onclick = function(){
    console.log(this)
}



/**
 * 这里的this本来是指向对象obj1的，但是用到了下面的场景中，是想让this指向docuemnt的，但是程序不会自动去获取，所以需要手动去设置
 * 这里的函数f参数是一个假参数，运行过程中是不存在的，是给ts检测用的，作用是给this做类型约束
 * 设置了之后this是指向document对象，所以它就有了this.querySelector属性
 */
let obj1 = {
    a: 10,
    f(this: Document) {
        console.log(this.querySelector)
    }
}

document.onclick = obj1.f
// document.body.onclick = obj1.f


