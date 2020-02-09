<h1>October CMS Gulp Starter</h1>
<p>Lightweight optimized Gulp starter for October CMS theme development with Gulp 4, Browsersync, all preprocessors (sass, scss, less, stylus), cleancss, uglify-es, autoprefixer, rsync, cache.htaccess samples for better caching and more.</p>

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
	<li><strong>Make proxy for live update with Browsersync</strong> - <code>let localhost</code></li>
	<li><strong>Simple preprocessor selection</strong> - <code>let preprocessor</code></li>
	<li></li>
</ol>
