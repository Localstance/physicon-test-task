var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');

gulp.task('eslint', function () {
  return gulp.src(['./src/js/**/*.js', '!./src/js/vendors/*.js'])
    .pipe(eslint({
      'globals': {
        'jQuery': false,
        '$': true
      },
      configFile: './.eslint.json'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(eslint.results(function (results) {
      console.log('ESlint Results: \n');
      console.log('Total Warnings: ' + results.warningCount);
      console.log('Total Errors: ' + results.errorCount);
      console.log('\nSuccess');
    }));
});

gulp.task('css', function () {
  return gulp.src('./src/css/*.css')
    .pipe(concat('all.css'))
    .pipe(cssmin({
      showLog: true,
      target: './public/css'
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('build', ['eslint'], function () {
  return browserify('./src/js/main.js', {
    debug: true
  })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'));
});


gulp.task('server', ['build'], function(){
  return connect.server({
    root: './public',
    port: 8000
  });
});

gulp.task('startServer', function () {
  return connect.server({
    root: './public',
    port: 8080
  });
});

gulp.task('buildApp', ['server', 'css']);
gulp.task('run', ['startServer']);