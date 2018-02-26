var gulp = require('gulp'),
	
	argv = require('optimist').argv,
	/*
	argv.project --project
	argv.port --port
	*/
	
	autoprefixer = require('gulp-autoprefixer'),		// префиксы для css
	browserSync = require('browser-sync').create(),		// перезагрузка браузера
	reload = browserSync.reload,
	concat = require('gulp-concat'),					// склейка файлов
	less = require('gulp-less'),						// LESS
	//sass = require('gulp-sass'),
	//minifyCss = require('gulp-minify-css'),			// минификация css
	cleanCSS = require('gulp-clean-css'),				// минификация css
	//myth = require('gulp-myth'),						// префиксы для css - по умолчанию не установлен
	inlineCss = require('gulp-inline-css'),				// установка инлайновых стилей для верстки писем
	rename = require('gulp-rename'),					// переименование файлов
	uglify = require('gulp-uglify'),					// сжатие js
	watch = require('gulp-watch'),						// наблюдение за изменением файловой системы
	tinypng = require('gulp-tinypng-compress');			// сжатие изображений через https://tinypng.com
	cache = require('gulp-cache'),						// кеширование
	plumber = require('gulp-plumber'),					// отлов ошибок
	pagebuilder2 = require('gulp-pagebuilder2');		// умный инклуд html с поддержкой вложенности и передачей параметров
	fontgen = require('gulp-fontgen');					// конвертация шрифтов

	//svg sprite
	svgSprite = require('gulp-svg-sprite'),				// создание спрайта	
	svgmin = require('gulp-svgmin'),					// минификация SVG
	cheerio = require('gulp-cheerio'),					// удаление лишних атрибутов из svg
	replace = require('gulp-replace');					// фиксинг багов

	//imagemin = require('gulp-imagemin'),				// сжатие изображений
	//realFavicon = require ('gulp-real-favicon');		// создание кросплатформенного favicon	
	//mmq = require('gulp-merge-media-queries');		// склейка медиа запросов
	//ttf2woff = require('gulp-ttf2woff');				// конвертация шрифтов из ttf в woff 
	//ttf2woff2 = require('gulp-ttf2woff2');			// конвертация шрифтов из ttf в woff2

	//uncss = require('gulp-uncss');		
	//htmlhint = require("gulp-htmlhint");			
 

var root = 'projects/' + (argv.project || 'test'),
	src = root + '/' + 'src',
	fish = require('./' + root + '/json/content/fish.json');

var path = {
	build : {
		root : root,
		html : root,
		css : root + '/css',
		js : root + '/js',
		img : root + '/img',
		fonts : root + '/fonts',
		svg : root + '/img/svg',
		//favicon : root + '/favicon',
	},
	src : {
		root : src,
		html : src + '/html',
		css : src + '/css',
		js : src + '/js',
		img : src + '/img',
		fonts : src + '/fonts',
		svg : src + '/svg',
		//favicon : src + '/favicon',
		_ : src + '/_',
	},
	block : {
		root : root + '/src/block',
	}
};


gulp.task('default',
[
	'server',
	'dev',
]);
gulp.task('dev',
[
	'dev:html',
	'dev:plugin:js',
	'dev:body.on:js',
	'dev:document-ready:js',
	'dev:window-resize:js',
	'dev:window-scroll:js',
	'dev:body.changeClass:js',
	'dev:changeClass:js',
	'dev:js',
	'dev:block:less',
	'dev:css',
	//'dev:css2',
	'dev:email',
	'dev:img',
	'dev:fonts',
	'dev:svg',
	//'dev:favicon',
]);

gulp.task('server', function(){
	browserSync.init({
		server : path.build.root,
		port : parseInt(argv.port) || 10080,
		ui : {
			port : parseInt(argv.port) + 1 || 10081,
		}
	});
	gulp.watch(path.block.root + '/**/.html', ['dev:html']);
	gulp.watch(path.block.root + '/**/*.html', ['dev:html']);
	gulp.watch(path.src.html + '/**/*.html', ['dev:html']);
	gulp.watch(path.src.html + '/**/*.email.html', ['dev:email']);
	
	gulp.watch(path.block.root + '/**/.plugin.js', ['dev:plugin:js']);
	gulp.watch(path.block.root + '/**/body.on.js', ['dev:body.on:js']);
	gulp.watch(path.block.root + '/**/.document-ready.js', ['dev:document-ready:js']);
	gulp.watch(path.block.root + '/**/.window-resize.js', ['dev:window-resize:js']);
	gulp.watch(path.block.root + '/**/.window-scroll.js', ['dev:window-scroll:js']);
	gulp.watch(path.block.root + '/**/body.changeClass.js', ['dev:body.changeClass:js']);
	gulp.watch(path.block.root + '/**/.changeClass.js', ['dev:changeClass:js']);
	
	gulp.watch(path.src._ + '/concat.plugin.js', ['dev:js']);
	gulp.watch(path.src._ + '/concat.body.on.js', ['dev:js']);
	gulp.watch(path.src._ + '/concat.document-ready.js', ['dev:js']);
	gulp.watch(path.src._ + '/concat.window-resize.js', ['dev:js']);
	gulp.watch(path.src._ + '/concat.window-scroll.js', ['dev:js']);
	gulp.watch(path.src._ + '/concat.body.changeClass.js', ['dev:js']);
	gulp.watch(path.src._ + '/concat.changeClass.js', ['dev:js']);
	gulp.watch(path.src.js + '/**/*.js', ['dev:js']);
	
	
	gulp.watch(path.src.css + '/**/*.less', ['dev:css','dev:email']);
	gulp.watch(path.block.root + '/**/.less', ['dev:block:less']);
	
	//gulp.watch(path.src.css + '/**/*.scss', ['dev:css2']);
	//gulp.watch(path.block.root + '/**/.scss', ['dev:block:sass']);

	gulp.watch(path.src._ + '/concat.block.less', ['dev:css','dev:email']);
	//gulp.watch(path.src._ + '/concat.block.scss', ['dev:css2']);
	
	gulp.watch(path.src.img + '/**/*', ['dev:img']);
	gulp.watch(path.src.fonts + '/**/*', ['dev:fonts']);
	gulp.watch(path.src.svg + '/**/*', ['dev:svg']);
	//gulp.watch(path.src.favicon + '/**/*', ['dev:favicon']);
		
});

gulp.task('dev:html', function(){
	return gulp.src(path.src.html + '/**/*.html')
		.pipe(plumber())
		.pipe(pagebuilder2(path.build.root, fish))
		.pipe(gulp.dest(path.build.html))

		//.pipe(htmlhint())
		//.pipe(htmlhint.reporter())

		.pipe(reload({stream : true,}))
	;
});
gulp.task('dev:svg', function () {
	return gulp.src(path.src.svg + '/**/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {pretty: true}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				//$('[fill]').removeAttr('fill');
				//$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
				$('[id]').removeAttr('id');
				$('[class]').removeAttr('class');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					render: {
						less: {
							dest: '../../../src/css/site/sprite.less',
							template: path.src.css + "/site/sprite_template.less"
						}

					}
				}
			}
		}))
		.pipe(gulp.dest(path.build.svg));
});

gulp.task('dev:js', function(){
	return gulp.src(path.src.js + '/**/*.js')
		.pipe(plumber())
		.pipe(pagebuilder2(path.build.root, fish))
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream : true,}))
	;
});

gulp.task('dev:plugin:js', function(){
	return gulp.src(path.block.root + '/**/.plugin.js')
		.pipe(plumber())
		.pipe(pagebuilder2(path.build.root, fish))
		.pipe(uglify())
		.pipe(concat('concat.plugin.js'))
		.pipe(gulp.dest(path.src._))
	;
});

gulp.task('dev:body.on:js', function(){
	return gulp.src(path.block.root + '/**/body.on.js')
		.pipe(plumber())
		.pipe(pagebuilder2(path.build.root, fish))
		.pipe(uglify())
		.pipe(concat('concat.body.on.js'))
		.pipe(gulp.dest(path.src._))
	;
});

gulp.task('dev:document-ready:js', function(){
	return gulp.src(path.block.root + '/**/.document-ready.js')
		.pipe(plumber())
		.pipe(pagebuilder2(path.build.root, fish))
		.pipe(uglify())
		.pipe(concat('concat.document-ready.js'))
		.pipe(gulp.dest(path.src._))
	;
});

gulp.task('dev:window-resize:js', function(){
	return gulp.src(path.block.root + '/**/.window-resize.js')
		.pipe(plumber())
		.pipe(pagebuilder2(path.build.root, fish))
		.pipe(uglify())
		.pipe(concat('concat.window-resize.js'))
		.pipe(gulp.dest(path.src._))
	;
});

gulp.task('dev:window-scroll:js', function(){
	return gulp.src(path.block.root + '/**/.window-scroll.js')
		.pipe(plumber())
		.pipe(pagebuilder2(path.build.root, fish))
		.pipe(uglify())
		.pipe(concat('concat.window-scroll.js'))
		.pipe(gulp.dest(path.src._))
	;
});

gulp.task('dev:body.changeClass:js', function(){
	return gulp.src(path.block.root + '/**/body.changeClass.js')
		.pipe(plumber())
		.pipe(pagebuilder2(path.build.root, fish))
		.pipe(uglify())
		.pipe(concat('concat.body.changeClass.js'))
		.pipe(gulp.dest(path.src._))
	;
});

gulp.task('dev:changeClass:js', function(){
	return gulp.src(path.block.root + '/**/.changeClass.js')
		.pipe(plumber())
		.pipe(pagebuilder2(path.build.root, fish))
		.pipe(uglify())
		.pipe(concat('concat.changeClass.js'))
		.pipe(gulp.dest(path.src._))
	;
});

gulp.task('dev:css', function(){
	return gulp.src(path.src.css + '/*.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['> 2% in RU', 'last 4 version', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],	//last 2 versions '> 0%'
			cascade: true,
		}))
		.pipe(cleanCSS())
		//.pipe(mmq({log: true}))
		//.pipe(minifyCss())

		/*
		uncss
		.pipe(uncss({
            html: [path.build.html + '/*.html']
        }))
        .pipe(rename({suffix: '.uncss'}))
        */
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream : true,}))
	;
});

// gulp.task('dev:css2', function(){
// 	return gulp.src(path.src.css + '/*.scss')
// 		.pipe(plumber())
// 		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
// 		.pipe(autoprefixer({
// 			browsers: ['> 2% in RU', 'last 4 version', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],	//last 2 versions '> 0%'
// 			cascade: true,
// 		}))
// 		.pipe(cleanCSS())
// 		//.pipe(minifyCss())
// 		.pipe(gulp.dest(path.build.css))
// 		.pipe(reload({stream : true,}))
// 	;
// });

gulp.task('dev:block:less', function(){
	return gulp.src(path.block.root + '/**/.less')
		.pipe(plumber())
		//.pipe(pagebuilder2(path.build.root, fish))
		.pipe(concat('concat.block.less'))
		.pipe(gulp.dest(path.src._))
		//.pipe(reload({stream : true,}))
	;
});
// gulp.task('dev:block:sass', function(){
// 	return gulp.src(path.block.root + '/**/.scss')
// 		.pipe(plumber())
// 		//.pipe(pagebuilder2(path.build.root, fish))
// 		.pipe(concat('concat.block.scss'))
// 		.pipe(gulp.dest(path.src._))
// 		//.pipe(reload({stream : true,}))
// 	;
// });
gulp.task('dev:email', function(){
	return gulp.src(path.src.html + '/**/*.email.html')
		.pipe(plumber())
		.pipe(pagebuilder2(path.build.root, fish))
		.pipe(inlineCss({
			applyStyleTags: true,
			applyLinkTags: true,
			removeStyleTags: true,
			removeLinkTags: true,
		}))
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream : true,}))
	;
});

 
gulp.task('dev:img', function () {
    gulp.src(path.src.img + '/**/*.{png,jpg,jpeg}')
    	.pipe(plumber())
        .pipe(tinypng({
            key: 'D1yA1guKp9tcg4ShSoqOp21ctuI89G6S', //tN4hKBeysODqiZ5yNUvMcvINQn0KdEej
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('dev:fonts', function() {
  	return gulp
  			.src(path.src.fonts + "/*.{ttf,otf}")
  			.pipe(plumber())
    		.pipe(fontgen({dest: path.build.fonts}))
});


//
//gulp.task('dev:img', function() {
//	return gulp.src(path.src.img + '/**/*')
//		.pipe(plumber())
//		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))) //cache
//		.pipe(gulp.dest(path.build.img))
//	;
//});