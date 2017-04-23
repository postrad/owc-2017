/* eslint no-console: 0 */

// ==== CONFIGURATION ==== //

// Project paths
const project = 'connectwc'; // The directory name for your theme; change this at the very least!
const src = './src/'; // The raw material of your theme: custom scripts, SCSS source files, PHP files, images, etc.; do not delete this folder!
const build = './build/'; // A temporary directory containing a development version of your theme; delete it anytime
const dist = `./dist/${project}/`;  // The distribution package that you'll be uploading to your server; delete it anytime
const modules = './node_modules/';      // npm packages

// Project settings
const config = {

  scripts: {
    // Bundles are defined by a name and an array of chunks (below) to concatenate;
    bundles: {
      footer: ['footer'],
      header: ['header'],
      pageloader: ['pageloader', 'footer'],
    },
    // Chunks are arrays of paths or globs matching a set of source files;
    // this way you can organize a bunch of scripts that go together into pieces
    // that can then be bundled (above)

    // The core footer chunk is loaded no matter what; put essential scripts
    // that you want loaded by your theme in here
    chunks: {
      footer: [
        `${modules}timeago/jquery.timeago.js`, // The modules directory contains packages downloaded via npm
        `${src}js/responsive-menu.js`,
        `${src}js/footer.js`,
      ],
      header: [
        `${modules}svg4everybody/dist/svg4everybody.js`,
        `${src}js/header.js`,
      ],
      // The pageloader chunk provides an example of how you would add a
      // user-configurable feature to your theme; you can delete this if you wish
      // Have a look at the `src/inc/assets.php` to see how script bundles could
      // be conditionally loaded by a theme
      pageloader: [
        `${modules}html5-history-api/history.js`,
        `${modules}spin.js/spin.js`,
        `${modules}spin.js/jquery.spin.js`,
        `${modules}wp-ajax-page-loader/wp-ajax-page-loader.js`,
        `${src}js/page-loader.js`,
      ],
    },
    dest: `${build}js/`, // Where the scripts end up in your theme
    lint: {
      src: [`${src}js/**/*.js`], // Linting checks the quality of the code; we only lint custom scripts, not those under the various modules, so we're relying on the original authors to ship quality code
    },
    minify: {
      src: `${build}js/**/*.js`,
      uglify: {}, // Default options
      dest: `${build}js/`,
    },
    namespace: 'x-', // Script filenames will be prefaced with this (optional; leave blank if you have no need for it but be sure to change the corresponding value in `src/inc/assets.php` if you use it)
  },

  styles: {
    build: {
      src: `${src}scss/**/*.scss`,
      dest: build,
    },
    cssnano: {
      autoprefixer: {
        add: true,
        browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4'], // This tool is magic and you should use it in all your projects :)
      },
    },
    // Requires the libsass implementation of Sass (included in this package)
    // Adds Bower and npm directories to the load path so you can @import directly
    libsass: {
      includePaths: [
        './src/scss',
        `${modules}normalize.css`,
        modules,
      ],
      precision: 6,
      onError(err) {
        return console.log(err);
      },
    },
  },
  theme: {
    lang: {
      src: `${src}languages/**/*`, // Glob pattern matching any language files you'd like to copy over; we've broken this out in case you want to automate language-related functions
      dest: `${build}languages/`,
    },
    php: {
      src: `${src}**/*.php`, // This simply copies PHP files over; both this and the previous task could be combined if you like
      dest: build,
    },
  },
  utils: {
    clean: [`${build}**/.DS_Store`], // A glob pattern matching junk files to clean out of `build`; feel free to add to this array
    wipe: [dist], // Clean this out before creating a new distribution copy
    dist: {
      src: [`${build}**/*`, `!${build}**/*.map`],
      dest: dist,
    },
  },

};

export default config;
