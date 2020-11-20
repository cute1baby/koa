var gulp = require('gulp')
var sftp = require('gulp-sftp')
var sftpConfig = {
    host: '62.234.192.179',
    port: 22,
    user: 'root',
    pass: 'Mm**',
    remotePath: '/home/vue_pro'
  }

// var sftpConfig = require('./project.config.js').sftpConfig

gulp.task('upload', function() {
  return gulp.src('dist/**')
    .pipe(sftp(sftpConfig))
})