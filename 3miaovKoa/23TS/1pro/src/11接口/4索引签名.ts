/**
 * 希望规则是：一组由数字进行key命名的对象
 *  我们可以使用索引签名
 *      为数据定义某种特征为key的数据
 */

 interface Options2 {
     // key是number，value是any类型，有点类似类数组
     [attr: number]: any,
    //  [attr: string]: any,
    length: number
 }

 function fn10(opt: Options2) {

 }

 fn10({
     1: 20,
     2: 250,
    length: 100
 })


