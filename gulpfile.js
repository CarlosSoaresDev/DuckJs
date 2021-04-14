var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename')

var src_js = './src/js/*.js'

var dist_js = './dist'
var dist_name_js = 'main.js'

gulp.task('scripts', function() {
    return gulp.src(src_js)
        // .pipe(plumber())
        // .pipe(uglify())
        .pipe(concat(dist_name_js))
        .pipe(gulp.dest(dist_js));
});

gulp.task('watching', function() {
    gulp.watch([src_js], ['scripts']);
})