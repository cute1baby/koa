import moment from 'moment'

// 手动引入所需要的的语言包
import 'moment/locale/zh-cn'

const t = moment().format("MMM Do YY");

console.log(111)
console.log(t)