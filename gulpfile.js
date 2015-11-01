var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var angularFilesort = require('gulp-angular-filesort');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./www/app/**/*.js'],
  templatecache: ['./www/app/**/*.html']
};

gulp.task('default', ['sass'], ['templatecache'], ['scripts']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('templatecache', function (done) {
  gulp.src(paths.templatecache)
    .pipe(templateCache({standalone:true}))
    .pipe(gulp.dest('./www/js'))
    .on('end', done);
});
  
 gulp.task('scripts', function(done) {
  gulp.src(paths.js)
     .pipe(plumber())
     .pipe(angularFilesort())
     .pipe(concat('app.js'))
     .pipe(gulp.dest('./www/js/'))
     .pipe(uglify())
     .pipe(rename({
         suffix: '.min'
     }))
     .pipe(gulp.dest('./www/js/'))
     .on('end', done);
})

gulp.task('watch', function() {
     gulp.watch(paths.sass, ['sass']);
     gulp.watch(paths.templatecache, ['templatecache']);
     gulp.watch(paths.js, ['scripts']);
});



gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
