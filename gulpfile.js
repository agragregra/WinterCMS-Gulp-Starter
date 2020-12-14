let localhost    = 'localhost', // Local domain
		preprocessor = 'sass', // Preprocessor (sass, less, styl); 'sass' also work with the Scss syntax in blocks/ folder.
		theme        = 'mytheme', // Theme folder name
		fileswatch   = 'html,htm,php,txt,yaml,twig,json,md' // List of files extensions for watching & hard reload (comma separated)

const { src, dest, parallel, series, watch } = require('gulp')
const browserSync  = require('browser-sync').create()
const webpack      = require('webpack-stream')
const sass         = require('gulp-sass')
const sassglob     = require('gulp-sass-glob')
const less         = require('gulp-less')
const lessglob     = require('gulp-less-glob')
const styl         = require('gulp-stylus')
const stylglob     = require("gulp-empty")
const cleancss     = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const rename       = require('gulp-rename')
const rsync        = require('gulp-rsync')

function browsersync() {
	browserSync.init({
		proxy: localhost,
		notify: false,
		online: true
	})
}

function scripts() {
	return src(`themes/${theme}/assets/js/theme.js`)
	.pipe(webpack({
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /(node_modules)/,
					loader: 'babel-loader',
					query: {
						presets: ['@babel/env'],
						plugins: ['babel-plugin-root-import']
					}
				}
			]
		}
	})).on('error', function handleError() {
		this.emit('end')
	})
	.pipe(rename('theme.min.js'))
	.pipe(dest(`themes/${theme}/assets/js`))
	.pipe(browserSync.stream())
}

function styles() {
	return src([`themes/${theme}/assets/styles/${preprocessor}/theme.*`, `!themes/${theme}/assets/styles/${preprocessor}/_*.*`])
	.pipe(eval(`${preprocessor}glob`)())
	.pipe(eval(preprocessor)())
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss({ level: { 1: { specialComments: 0 } },/* format: 'beautify' */ }))
	.pipe(rename({ suffix: ".min" }))
	.pipe(dest(`themes/${theme}/assets/css`))
	.pipe(browserSync.stream())
}

function deploy() {
	return src('./')
	.pipe(rsync({
		root: './',
		hostname: 'username@yousite.com', // Deploy hostname
		destination: 'yousite/public_html/', // Deploy destination
		include: [ '*.htaccess', ], // Included files to deploy
		exclude: [ // Excluded files from deploy
			// '.htaccess',
			// 'storage/*.sqlite',
			'**/Thumbs.db',
			'**/*.DS_Store',
			'node_modules',
			'gulpfile.js',
			'package.json',
			'package-lock.json',
			'npm-debug.log',
			'debug.log',
			`themes/${theme}/assets/js/theme.js`,
			`themes/${theme}/assets/sass`,
		],
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
}

function startwatch() {
	watch(`themes/${theme}/assets/styles/${preprocessor}/**/*`, { usePolling: true }, styles)
	watch([`themes/${theme}/assets/js/**/*.js`, `!themes/${theme}/assets/js/*.min.js`], { usePolling: true }, scripts)
	watch([`themes/${theme}/**/*.{${fileswatch}}`, `plugins/**/*.{${fileswatch}}`], { usePolling: true }).on('change', browserSync.reload)
}

exports.scripts     = scripts;
exports.styles      = styles;
exports.deploy      = deploy;
exports.assets      = parallel(scripts, styles);
exports.default     = series(scripts, styles, parallel(browsersync, startwatch));
