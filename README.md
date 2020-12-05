<h1>October CMS Gulp Starter</h1>

<p>Lightweight optimized Gulp starter for October CMS theme development with Gulp 4, Webpack-stream, Babel, Browsersync, Sass, autoprefixer, rsync and more.</p>

<p>
	<img src="https://raw.githubusercontent.com/agragregra/agragregra.github.com/master/images/october-gulp-preview.jpg" alt="Optober Gulp">
</p>

<h2>Installation</h2>

<p>Run this in the root directory of you site <strong>with a dot</strong> at the end:</p>

<code>git clone https://github.com/agragregra/OctoberCMS-Gulp-Starter .</code>

<p>Clone with remove all unnecessary (one command):</p>

<code>git clone https://github.com/agragregra/OctoberCMS-Gulp-Starter .; rm -rf trunk .gitignore readme.md .git</code>

<h2>October CMS Theme Directory structure</h2>

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
— — — styles/
— — — — theme.sass       <= Main style src file
— — — — dist/
— — — — — theme.min.css  <= Minified styles
— — — scripts/
— — — — theme.js         <= Main JavaScript src file
— — — — dist/
— — — — — theme.min.js   <= Minified scripts
— — — images/
— — theme.yaml
</pre>

<h2>Starter Features & Variables in gulpfile.js</h2>

<ol>
	<li><strong>Make proxy for live development with Browsersync</strong> - <code>let <strong>localhost</strong></code></li>
	<li><strong>Simple selection of the current theme</strong> - <code>let <strong>theme</strong></code></li>
	<li><strong>Simple selection of file extensions to watch & reload</strong> - <code>let <strong>fileswatch</strong></code></li>
	<li><strong>Better CSS</strong> - <code>sass, gulp-autoprefixer</code>. Importing framework extras CSS into theme.sass file</li>
	<li><strong>Better JS</strong> - <code>Webpack+Babel</code>. Best javascript import/require practices.</li>
	<li><strong>Better deploy with</strong> <code>gulp-rsync</code></li>
</ol>

<h2>Exported Gulp Task</h2>

<ul>
	<li><strong>scripts</strong> - Bundling & minify with Webpack + Babel</li>
	<li><strong>styles</strong> - Compile and concat CSS with selected preprocessor</li>
	<li><strong>deploy</strong> - deploy changes on server with gulp-rsync</li>
	<li><strong>assets</strong> - Compile assets (CSS & JS)</li>
	<li><strong>gulp</strong> - The default command to start the environment</li>
</ul>
