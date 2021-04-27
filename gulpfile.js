var gulp  			=  	 require('gulp');
var autoprefixer  	=  	 require('gulp-autoprefixer');
var imagemin  		=  	 require('gulp-imagemin');
var rigger 	 		=  	 require('gulp-rigger');
var sass  			=  	 require('gulp-sass');
var sassImport  	=  	 require('gulp-sass-bulk-import');
var watch  			=  	 require('gulp-watch');
var browserSync  	=  	 require('browser-sync');
var cssmin 		 	= 	 require('gulp-cssmin');
var rename 			= 	 require('gulp-rename');
var clean 			= 	 require('gulp-clean');


gulp.task('html_dev_templates', function () {
    gulp.src('app/build/**/**/*.html') 
        .pipe(rigger())
        .pipe(gulp.dest('app/'));
});

gulp.task('sass', function () {
   gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
	.pipe(sassImport())
    .pipe(gulp.dest('app/css/'))
	.pipe(autoprefixer())
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('CompressImg', function() {
	gulp.src('app/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img/'));
});

gulp.task('buildCss', function() {
	gulp.src('app/css/**/*.css')
        .pipe(cssmin())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('resetDist', function () {
    gulp.src('dist')
        .pipe(clean());
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'sass', 'html_dev_templates'], function () {
	  gulp.watch('app/sass/**/*.scss', ['sass']);
	  gulp.watch('app/css/**/*.css', browserSync.reload);
	  gulp.watch('app/js/**/*.js', browserSync.reload);
	  gulp.watch('app/build/**/*.html', ['html_dev_templates', browserSync.reload]);
});

gulp.task('build', ['resetDist', 'html_dev_templates', 'sass', 'buildCss', 'CompressImg'], function() {
	var buildFonts = gulp.src([
		'app/fonts/**/*.eot',
		'app/fonts/**/*.otf',
		'app/fonts/**/*.svg',
		'app/fonts/**/*.ttf',
		'app/fonts/**/*.woff'
	])
	.pipe(gulp.dest('dist/fonts'));

	var buildHtml = gulp.src([
		'!app/includes/**/*',
		'!app/build/**/*',
		'!app/PixelPerfect/**/*',
		'app/**/*.html'
	])
	.pipe(gulp.dest('dist'));

	var buildJs = gulp.src([
		'app/js/**/*.js'
	])
	.pipe(gulp.dest('dist/js/'));
});