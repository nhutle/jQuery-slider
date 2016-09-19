var gulp = require('gulp');

// Include plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

// Lint JS code
gulp.task('lint', function() {
  return gulp.src([
      'javascripts/**/*.js',
      '!javascripts/main.js',
      '!javascripts/main.min.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// Compile Sass
gulp.task('sass', function() {
  return gulp.src('styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('styles'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('sass-build', function() {
  return gulp.src('styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});


// Concatenate and Minify JS
gulp.task('script', function() {
  return gulp.src([
      'javascripts/**/*.js',
      '!javascripts/main.min.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('javascripts'));
});

gulp.task('script-build', function() {
  return gulp.src([
      'javascripts/**/*.js',
      '!javascripts/main.min.js'
    ])
    .pipe(concat('main.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/javascripts'));
});


// Copy files
gulp.task('copy', function() {
  // copy html
  gulp.src('*.html')
    .pipe(gulp.dest('dist'));

  // copy images
  gulp.src('assets/images/*.*')
    .pipe(gulp.dest('dist/assets/images'));
});


// Clean dist folder
gulp.task('clean', function() {
  return gulp.src('./dist/**/*.*', { read: false })
    .pipe(rimraf({ force: true }));
});


// Minify images
gulp.task('image', function() {
  return gulp.src('assets/images/**/*.*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/assets/images'));
});


// Default task
gulp.task('default', ['sass', 'lint', 'script'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('javascripts/**/*.*', ['lint', 'script']);
  gulp.watch('styles/**/*.*', ['sass']);
  gulp.watch('javascripts/**/*.js').on('change', browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Build task
gulp.task('build', ['clean', 'copy', 'sass-build', 'lint', 'script-build', 'image'], function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});
