// VARIABLES & PATHS

let localhost    = 'october.loc:8080', // Local domain
    preprocessor = 'sass', // Preprocessor (sass, scss, less, styl) / Preprocessor folder name / Module require const name. Example: themes/mytheme/assets/scss/
    theme        = 'mytheme', // Theme folder name
    fileswatch   = 'html,htm,php,txt,yaml,twig,json,md', // List of files extensions for watching & hard reload (comma separated)
    online       = true; // If «false» - Browsersync will work offline without internet connection

let paths = {

	scripts: [
		// 'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
		// 'themes/' + theme + '/assets/vendor/lazyload/lazyload.js', // Vendor script plugin example
		// 'modules/system/assets/js/framework.js', // {% framework extras %}
		// 'modules/system/assets/js/framework.extras.js', // {% framework extras %}
		// 'plugins/nms/plugin/assets/js/plugin.js', // Plugin script example
		'themes/' + theme + '/assets/js/app.js' // Theme app.js. Always at the end
	],

	deploy: {
		hostname:    'username@yousite.com', // Deploy hostname
		destination: 'yousite/public_html/', // Deploy destination
		include:     [/* '*.htaccess' */], // Included files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store', '**/*.sqlite'], // Excluded files from deploy
	},

}

// LOGIC

const { src, dest, parallel, series, watch } = require('gulp');
const sass         = require('gulp-sass');
const scss         = require('gulp-sass');
const less         = require('gulp-less');
const styl         = require('gulp-stylus');
const cleancss     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const rsync        = require('gulp-rsync');

function browsersync() {
	browserSync.init({
		proxy: localhost,
		notify: false,
		online: online
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
	return src(paths.scripts)
	.pipe(concat('theme.min.js'))
	.pipe(uglify())
	.pipe(dest('themes/' + theme + '/assets/js'))
	.pipe(browserSync.stream())
}

function deploy() {
	return src('/')
	.pipe(rsync({
		root: '/',
		hostname: paths.deploy.hostname,
		destination: paths.deploy.destination,
		include: paths.deploy.include,
		exclude: paths.deploy.exclude,
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
}

function startwatch() {
	watch('themes/' + theme + '/assets/' + preprocessor + '/**/*', styles);
	watch(['themes/'  + theme + '/assets/js/**/*.js', '!themes/' + theme + '/assets/js/*.min.js', 'themes/'  + theme + '/assets/vendor/**/*.js'], scripts);
	watch(['themes/' + theme + '/**/*.{' + fileswatch + '}', 'plugins/**/*.{' + fileswatch + '}']).on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.assets      = parallel(styles, scripts);
exports.styles      = styles;
exports.scripts     = scripts;
exports.deploy      = deploy;
exports.default     = parallel(styles, scripts, browsersync, startwatch);
