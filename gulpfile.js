var gulp = require('gulp');
// var useref = require('gulp-useref');
var browserSync = require('browser-sync').create();
var csso = require('gulp-csso');
var image = require('gulp-image');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var gulpIf = require('gulp-if');
var ghPages = require('gulp-gh-pages');
var uncss = require('gulp-uncss');
var lazypipe = require('lazypipe');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var merge = require('merge2');
var htmlReplace = require('gulp-html-replace');

// lazy pipe

var cssTasks = lazypipe()
    .pipe(uncss, {
                html: ['index.html'],
            })


// Tasks

gulp.task('sass', function(){
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('styles', function() {
  var main = gulp.src(['css/**/*.css', '!css/styles.css', '!css/jquery.bxslider.css', '!css/magnific-popup.css'])
    .pipe(cssTasks())

  var sec = gulp.src(['css/styles.css', 'css/jquery.bxslider.css', 'css/magnific-popup.css'])


  return merge(main, sec)
    .pipe(concat('styles.min.css'))
    .pipe(csso())
    .pipe(gulp.dest('dist/css'));
})


gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(htmlReplace({
        'css': 'css/styles.min.css',
        'js': 'js/main.js',
        'vendor': 'js/vendor.js'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
  var main = gulp.src(['js/**/*.js', '!js/custom.js'])
    .pipe(concat('vendor.js'))

  var sec = gulp.src('js/custom.js')
    .pipe(rename('main.js'))

  return merge(main, sec)
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task('images', function(){
  return gulp.src('images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(image()))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('cssimages', function(){
  return gulp.src('css/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(image()))
  .pipe(gulp.dest('dist/css/images'))
});

gulp.task('fonts', function() {
  return gulp.src('fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('css/**/*.css', browserSync.reload);
  gulp.watch('scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('build', function () {
  runSequence('clean:dist',
    ['styles', 'html', 'js', 'images', 'cssimages', 'fonts']
  )
})

gulp.task('default', function () {
  runSequence(['browserSync', 'watch']
  )
})
