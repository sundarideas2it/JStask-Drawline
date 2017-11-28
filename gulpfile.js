'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-html-minifier');
var cssmin = require('gulp-cssmin');
var minifyjs = require('gulp-js-minify');
var rename = require('gulp-rename');
var imageop = require('gulp-image-optimization');
var browserSync = require('browser-sync').create();

gulp.task('sass', ['minifyjs'],function () {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('minifycss',['sass'], function () {
    gulp.src('./app/**/*.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream:true})); // Make sure this is called!
});

gulp.task('minifyimages', function(cb) {
    gulp.src(['app/**/*.png','app/**/*.jpg','app/**/*.gif','app/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./dist')).on('end', cb).on('error', cb);
});

gulp.task('minifyhtml',['minifycss'], function() {
  gulp.src('./app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream:true})); // Make sure this is called!
});

gulp.task('minifyjs', function () {
    gulp.src('./app/**/*.js')
    .pipe(minifyjs())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream:true})); // Make sure this is called!
});


gulp.task('minify',['minifyhtml']);

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
})

gulp.task('watch',['browserSync'], function () {
  gulp.watch('./app/scss/**/*.scss', ['minify']);
  gulp.watch('./app/js/**/*.js', ['minify']);
  gulp.watch('./app/**/*.html', ['minify']);
});

gulp.task('default',['watch','minify']);
