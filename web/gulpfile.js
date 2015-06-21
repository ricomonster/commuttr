var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    minifyCss   = require('gulp-minify-css'),
    notify      = require('gulp-notify'),
    plumber     = require('gulp-plumber'),
    uglify      = require('gulp-uglify'),
    fs          = require('fs'),
    path        = require('path'),
    merge       = require('merge-stream'),
    runSequence = require('run-sequence');

// set the needed paths
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

// build the bower assets and put in the www/assets folder
gulp.task('build-bower-assets', function() {
    // javascript
    gulp.src([
        // angular js
        paths.bower + '/angular/angular.js',
        paths.bower + '/angular/angular.min.js',
        // angular animate
        paths.bower + '/angular-animate/angular-animate.js',
        paths.bower + '/angular-animate/angular-animate.min.js',
        paths.bower + '/angular-animate/angular-animate.min.js.map',
        // angular aria
        paths.bower + '/angular-aria/angular-aria.js',
        paths.bower + '/angular-aria/angular-aria.min.js',
        paths.bower + '/angular-aria/angular-aria.min.js.map',
        // angular material
        paths.bower + '/angular-material/angular-material.js',
        paths.bower + '/angular-material/angular-material.min.js',
        // angular ui router
        paths.bower + '/angular-ui-router/release/*'
    ]).pipe(gulp.dest(paths.www + '/vendor/javascript'));

    // stylesheets
    gulp.src([
        // angular material
        paths.bower + '/angular-material/angular-material.css',
        paths.bower + '/angular-material/angular-material.min.css'
    ]).pipe(gulp.dest(paths.www + '/vendor/stylesheets'));
});

// build app
gulp.task('build-app', function() {
    return gulp.src([
            paths.src + '/app.module.js',
            paths.src + '/app.routes.js',
            paths.src + '/app.config.js',
            paths.src + '/app.run.js',
            paths.src + '/app.constants.js'
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
        paths.src + '/app.routes.js',
        paths.src + '/app.config.js',
        paths.src + '/app.run.js',
        paths.src + '/app.constants.js'
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
        'build-bower-assets',
        'build-app',
        'build-components',
        'build-services',
        'build-templates',
        callback);
});

gulp.task('default', function(callback) {
    runSequence('build', 'watch', callback);
});
