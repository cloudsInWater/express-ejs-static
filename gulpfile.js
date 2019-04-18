var _ = require('underscore');
var moment = require('moment');
var async = require('async');
var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');        // 文件合并
var uglify  = require('gulp-uglify');       // js压缩
var minifycss = require('gulp-minify-css'); // css压缩
var csso = require('gulp-csso'); // css压缩
var upload_qiniu = require('./gulpUpload');
var less = require('gulp-less');
var watch = require('gulp-watch');
var babel = require('gulp-babel');

var mod = {};
mod.dir = moment().format("MMDDHHmmss");

gulp.task('lessCompile', function() {
    return gulp.src('./web/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./web/css'));
});
// 定义一个监控less文件变化的任务

gulp.task('lessBack',  function() {
    var  watcher = watch(['./web/less/*.less'])
    watcher.on('change',gulp.series('lessCompile'));
});

/*
* 合并压缩CSS
* */
gulp.task('css', gulp.series('lessCompile', function() {
    return gulp.src(['./web/css/index.css',])
        .pipe(csso())
        .pipe(concat('en_web.min.css'))
        .pipe(gulp.dest('./web/build/' + mod.dir + '/css'));
}));

/*
*压缩js
*/
gulp.task('min_js', function() {
    return gulp.src(['./web/lib/*', './web/js/*','!./web/js/shareJs/**/*','!./web/js/lib/swiper.js',])
        .pipe(babel({
            presets:["es2015",],
        }))
        .pipe(uglify())
        // .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./web/build/' + mod.dir + '/js/'));
});

/*
*copy js文件
*/
gulp.task('copy_share', function() {
    return gulp.src('./web/lib/*')
        .pipe(gulp.dest('./web/build/' + mod.dir + '/lib/'));
});

/*
*copy img
*/
gulp.task('copy_img', function() {
    return gulp.src('./web/img/**/*')
        .pipe(gulp.dest('./web/build/' + mod.dir + '/img'));
});

/**
 * 静态资源上传至七牛云存储空间。
 */
// var minTaskList = ['less', 'css','min_js','copy_img'];
var minTaskList = ['css','min_js','copy_img', 'copy_share',];

gulp.task('upload', gulp.series('css','min_js','copy_img', 'copy_share',function(){
    return gulp.src('./web/build/@(' + mod.dir + ')/**/*')
    // return gulp.src('./web/font/**/*')
        .pipe( upload_qiniu() );
}));

gulp.task('dev',gulp.series('lessBack',async function() {
    // environment = 'development';
    var noline = {
        "onLine": 0,
        "staticPath": "",
        "dir": "",
        "db": "mongodb://127.0.0.1:27017/ihomedb",
    };
    fs.writeFileSync('./server/config/config.dev.json', JSON.stringify(noline));
    return Promise.resolve('here is no stream ,so return a promise');
}));

gulp.task('prod',gulp.series('upload',function() {
    // environment = 'production';
    var online = {
        "onLine": 1,
        // "staticPath": "https://dn-caicloudui.qbox.me" ,     //线上环境，静态资源(js,css,img)的URL地址。如：http://static.lechange.cn
        "staticPath": "XXXXXXXXXXXXXX" ,     // 线上环境，静态资源(js,css,img)的URL地址。如：http://static.lechange.cn
        "dir": mod.dir,
        "db": "XXXXXXXXXXX",
        "urlShow":"",
    };
    fs.writeFileSync('./server/config/config.prod.json', JSON.stringify(online));
    return Promise.resolve('here is no stream ,so return a promise');
}));