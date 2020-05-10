// 这是一种普通写法，如果代码量比较大的时候，就很难通过判断这里的gednder分别代表什么意思。
// 所以就引入了枚举类型
let gender:number = 1  //1:男，2：女

if (gender == 1){

}else{

}


enum Gender {Male=1, Female=2};
console.log(Gender.Male)

