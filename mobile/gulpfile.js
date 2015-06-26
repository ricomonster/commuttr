var gulp = require('gulp'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence');

// set the paths
var paths = {
    bower : './bower_components',
    src : './src',
    www : './www'
};

// build bower files
gulp.task('build-bower', function() {
    // javascript
    gulp.src([
        // angular
        paths.bower + '/angular/angular.js',
        paths.bower + '/angular/angular.min.js',
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
        paths.bower + '/ionic/js/*',
        // ionic material
        paths.bower + '/ionic-material/dist/ionic.material.js',
        paths.bower + '/ionic-material/dist/ionic.material.min.js',
        paths.bower + '/ionic-material/dist/ionic.material.min.js.map',
        // waves
        paths.bower + '/waves/dist/waves.js',
        paths.bower + '/waves/dist/waves.min.js',
        paths.bower + '/waves/dist/waves.min.js.map'
    ]).pipe(gulp.dest(paths.www + '/vendor/javascript'));

    // stylesheets
    gulp.src([
        // ionic
        paths.bower + '/ionic/css/*',
        // ionoic material
        paths.bower + '/ionic-material/dist/ionic.material.css',
        paths.bower + '/ionic-material/dist/ionic.material.min.css',
    ]).pipe(gulp.dest(paths.www + '/vendor/stylesheets'));

    // fonts
    gulp.src([
        // ionic
        paths.bower + '/ionic/fonts/*'
    ]).pipe(gulp.dest(paths.www + '/vendor/fonts'));
});

// build task
gulp.task('build', function(callback) {
    runSequence('build-bower', callback);
});

// setup the default task
gulp.task('default', function(callback) {
    runSequence('build', callback);
});
