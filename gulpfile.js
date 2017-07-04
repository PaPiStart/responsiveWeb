/* 
 * @Author: may
 * @Last Modified time: 2017-07-04 11:39:21
 */
 'use strict';
 var gulp = require('gulp'),
 less = require('gulp-less'),
 minifycss = require('gulp-minify-css'),
 autoprefixer = require('gulp-autoprefixer'),
 uglify = require('gulp-uglify'),
 clean = require('gulp-clean'),
 browserSync = require('browser-sync'),
 changed = require('gulp-changed'),
 concat = require('gulp-concat'),
 yargs = require('yargs').argv,
 gulpIf = require('gulp-if'),
 imagemin = require('gulp-imagemin'),
 url = require('url');

 var paths = {
 	html: [
 	'src/**/*.html',
 	'src/**.php'
 	],
 	css: ['src/**/*.css'],
 	less: [
 	'src/**/*.less',
 	'src/**/*.scss',
 	'src/style/**/*.less',
 	],
 	scripts: [
 	'src/**/*.js'
 	],
 	images: [
 	'src/images/**/*'
 	],
 	fonts: [
 	'src/style/fonts/**/*'
 	],
 	video: [
 	'src/video/**/*',
 	'src/heybo/**/*',
 	'src/help/**/*',
 	],
 	heybo:[
 	
 	]
 };
 gulp.task('clean', function() {
 	return gulp.src('dist/*', {
 		read: false
 	})
 	.pipe(clean());
 });
 var option = {
 	base: 'src'
 };
var dist = 'dist'; //根目录 

//是否压缩文件
var isMini = yargs.m ? true : false;

gulp.task('html', function() {
	gulp.src(paths.html, option)
	.pipe(changed(dist))
	.pipe(gulp.dest(dist))
	// .pipe(browserSync.reload({ stream: true }));
});

gulp.task('less', function() {
	gulp.src(paths.less, option)
	.pipe(changed(dist))
	.pipe(less())
	.pipe(autoprefixer())
	.on('error', function(e) {
		console.log(e)
	})
	.pipe(gulpIf(isMini, minifycss()))
	.pipe(gulp.dest(dist))
	.pipe(browserSync.reload({ stream: true }));
});

gulp.task('css', function() {
	gulp.src(paths.css, option)
	.pipe(changed(dist))
	.pipe(gulpIf(isMini, minifycss()))
	.pipe(gulp.dest(dist))
	// .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', function() {
	gulp.src(paths.scripts, option)
	.pipe(changed(dist))
	.on('error', function(e) {
		console.log(e)
	})
	.pipe(gulpIf(isMini, uglify()))
	.pipe(gulp.dest(dist))
	// .pipe(browserSync.reload({ stream: true }));
});

gulp.task('images', function() {
	gulp.src(paths.images, option) 
	.pipe(gulpIf(isMini,imagemin()))
	.pipe(gulp.dest(dist))
	gulp.src(paths.video, option)
	.pipe(changed(dist))
	.pipe(gulp.dest(dist))
	gulp.src(paths.heybo, option)
	.pipe(changed(dist))
	.pipe(gulp.dest(dist))
	gulp.src(paths.fonts, option)
	.pipe(changed(dist))
	.pipe(gulp.dest(dist))
});

gulp.task('lib', function() {
	gulp.src([
		'bower_components/swiper/dist/css/swiper.min.css',
		'bower_components/bootstrap/dist/css/bootstrap.min.css',
		'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
		'bower_components/animate.css/animate.min.css',
		])
	.pipe(concat('bozhushou.min.css'))
	.pipe(gulp.dest(dist + "/style"));

	gulp.src('bower_components/bootstrap/dist/fonts/**')
	.pipe(gulp.dest(dist + "/style/bootstrap/fonts"));

	gulp.src([
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/swiper/dist/js/swiper.min.js',
		'bower_components/bootstrap/dist/js/bootstrap.min.js'
		// 'bower_components/waypoints/lib/jquery.waypoints.min.js'
		])
	.pipe(concat('bozhushou.min.js'))
	.pipe(gulp.dest(dist + "/lib"));
})

gulp.task('build', ['html','lib','less','scripts',  'css', 'images']);


gulp.task('watchChange', function() {
	gulp.watch([paths.less,paths.css], function(event) {
		if (event.type == 'changed' || event.type == 'added') {
			gulp.src(event.path,option)
			.pipe(less())
			.pipe(autoprefixer())
			.on('error', function(e) {
				console.log(e)
			})
			// .pipe(gulpIf(isMini, minifycss()))
			.pipe(gulp.dest(dist))
			.pipe(browserSync.stream({ stream: true }))
		}
	});

	gulp.watch(
		[paths.html,
		paths.heybo,
		paths.video,
		paths.fonts,
		// paths.lib,
	// paths.css,
	paths.scripts,
	paths.images]
	, function(event) {
		if (event.type == 'changed' || event.type == 'added') {
			gulp.src(event.path, option)
			.pipe(gulp.dest(dist))
			.pipe(browserSync.stream({ stream: true }))
		}
	})
});

gulp.task('webserver', function() {
	// var proxyOptions = null;
	// if(yargs.a) {
	// 	proxyOptions = url.parse(yargs.a);
	// } else {
	// 	proxyOptions = url.parse('');
	// }
	// proxyOptions.route = "/api";
	browserSync.init({
		server: {
			baseDir: "./dist",
		},
		ui: false,
		port: 8080
	});
	if(yargs.w) {
		gulp.start('watchChange');
	}
});

// 参数说明
//  -s: 启动服务器
//  -a: 服务器地址
//  -m: 压缩文件
//  -w: 监控文件变化
//  gulp -wm 打包
gulp.task('default', ['build'], function() {
	if(yargs.s) {
		gulp.start('webserver');
	}
});