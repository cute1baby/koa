const fs = require('fs')

try{
    const files = fs.readdirSync('F:');
    console.log(files);
}catch(err){
    console.log(err)
}
