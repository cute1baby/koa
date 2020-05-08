/**
 * string和String的不同用法
 * string只能用作基本类型；而String可以用作基本类型，也可以作为对象类型
 */

let s1: string = 'mm'
let s2: String = 'mm'
let s3: string = new String('mm')  //这种情况会报错
let s4: String = new String('mm')