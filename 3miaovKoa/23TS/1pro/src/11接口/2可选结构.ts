/**
 * interface
 *      为我们提供一种方式来定义某种结构，ts按照这种契约来检测数据
 *
 *      写法
 *          interface Options {
 *              // ...接口规则
 *          }
 *  接口中定义的规则只有抽象描述，不能有具体的值与实现的
 *  对象抽象 => 类（对象的抽象描述）
 *  类抽象 => 抽象类（如果一个类中拥有一个没有具体实现的抽象方法，就是抽象类）
 *  抽象类 => 接口（如果一个抽象鳄梨的成员全部是抽象的，那么可以看做接口）
 */

 // 增加可选属性color，那下面是否会用到该属性都不会导致报错
interface Options {
    width: number,
    height: number,
    color?: string
}
function fn(opts: Options){

}

// 类型检测只检测必须的属性是否存在
// 类型检测不会按照顺序进行，是无序的
fn({
    width: 100,
    height: 200
})



