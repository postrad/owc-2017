import gulp from 'gulp';
import gutil from 'gulp-util';
import ftp from 'vinyl-ftp';
import config from './config.json';

const dirs = {
  dest: 'build',
  siteRoot: '/site/wwwroot',
};

gulp.task('default', () => {
  console.log(`this is the default task! this is the name of dirs.dest: ${dirs.dest}`);
});

gulp.task('deploy', () => {
  const conn = ftp.create({
    host: config.ftp.host,
    user: config.ftp.user,
    password: config.ftp.password,
    parallel: 10,
    log: gutil.log,
  });

  const globs = [
    'src/**',
    'css/**',
    'js/**',
    'fonts/**',
    'index.html',
  ];

  // using base = '.' will transfer everything to siteRoot/test correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src(globs, { base: '.', buffer: false })
    .pipe(conn.dest(`${dirs.siteRoot}/test`));
});
