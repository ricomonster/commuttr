var gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    plumber         = require('gulp-plumber');

// fetch bower files
gulp.task('build-bower-assets', function() {
    // fonts
    gulp.src([
        // ionic
        'bower_components/ionic/fonts/*'
    ]).pipe(gulp.dest('www/vendor/fonts'));

    // javascript
    gulp.src([
        // angular
        'bower_components/angular/angular.js',
        'bower_components/angular/angular.min.js',
        // angular animate
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-animate/angular-animate.min.js.map',
        // angular sanitize
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js.map',
        // angular ui router
        'bower_components/angular-ui-router/release/*',
        // ionic
        'bower_components/ionic/js/*'
    ]).pipe(gulp.dest('www/vendor/javascript'));

    // stylesheets
    gulp.src([
        // ionic
        'bower_components/ionic/css/*'
    ]).pipe(gulp.dest('www/vendor/stylesheets'));
});
