const gulp = require('gulp');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');

const srcPatchFile = './src/js/*.js'
const distPatchName = './dist'
const distName = 'duck.js'

gulp.task('scripts', function () {
    return gulp.src(srcPatchFile)
        .pipe(concat(distName))
        .pipe(minify())
        .pipe(uglify())
        .pipe(plumber())
        .pipe(gulp.dest(distPatchName));
});

gulp.task('stream', function () {
    return watch(srcPatchFile, { ignoreInitial: false })      
        .pipe(gulp.dest(distPatchName));
});