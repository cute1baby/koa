// 导出文变量
exports.value = "苗伟";

const name = "haha";
const age = 10;
const hobby = "music, rap";
const cacalate = (a, b) => {
    console.log(parseInt(a + b))
}

// 可以通过exports.a
exports.module = {
    name,
    age,
    hobby,
    handleCul: cacalate
}