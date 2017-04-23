import gulp from 'gulp';
import gutil from 'gulp-util';
import ftp from 'vinyl-ftp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from './config.json';
import gulpconfig from './gulpconfig';

const plugins = gulpLoadPlugins({ camelize: true });

const dirs = {
  dest: 'build',
  siteRoot: '/site/wwwroot',
};

gulp.task('default', ['build']);

gulp.task('styles', () => {
  return gulp.src(gulpconfig.styles.build.src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass(gulpconfig.styles.libsass).on('error', plugins.sass.logError))
    .pipe(plugins.cssnano(gulpconfig.styles.cssnano))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(gulpconfig.styles.build.dest));
});

// Build a working copy of the theme
gulp.task('build', ['styles']);

// Deployment task
gulp.task('deploy', ['build', 'upload']);

// FTP task
gulp.task('upload', () => {
  const conn = ftp.create({
    host: config.ftp.host,
    user: config.ftp.user,
    password: config.ftp.password,
    parallel: 10,
    log: gutil.log,
  });

  const globs = [
    'build/**',
  ];

  // using base = '.' will transfer everything to siteRoot/test correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src(globs, { base: '.', buffer: false })
    .pipe(conn.dest(`${dirs.siteRoot}/test`));
});
