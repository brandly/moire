var
gulp = require('gulp'),
coffee = require('gulp-coffee'),
concat = require('gulp-concat'),
sass = require('gulp-sass'),
gutil = require('gulp-util'),
uglify = require('gulp-uglify'),
minify = require('gulp-minify-css'),
path = require('path'),
express = require('express'),

build = gutil.env.gh ? './gh-pages/' : './build/';

function onError(err) {
  gutil.log(err);
  gutil.beep();
  this.emit('end');
}

gulp.task('coffee', function () {
  return gulp.src('src/**/*.coffee')
    .pipe(coffee())
    .on('error', onError)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(build));
});

gulp.task('sass', function () {
  return gulp.src('src/styles/style.scss')
    .pipe(sass())
    .on('error', onError)
    .pipe(concat('style.css'))
    .pipe(gulp.dest(build));
});

gulp.task('images', function () {
  return gulp.src('src/images/*')
    .pipe(gulp.dest(build));
});

gulp.task('index', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest(build));
});

gulp.task('build', [
  'index',
  'coffee',
  'sass',
  'images'
]);

gulp.task('default', ['build'], function () {
  if (!gutil.env.gh) {
    gulp.watch(['src/**'], ['build']);

    var
    app = express(),
    port = 8888;
    app.use(express.static(path.resolve(build)));
    app.listen(port, function() {
      gutil.log('Listening on', port);
    });
  }
});
