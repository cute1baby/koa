/**
 * 与数组类似，但是可以存放多种不同类型
 */
let data1: [number, string, boolean]

// 注意：前面的3项顺序要对应
data1[0] = 1
data1[1] = '2'
data1[2] = true



// 对于越界的元素，采用的是联合类型。即重第4个开始存储number, string, boolean都是可以的
/**
 * 我自己测试的结果是不能越界访问
 */
// data1[3] = false
// data1[4] = '10'