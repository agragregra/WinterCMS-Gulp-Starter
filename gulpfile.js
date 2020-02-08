let preprocessor = 'sass'; // Preprocessor (sass, less, styl)
let theme        = 'demo'; // Theme folder name

let gulp         = require('gulp');
let gulpif       = require('gulp-if');
let sass         = require('gulp-sass');
let less         = require('gulp-less');
let styl         = require('gulp-stylus');
let concat       = require('gulp-concat');
let browserSync  = require('browser-sync').create();
let uglify       = require('gulp-uglify-es').default;
let autoprefixer = require('gulp-autoprefixer');
let rsync        = require('gulp-rsync');

function browsersync() {
	browserSync.init({
		server: {
			baseDir: '/',
			notify: false,
			// online: false, // Work offline without internet connection
			// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
		}
	})
}

function styles() {
	return gulp.src('themes/' + theme + '/{sass,less,styl,scss}/*.*')
	.pipe(sass({ includePaths: [__dirname + '/node_modules'] }))
	.pipe(concat('styles.min.css'))
	.pipe(autoprefixer({
		// grid: true, // Optional. Enable CSS Grid
		overrideBrowserslist: ['last 10 versions']
	}))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
}

exports.browsersync = browsersync;

