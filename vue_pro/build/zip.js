var fs = require('fs')
var archiver = require('archiver')
var output = fs.createWriteStream(require('path').join(__dirname,'../') + '/test.zip')
var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
})

archive.pipe(output)

archive.directory(require('path').join(__dirname,'../dist/'))

archive.finalize()