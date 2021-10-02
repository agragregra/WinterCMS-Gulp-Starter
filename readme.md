<h1>Winter CMS Gulp Starter</h1>

<p>Lightweight optimized Gulp starter for <a href="https://github.com/wintercms/winter">Winter CMS</a> theme development with Gulp 4, Webpack-stream, Babel, Browsersync, Sass, autoprefixer, rsync and more based on <a href="https://github.com/agragregra/OptimizedHTML-5">OptimizedHTML 5</a> practices.</p>

<p>
	<img src="https://raw.githubusercontent.com/agragregra/agragregra.github.com/master/images/winter-gulp-preview.jpg" alt="Optober Gulp">
</p>

<h2>Installation</h2>

<p>Run this command in the root directory of you site with remove all unnecessary (one command):</p>

<code>git init .; git remote add -f origin https://github.com/agragregra/WinterCMS-Gulp-Starter; git checkout master; git clone https://github.com/agragregra/WinterCMS-Gulp-Starter .; rm -rf trunk .gitignore readme.md .git</code>

<p>If no result, run the command twice.</p>

<h2>Winter CMS Theme Directory structure</h2>

<p>Recommends using the following base directory structure for you theme:</p>

<pre>
themes/
— mytheme/               <= Theme starts here
— — pages/               <= Pages directory
— — — home.htm
— — layouts/             <= Layouts directory
— — — default.htm
— — partials/            <= Partials directory (Optional)
— — — header.htm
— — — footer.htm
— — content/             <= Content directory
— — — intro.htm
— — assets/              <= Assets directory
— — — styles/            <= Styles directory
— — — — sass/            <= Preprocessor directory (sass, less, styl)
— — — — — theme.sass     <= Main theme style src file
— — — — — blocks/        <= Parts of styles (auto include to theme.*)
— — — css/
— — — — theme.min.css    <= Minified styles
— — — js/
— — — — theme.js         <= Main JavaScript src file
— — — — theme.min.js     <= Minified scripts
— — — images/
— — theme.yaml
</pre>

<h2>Features & Variables in gulpfile.js</h2>

<ol>
	<li>Make proxy for live development with Browsersync - <code>let <strong>localhost</strong></code></li>
	<li>Simple selection of preprocessor - <code>let <strong>preprocessor</strong></code> (sass, less or styl)</li>
	<li>Simple selection of current theme - <code>let <strong>theme</strong></code></li>
	<li>Simple selection of file extensions to watch & reload - <code>let <strong>fileswatch</strong></code></li>
	<li>Better CSS - <code>sass, less, styl, gulp-clean-css, gulp-autoprefixer</code>. <br>Importing framework extras CSS into "{theme}/assets/styles/{preprocessor}/theme.*" file</li>
	<li>Better JS - <code>Webpack+Babel</code>. Best javascript practices.</li>
	<li>Better deploy with <code>gulp-rsync</code></li>
</ol>

<h2>Exported Gulp Task</h2>

<ul>
	<li><strong>scripts</strong> - Bundling & minify with Webpack + Babel</li>
	<li><strong>styles</strong> - Compile and concat CSS with selected preprocessor</li>
	<li><strong>deploy</strong> - deploy changes on server with gulp-rsync</li>
	<li><strong>assets</strong> - Compile assets (CSS & JS)</li>
	<li><strong>gulp</strong> - The default command to start the environment</li>
</ul>
