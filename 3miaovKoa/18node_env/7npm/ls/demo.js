const fs = require('fs')

try{
    const files = fs.readdirSync('D:');
    console.log(__dirname);
}catch(err){
    console.log(err)
}
