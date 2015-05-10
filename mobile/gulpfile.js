var gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    plumber         = require('gulp-plumber');

// set the paths
var paths = {
    bower : 'bower_components',
    src : 'application'
};

// process bower files
gulp.task('build-bower', function() {
    // fonts
    gulp.src([
        // ionic
        paths.bower + '/ionic/fonts/*'
    ]).pipe(gulp.dest('www/vendor/fonts'));

    // javascript
    gulp.src([
        // angular
        paths.bower + '/angular/angular.js',
        paths.bower + '/angular/angular.min.js',
        paths.bower + '/angular/angular.min.js.map',
        // angular animate
        paths.bower + '/angular-animate/angular-animate.js',
        paths.bower + '/angular-animate/angular-animate.min.js',
        paths.bower + '/angular-animate/angular-animate.min.js.map',
        // angular sanitize
        paths.bower + '/angular-sanitize/angular-sanitize.js',
        paths.bower + '/angular-sanitize/angular-sanitize.min.js',
        paths.bower + '/angular-sanitize/angular-sanitize.min.js.map',
        // angular ui router
        paths.bower + '/angular-ui-router/release/*',
        // ionic
        paths.bower + '/ionic/js/*'
    ]).pipe(gulp.dest('www/vendor/javascript'));

    // stylesheets
    gulp.src([
        // ionic
        paths.bower + '/ionic/css/*'
    ]).pipe(gulp.dest('www/vendor/css'));
});
