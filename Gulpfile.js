var gulp   = require('gulp');
    $      = require('gulp-load-plugins')();

var paths = {
  src: ['quadtree.js'],
  tests: 'test/*.js',
  dist: 'quadtree.min.js',
};

gulp.task('lint', function(){
  return gulp.src(paths.src)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify({message: 'Linting Done'}));
});

gulp.task('uglify', function(){
  return gulp.src(paths.src)
    .pipe($.uglify())
    .pipe($.rename(paths.dist))
    .pipe(gulp.dest(''))
    .pipe($.notify({message: 'Build Done'}));
});

gulp.task('watch', function(){
  gulp.watch(paths.src, ['lint']);
});

//run tests once
gulp.task('test', function(){
  return gulp.src(paths.tests, {read: false})
      .pipe($.mocha({reporter: 'nyan'}));
});


gulp.task('build', ['lint', 'uglify']);
gulp.task('default', ['build', 'watch']);