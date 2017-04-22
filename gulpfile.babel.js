import gulp from 'gulp';

const dirs = {
  dest: 'build',
};

gulp.task('default', () => {
  console.log(dirs.dest);
});
