<h1>October CMS Gulp Starter</h1>

<p>Lightweight optimized Gulp starter for October CMS theme development with Gulp 4, Browsersync, preprocessors (sass, scss, less, stylus), cleancss, uglify-es, autoprefixer, rsync and more.</p>

<p>
	<img src="https://raw.githubusercontent.com/agragregra/agragregra.github.com/master/images/october-gulp-preview.jpg" alt="Optober Gulp">
</p>

<h2>Installation</h2>

<p>Run this in the root directory of the site with a dot at the end:<br>
<code>git clone https://github.com/agragregra/OctoberCMS-Gulp-Starter .</code></p>

<h2>October CMS Theme Directory structure</h2>

<p>Recommends using the following base directory structure for you theme:</p>

<pre>
themes/
— themename/           <= Theme starts here
— — pages/             <= Pages directory
— — — home.htm
— — layouts/           <= Layouts directory
— — — default.htm
— — partials/          <= Partials directory (Optional)
— — — sidebar.htm
— — content/           <= Content directory
— — — intro.htm
— — assets/            <= Assets directory
— — — css/
— — — — theme.min.css  <= Minified styles
— — — js/
— — — — app.js         <= Main user JavaScript file
— — — — theme.min.js   <= Minified scripts
— — — images/
— — — sass/            <= Preprocessor folder (Maybe sass, scss, less, styl)
— — — — theme.sass     <= Main user Sass file (Maybe theme.sass, theme.scss, theme.less or theme.styl)
— — — vendor/          <= Vendor scripts or styles (For example - jQuery, Bootstrap, etc..)
— — theme.yaml
</pre>

<h2>Starter Features & Variables in gulpfile.js</h2>

<ol>
	<li><strong>Make proxy for live development with Browsersync</strong> - <code>let localhost</code></li>
	<li><strong>Simple preprocessor selection (sass, scss, less, styl)</strong> - <code>let preprocessor</code></li>
	<li><strong>Simple selection of the current theme</strong> - <code>let theme</code></li>
	<li><strong>Simple selection of file extensions to watch & reload</strong> - <code>let fileswatch</code></li>
	<li><strong>Better CSS</strong> - <code>gulp-clean-css, gulp-autoprefixer</code></li>
	<li><strong>Better JS</strong> - <code>gulp-uglify-es</code>. Vendor scripts plug into scripts functions.</li>
	<li><strong>Better deploy with rsync</strong> - <code>gulp-rsync</code></li>
</ol>

<h2>Exported Gulp Task</h2>

<ul>
	<li><strong>browsersync</strong></li>
	<li><strong>assets</strong> - Compile assets (CSS & JS)</li>
	<li><strong>styles</strong> - Compile and concat CSS with selected preprocessor</li>
	<li><strong>scripts</strong> - Compile, minify and concat JS with gulp-uglify-es & gulp-concat</li>
	<li><strong>deploy</strong> - deploy changes on server with gulp-rsync</li>
	<li><strong>gulp</strong> - The default command to start the environment</li>
</ul>
