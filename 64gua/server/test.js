const fs = require('fs')

const file = fs.readFileSync('./test.json')
const arr = JSON.parse(file.toString())
const arr1 = arr.filter(item => item.contentId < 10)

console.log(arr1.length)
