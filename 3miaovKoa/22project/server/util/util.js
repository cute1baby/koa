const crypto = require('crypto')

// 使用md5加密的方法
module.exports = (encryptString) => {
    return crypto.createHash('md5').update(String(encryptString)).digest('hex');
}

