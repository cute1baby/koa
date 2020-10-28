var gulp = require('gulp')
var sftp = require('gulp-sftp')
var sftpConfig = require('./project.config.js').sftpConfig

gulp.task('upload', function() {
  return gulp.src('dist/**')
    .pipe(sftp(sftpConfig))
})