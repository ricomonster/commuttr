var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    notify      = require('gulp-notify'),
    plumber     = require('gulp-plumber'),
    uglify      = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    fs          = require('fs'),
    path        = require('path'),
    merge       = require('merge-stream');

// set the paths
var paths = {
    bower : './bower_components',
    src : './src',
    www : './www'
};

// notify error handler
var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
    })(err);

    this.emit('end');
};

var getFolders = function(directory) {
    return fs.readdirSync(directory)
        .filter(function(file) {
            return fs.statSync(path.join(directory, file)).isDirectory();
        })
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
        // angular local storage
        paths.bower + '/angular-local-storage/dist/*',
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

// build app
gulp.task('build-app', function() {
    return gulp.src([
            paths.src + '/app.module.js',
            paths.src + '/app.config.js',
            paths.src + '/app.constants.js',
            paths.src + '/app.routes.js',
            paths.src + '/app.run.js'
        ])
        .pipe(concat('app.js'))
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify())
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest(paths.www + '/app'));
});

// build components
gulp.task('build-components', function() {
    var folders = getFolders(paths.src + '/components/');

    var tasks = folders.map(function(folder) {
        return gulp.src(path.join(paths.src + '/components/', folder, '/*.js'))
            .pipe(concat(folder + '.js'))
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(uglify())
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(gulp.dest(paths.www + '/app/components/' + folder));
    });

    return merge(tasks);
});

// build services
gulp.task('build-services', function() {
    var folders = getFolders(paths.src + '/services/');

    var tasks = folders.map(function(folder) {
        return gulp.src(path.join(paths.src + '/services/', folder, '/*.js'))
            .pipe(concat(folder + '.js'))
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(uglify())
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(gulp.dest(paths.www + '/app/services/' + folder));
    });

    return merge(tasks);
});

// copy templates from the src -> www/components/{component name}
gulp.task('build-templates', function() {
    return gulp.src(paths.src + '/components/**/*.html')
        .pipe(gulp.dest(paths.www + '/app/components'));
});

// watch tasks
gulp.task('watch', function() {
    gulp.watch([
        paths.src + '/app.module.js',
        paths.src + '/app.config.js',
        paths.src + '/app.constants.js',
        paths.src + '/app.routes.js',
        paths.src + '/app.run.js'
    ], ['build-app']);

    // watch js files in the components folder
    gulp.watch(paths.src + '/components/**/*.js', ['build-components']);

    // watch js files in the services folder
    gulp.watch(paths.src + '/services/**/*.js', ['build-services']);

    // watch templates in the components folder
    gulp.watch(paths.src + '/components/**/*.html', ['build-templates']);
});

// the build task
gulp.task('build', function(callback) {
    runSequence(
        'build-bower',
        'build-app',
        'build-components',
        'build-services',
        'build-templates',
        callback);
});

// setup the default task
gulp.task('default', function(callback) {
    runSequence('build', 'watch', callback);
});
