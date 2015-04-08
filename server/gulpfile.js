var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    plumber = require('gulp-plumber');

// get bower files and put to /public/vendor/*
gulp.task('build-bower', function() {
    // fonts
    gulp.src([
        // bootstrap
        'bower_components/bootstrap/dist/fonts/*',
        // font awesome
        'bower_components/font-awesome/fonts/*'
    ]).pipe(gulp.dest('public/vendor/fonts'));

    // javascript
    gulp.src([
        // bootstrap
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        // codemirror
        'bower_components/codemirror/lib/codemirror.js',
        // jquery
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery/dist/jquery.min.js'
    ]).pipe(gulp.dest('public/vendor/javascript'));

    // stylesheets
    gulp.src([
        // bootstrap
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        // codemirror
        'bower_components/codemirror/lib/codemirror.css',
        // font awesome
        'bower_components/font-awesome/css/font-awesome.css',
        'bower_components/font-awesome/css/font-awesome.min.css'
    ]).pipe(gulp.dest('public/vendor/stylesheets'));
});

// minify css
gulp.task('build-stylesheets', function() {
    return gulp.src('resources/assets/stylesheets/*.css')
        .pipe(autoprefixer())
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(concat('screen.css'))
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(minify())
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('public/assets/stylesheets'));
});

// default task, will listen for changes
gulp.task('default', function() {
    gulp.watch('resources/assets/stylesheets/*.css', function() {
        gulp.run('build-stylesheets');
    });
});
