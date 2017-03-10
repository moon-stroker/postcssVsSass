'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var fs = require('fs');

var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
// var del = require('del');
var postcss = require('gulp-postcss');
//plugins postcss
var partialImport = require('postcss-partial-import');
var cssNext = require('postcss-cssnext');
var cssnano = require('cssnano')({ autoprefixer: false });

var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('sass-dev', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src(
      'source/sass/main.scss'
    )
    .pipe($.changed('css', {extension: '.scss'}))
    .pipe(sass({
        compass:false,
      })
      .on('error', console.error.bind(console))
    )
    .pipe(gulp.dest('css'))
    .pipe($.if('main.css', autoprefixer(AUTOPREFIXER_BROWSERS)))
    .pipe($.size({title: 'css'}));
});

gulp.task('sass', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src(
      'source/sass/main.scss'
    )
    //.pipe($.changed('css', {extension: '.scss'}))
    .pipe(sass({
        compass:false
      })
      .on('error', console.error.bind(console))
    )
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    // Concatenate And Minify Styles
    //.pipe($.if('*.css', $.csso()))
    .pipe(gulp.dest('css'))
    .pipe($.size({title: 'css'}));
});



gulp.task('postcss-dev', function () {
    var processorArray = [
        partialImport,
        cssNext({
            browsers: AUTOPREFIXER_BROWSERS
        }),
    ];
    return gulp.src('./source/css/main.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processorArray))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
});

gulp.task('postcss', function () {
    var processorArray = [
        partialImport,
        cssNext({
            browsers: AUTOPREFIXER_BROWSERS
        }),
        cssnano
    ];
    return gulp.src('./source/css/main.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processorArray))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
});

// Watch Files For Changes & Reload
gulp.task('serve-postcss', ['postcss-dev'], function () {
    browserSync({
      notify: false,
      server: ['./']
    });
    gulp.watch(['source/css/*.css','source/css/**/*.css'], ['postcss-dev', reload]);
});

// Watch Files For Changes & Reload
gulp.task('serve-sass', ['sass-dev'], function () {
    browserSync({
      notify: false,
      server: ['./']
    });
    gulp.watch(['source/sass/*.scss','source/sass/**/*.scss'], ['sass-dev', reload]);
});






// Build Production Files, the Default Task
gulp.task('default', ['sass'], function (cb) {
    runSequence('styles', ['sass'], cb);
});
// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}


