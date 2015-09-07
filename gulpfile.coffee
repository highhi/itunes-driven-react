'use strict'

# PLUGINS
gulp 		= require 'gulp'
sync 		= require 'browser-sync'
browserify 	= require 'browserify'
babelify 	= require 'babelify'
source 		= require 'vinyl-source-stream'
buffer 		= require 'vinyl-buffer'
del 		= require 'del'
seque 		= require 'run-sequence'
$ 			= require('gulp-load-plugins')()
handleErrors = require './handleErrors'

# html minify
gulp.task 'html', ->
	gulp.src 'dev/**/*.html'
	.pipe $.plumber()
	.pipe $.minifyHtml
		conditionals : true
		quotes : true
	.pipe gulp.dest 'public'

# sass compile
gulp.task 'sass', ->
	$.rubySass 'dev/scss/',
		style : 'compressed'
		compass : true
		sourcemap: true
	.pipe $.sourcemaps.write './',
		sourceRoot : '/dev/scss/'
	.pipe gulp.dest 'public/css'

# js build
gulp.task 'browserify', ->
	browserify
		entries : ['dev/js/main.jsx']
		debug: true
	.transform(babelify)
	.bundle()
	.on('error', handleErrors)
	.pipe source 'bundle.js'
	.pipe buffer()
	.pipe $.uglify()
	.pipe gulp.dest 'public/js'

# 画像最適化
gulp.task 'images', ->
	gulp.src 'dev/img/*'
	.pipe $.changed('public/img')
	.pipe $.imagemin
		optimizationLevel : 7
		progressive : true
		interlaced : true
	.pipe gulp.dest('public/img')

# public 初期化
gulp.task 'clean', del.bind(null, ['public'])

# サーバ起動
gulp.task 'sync', ->
	sync.init null,
		server :
			baseDir : 'public'

# ブラウザオートリロード
gulp.task 'reload', ->
	sync.reload()
	
# WATCH
gulp.task 'watch', ->
	gulp.watch 'dev/**/*.html', ['html']
	gulp.watch 'dev/scss/**/*.scss', ['sass']
	gulp.watch 'dev/js/**/*.jsx', ['browserify']
	gulp.watch ['dev/img/*', '!dev/img/sprite/*'], ['images']
	gulp.watch ['public/**', '!public/**/*.map', '!public/img/*'], ['reload']

gulp.task 'init', ->
	seque 'clean', 'browserify', 'sass', ['html', 'images']

gulp.task 'default', ['sync', 'watch']