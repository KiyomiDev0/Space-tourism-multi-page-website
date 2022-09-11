let gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass')(require('sass')),
    pug = require('gulp-pug'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    notify = require("gulp-notify"),
    cache = require('gulp-cached');


// HTML Task 
gulp.task('html', function () {
  require('./server.js');
  return gulp.src('src/**/*.pug')
  .pipe(pug({pretty: true}))
  .pipe(cache('linting'))
  .pipe(gulp.dest('public'))
  .pipe(notify("HTML Task is Done !"))
  .pipe(livereload());
})


// Css Task
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(concat('main.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(cache('linting'))
  .pipe(gulp.dest('public/css'))
  .pipe(notify("Css Task is Done !"))
  .pipe(livereload());
})


// // Js Task
gulp.task('js', function () {
  return gulp.src('src/**/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(cache('linting'))
  .pipe(gulp.dest('public/js'))
  .pipe(notify("Js Task is Done !"))
  .pipe(livereload());
})


// Watch Task
exports.default = function () {
  require("./server.js");
  livereload.listen();
  gulp.watch("src/**/*.pug", gulp.series("html"));
  gulp.watch("src/**/*.css", gulp.series("css"));
  gulp.watch("src/**/*.js", gulp.series("js"));
};

