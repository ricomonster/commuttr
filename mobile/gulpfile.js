var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// set the paths
var paths = {
    bower : 'bower_components',
    bowerDestination : 'www/vendor',
    src : 'src'
};

// build task
gulp.task('build', function() {
    gulp.run([
        'build-bower-assets',
        'angular-app',
        'angular-controllers',
        'angular-directives',
        'angular-services',
        'angular-filters',
        'angular-templates']);
});

// get needed files from bower
gulp.task('build-bower-assets', function() {
    // fonts
    gulp.src([
        // ionic
        paths.bower + '/ionic/fonts/*'
    ]).pipe(gulp.dest(paths.bowerDestination + '/fonts'));

    // javascript
    gulp.src([
        // angular
        paths.bower + '/angular/angular.js',
        paths.bower + '/angular/angular.min.js',
        paths.bower + '/angular/angular.min.map',
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
        paths.bower + '/ionic-material/ionic.material.min.js'
    ]).pipe(gulp.dest(paths.bowerDestination + '/js'));

    // stylesheets
    gulp.src([
        // ionic
        paths.bower + '/ionic/css/*',
        // ionic material
        paths.bower + '/ionic-material/ionic.material.min.css'
    ]).pipe(gulp.dest(paths.bowerDestination + '/css'));
});

// process app.js
gulp.task('angular-app', function() {
    return gulp.src([
        paths.src + '/app.js',
        paths.src + '/constant.js'
    ])
        .pipe(concat('app.js'))
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(uglify())
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('www/application/js'));
});

// process controller js
gulp.task('angular-controllers', function() {
    return gulp.src(paths.src + '/controllers/**/*.js')
        .pipe(concat('controllers.js'))
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(uglify())
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('www/application/js'));
});

// process directives js
gulp.task('angular-directives', function() {
    return gulp.src(paths.src + '/directives/**/*.js')
        .pipe(concat('directives.js'))
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(uglify())
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('www/application/js'));
});

// process services
gulp.task('angular-services', function() {
    return gulp.src(paths.src + '/services/**/*.js')
        .pipe(concat('services.js'))
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(uglify())
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('www/application/js'));
});

// angular filters
gulp.task('angular-filters', function() {
    return gulp.src(paths.src + '/filters/**/*.js')
        .pipe(concat('filters.js'))
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(uglify())
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('www/application/js'));
});

// process templates
gulp.task('angular-templates', function() {
    return gulp.src(paths.src + '/templates/**/*.html')
        .pipe(gulp.dest('www/application/templates'));
});

// default task, will listen for changes
gulp.task('default', function() {
    gulp.watch([paths.src + '/app.js', paths.src + '/constant.js'], function() {
        gulp.run('angular-app');
    });

    gulp.watch(paths.src + '/controllers/**/*.js', function() {
        gulp.run('angular-controllers');
    });

    gulp.watch(paths.src + '/directives/**/*.js', function() {
        gulp.run('angular-directives');
    });

    gulp.watch(paths.src + '/services/**/*.js', function() {
        gulp.run('angular-services');
    });

    gulp.watch(paths.src + '/filters/**/*.js', function() {
        gulp.run('angular-filters');
    });

    gulp.watch(paths.src + '/templates/**/*.html', function() {
        gulp.run('angular-templates');
    });
});
