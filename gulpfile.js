const path = require('path');
const gulp = require('gulp');
// const uglify = require('gulp-uglify');
const size = require('gulp-size');
const $ = require('gulp-load-plugins')();
const pkg = require('./package.json');
const comment = '\/*\r\n* Moon \r\n* Version:' + pkg.version + '\r\n*\/\r\n';

gulp.task('build', function () {
  return gulp.src(['./src/core/index.js'])
    .pipe($.concat('moon.js'))
    .pipe($.header(comment + '\n'))
    .pipe($.size())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('minify', ['build'], function () {
  return gulp.src(['./dist/moon.js'])
    // .pipe(uglify())
    .pipe($.header(comment))
    .pipe($.size())
    .pipe($.concat('moon.min.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['build', 'minify']);
