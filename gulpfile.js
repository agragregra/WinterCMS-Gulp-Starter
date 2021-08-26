let localhost    = 'localhost', // Local domain
		preprocessor = 'sass', // Preprocessor (sass, less, styl); 'sass' also work with the Scss syntax in blocks/ folder.
		theme        = 'mytheme', // Theme folder name
		fileswatch   = 'html,htm,php,txt,yaml,twig,json,md' // List of files extensions for watching & hard reload (comma separated)

import pkg from 'gulp'
const { gulp, src, dest, parallel, series, watch } = pkg

import browserSync   from 'browser-sync'
import webpackStream from 'webpack-stream'
import webpack       from 'webpack'
import TerserPlugin  from 'terser-webpack-plugin'
import gulpSass      from 'gulp-sass'
import dartSass      from 'sass'
import sassglob      from 'gulp-sass-glob'
const  sass          = gulpSass(dartSass)
import less          from 'gulp-less'
import lessglob      from 'gulp-less-glob'
import styl          from 'gulp-stylus'
import stylglob      from 'gulp-noop'
import postCss       from 'gulp-postcss'
import cssnano       from 'cssnano'
import autoprefixer  from 'autoprefixer'
import concat        from 'gulp-concat'
import rsync         from 'gulp-rsync'

function browsersync() {
	browserSync.init({
		proxy: localhost,
		notify: false,
		online: true
	})
}

function scripts() {
	return src(`themes/${theme}/assets/js/theme.js`)
	.pipe(webpackStream({
		mode: 'production',
		performance: { hints: false },
		plugins: [
			new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }), // jQuery (npm i jquery)
		],
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: ['babel-plugin-root-import']
						}
					}
				}
			]
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					terserOptions: { format: { comments: false } },
					extractComments: false
				})
			]
		},
	}, webpack)).on('error', function handleError() {
		this.emit('end')
	})
	.pipe(concat('theme.min.js'))
	.pipe(dest(`themes/${theme}/assets/js`))
	.pipe(browserSync.stream())
}

function styles() {
	return src([`themes/${theme}/assets/styles/${preprocessor}/theme.*`, `!themes/${theme}/assets/styles/${preprocessor}/_*.*`])
	.pipe(eval(`${preprocessor}glob`)())
	.pipe(eval(preprocessor)())
	.pipe(postCss([
		autoprefixer({ grid: 'autoplace' }),
		cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
	]))
	.pipe(concat({ suffix: '.min' }))
	.pipe(dest(`themes/${theme}/assets/css`))
	.pipe(browserSync.stream())
}

function deploy() {
	return src('./')
	.pipe(rsync({
		root: './',
		hostname: 'username@yousite.com', // Deploy hostname
		destination: 'yousite/public_html/', // Deploy destination
		clean: true,
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
			'.git',
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

export { scripts, styles, deploy }
export let assets = parallel(scripts, styles)
export default series(scripts, styles, parallel(browsersync, startwatch))
