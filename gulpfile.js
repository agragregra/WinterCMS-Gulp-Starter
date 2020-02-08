let localhost    = 'october.loc:8888' // Local domain
let preprocessor = 'less'; // Preprocessor (sass, scss, less, styl) / preprocessor folder name / require const name
let theme        = 'demo'; // Theme folder name
let fileswatch   = 'html,htm,txt,yaml,twig,json,md' // List of files extensions for watching & hard reload (comma separated)

const { src, dest, parallel, watch } = require('gulp');
const sass           = require('gulp-sass');
const scss           = require('gulp-sass');
const less           = require('gulp-less');
const styl           = require('gulp-stylus');
const cleancss       = require('gulp-clean-css');
const concat         = require('gulp-concat');
const browserSync    = require('browser-sync').create();
const uglify         = require('gulp-uglify-es').default;
const autoprefixer   = require('gulp-autoprefixer');
const rsync          = require('gulp-rsync');

function browsersync() {
	browserSync.init({
		proxy: localhost,
		// notify: false,
		// online: false, // Work offline without internet connection
	})
}

function styles() {
	return src('themes/' + theme + '/assets/' + preprocessor + '/*.*')
	.pipe(eval(preprocessor)())
	.pipe(concat('theme.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
	.pipe(dest('themes/' + theme + '/assets/css'))
	.pipe(browserSync.stream())
}

function scripts() {
	return src([
		// 'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
		'themes/' + theme + '/assets/vendor/lazyload.js', // Vendor scripts
		'themes/' + theme + '/assets/javascript/app.js' // Theme app.js. Always at the end
		])
	.pipe(concat('theme.min.js'))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(dest('themes/' + theme + '/assets/javascript'))
	.pipe(browserSync.stream())
}

function deploy() {
	return src('/')
	.pipe(rsync({
		root: '/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Included files
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
}

function startwatch() {
	watch('themes/' + theme + '/assets/' + preprocessor + '/*.*', parallel('styles'));
	watch(['themes/' + theme + '/assets/javascript/app.js', 'themes/' + theme + '/assets/vendor/**/*.js'], parallel('scripts'));
	watch('themes/' + theme + '/**/*.{' + fileswatch + '}').on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.styles      = styles;
exports.scripts     = scripts;
exports.deploy      = deploy;
exports.default     = parallel(styles, scripts, browsersync, startwatch);
