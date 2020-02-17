let localhost    = 'october.loc:8888' // Local domain
let preprocessor = 'sass'; // Preprocessor (sass, scss, less, styl) / Preprocessor folder name / Module require const name. Example: themes/mytheme/assets/scss/
let theme        = 'mytheme'; // Theme folder name
let jsfolder     = 'js'; // Preferred JavaScript folder name (js, javascript, etc.) in theme assets directory. Default: themes/mytheme/assets/js/
let fileswatch   = 'html,htm,php,txt,yaml,twig,json,md'; // List of files extensions for watching & hard reload (comma separated)

const { src, dest, parallel, series, watch } = require('gulp');
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
		notify: false,
		// online: false, // Work offline without internet connection
	})
}

function styles() {
	return src('themes/' + theme + '/assets/' + preprocessor + '/*')
	.pipe(eval(preprocessor)())
	.pipe(concat('theme.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
	.pipe(dest('themes/' + theme + '/assets/css'))
	.pipe(browserSync.stream())
}

function scripts() {
	return src([
		// 'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
		// 'themes/' + theme + '/assets/vendor/lazyload/lazyload.js', // Vendor script plugin example
		// 'modules/system/assets/js/framework.js', // {% framework extras %}
		// 'modules/system/assets/js/framework.extras.js', // {% framework extras %}
		'themes/' + theme + '/assets/' + jsfolder + '/app.js' // Theme app.js. Always at the end
		])
	.pipe(concat('theme.min.js'))
	.pipe(uglify()) // Minify JS (opt.)
	.pipe(dest('themes/' + theme + '/assets/' + jsfolder + ''))
	.pipe(browserSync.stream())
}

function deploy() {
	return src('/')
	.pipe(rsync({
		root: '/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Included files
		exclude: ['**/Thumbs.db', '**/*.DS_Store', '**/*.sqlite'], // Excluded files
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
}

function startwatch() {
	watch('themes/' + theme + '/assets/' + preprocessor + '/*', parallel('styles'));
	watch([
		'themes/' + theme + '/assets/' + jsfolder + '/**/*.js',
		'!themes/' + theme + '/assets/' + jsfolder + '/*.min.js',
		'themes/' + theme + '/assets/vendor/**/*.js'], parallel('scripts'));
	watch([
		'themes/' + theme + '/**/*.{' + fileswatch + '}',
		'plugins/**/*.{' + fileswatch + '}'
		]).on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.assets      = parallel(styles, scripts);
exports.styles      = styles;
exports.scripts     = scripts;
exports.deploy      = deploy;
exports.default     = parallel(styles, scripts, browsersync, startwatch);
