var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var path = require('path');
var watchify = require('watchify');
var gutil = require('gulp-util');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var glob = require('glob');
var es = require('event-stream');

gulp.task('webserver', function() {
    connect.server({
        port:9987,
        livereload: false
    });
});

/* 这个任务不再需要了，目前系统只拥有一个css的入口，就是wei.less，作为主入口，通过这个主入口，
  import其他所有的less文件，在系统的layout中统一引用*/
gulp.task('less', function() {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(rename({
            dirname:'/',
            extname:'.min.css'
        }))
        .pipe(gulp.dest('css/'))
        .pipe(connect.reload());
});

gulp.task('lessWei', function(){
    gulp.src('less/wei.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(rename({
            dirname:'/',
            extname:'.min.css'
        }))
        .pipe(gulp.dest('css'))
        .pipe(connect.reload());
    gulp.src('less/layout.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(rename({
            dirname:'/',
            extname:'.min.css'
        }))
        .pipe(gulp.dest('css'))
        .pipe(connect.reload());
});

gulp.task('watchLess', function() {
    gulp.watch('less/*.less', ['lessWei']);
});

/* 这个browserify暂时也不需要用了，系统还不需要这么复杂的压缩机制，只需要使用最简单的require就可以 */

gulp.task('browserify', function(done) {
    glob('./src/**.js', function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry))
                .pipe(rename({
                    dirname:'/',
                    extname: '.min.js'
                }))
                .pipe(gulp.dest('./assets/js/'));
        });
        es.merge(tasks).on('end', done);
    });
});

gulp.task('watchBrowserify', function() {
    gulp.watch('src/**/*', ['browserify']);
});

gulp.task('default', ['lessWei', 'watchLess']);