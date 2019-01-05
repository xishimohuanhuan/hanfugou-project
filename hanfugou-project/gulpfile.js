//引入
const gulp=require("gulp");
const minhtml=require(("gulp-htmlmin"));
const uglify=require("gulp-uglify");
const babel=require("gulp-babel");
const connect=require("gulp-connect");
const sass=require("gulp-sass");
const cleancss=require("gulp-clean-css");

//制定任务
gulp.task("default",function(){
	console.log(12);
})
gulp.task("html",function(){
	gulp.src("src/**/*.html")
		.pipe(minhtml({
			removeComments: true,//清除HTML注释
			collapseWhitespace: true,//压缩HTML
			collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
			removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
			/* removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css" */
			minifyJS: true,//压缩页面JS
			minifyCSS: true//压缩页面CSS 
		}))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
})
gulp.task("js",function(){
	gulp.src("src/js/**/*.js")
		.pipe(babel({
			presets: ['@babel/env']
        }))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
})
gulp.task("css",function(){
	gulp.src("src/scss/**/*.scss")
		.pipe(sass())
		.pipe(cleancss())
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
})
//移动图片
gulp.task("img",function(){
	gulp.src("src/images/**/*")
		.pipe(gulp.dest("dist/images"))
		.pipe(connect.reload());
})
//移动libs
gulp.task("libs",function(){
	gulp.src("src/libs/**/*")
		.pipe(gulp.dest("dist/libs"));
})
//启动服务
gulp.task("server",function(){
	connect.server({
		port:1800,
		root:"dist",
		livereload:true
	})
})
//监听
gulp.task("watch",function(){
	gulp.watch("src/**/*.html",["html"]);
	gulp.watch("src/js/**/*.js",["js"]);
	gulp.watch("src/scss/**/*.scss",["css"]);
	gulp.watch("src/images/**/*",["img"]);
})

gulp.task("default",["html","js","img","css","libs","server","watch"]);
