// 返回成功的基础数据
const successRes = (data, message='操作成功', status=0) => {
    return {
        success: true,
        message: message,
        data,
        status
    }
}

// 返回失败的基础数据
const failRes = (message='操作失败', status=500) => {
    return {
        success: false,
        message: message,
        status
    }
}

module.exports = {
    successRes,
    failRes
}