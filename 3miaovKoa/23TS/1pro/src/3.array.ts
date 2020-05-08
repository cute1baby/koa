/**
 * 具有相同类型的一组有序数据的集合
 * 声明数组同时要确定数组存储的数据的类型
 * 同一个数组中的数据只能有一种类型
 */

// 基本语法
let arr1:number[]
arr1.push(1)
arr1.push('1')  //这种情况会报错


// 泛型方式
let arr2:Array<number>
arr2.push(2)
arr2.push('2')  //这种情况插入的是字符串类型，不是number类型，所以报错