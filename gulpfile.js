var gulp = require('gulp');
var kmc = require('gulp-kmc');
var less = require('gulp-less');
var css = require('gulp-mini-css');
var kclean = require('gulp-kclean');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var src = "./src",
    dest = "./build";

//包配置
var pkg = "bee-demo";

//编译模板
gulp.task('xtpl', function() {
    gulp.src(src+"/lib/*.xtpl.html")
        .pipe(kmc.xtpl())
        .pipe(gulp.dest(src+"/lib"));
});


kmc.config({
    depFilePath:dest+'/deps.js',
    packages:[{
        name: pkg,
        ignorePackageNameInUri:true,
        combine:false,
        base: src
    }]
});

//使用kmc合并并编译kissy模块文件
function renderKmc(fileName){
    return gulp.src(src+"/"+fileName+".js")
        //转换cmd模块为kissy模块
        .pipe(kmc.convert({
            fixModuleName:true,
            ignoreFiles: ['-min.js']
        }))
        //合并文件
        .pipe(kmc.combo({
            minify: false,
            files:[{
                src: src+"/"+fileName+".js",
                dest: dest+"/"+fileName+".js"
            }]
        }))
        //优化代码
        .pipe(kclean({
            files:[{
                src:dest+"/"+fileName+'.js',
                outputModule:'bee-demo/'+fileName
            }]
        }))
        .pipe(gulp.dest(dest));
}

gulp.task('kmc', function() {
    //处理index.js
    return renderKmc('index');
});

gulp.task('uglify',['kmc'],function(){
    gulp.src([dest+'/**/*.js','!'+dest+'/**/*-min.js'])
        .pipe(uglify({output:{ascii_only:true}}))
        .pipe(rename({
            extname: "-min.js"
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('css', function(){
    gulp.src(src+'/*.less')
        .pipe(less())
        .pipe(gulp.dest(dest))
        .pipe(css({ext:'-min.css'}))
        .pipe(gulp.dest(dest));
});

gulp.task('clean', function(){
    gulp.src(dest).pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch(src+'/**/*.js', ['uglify']);
    gulp.watch(src+'/**/*.less', ['css']);
});

gulp.task('default', ['clean','uglify','css']);