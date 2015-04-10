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

// process app.js
gulp.task('angular-app', function() {
    return gulp.src('src/application/app.js')
        .pipe(uglify())
        .pipe(plumber({
            handleError : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('www/javascript'));
});

// process controller js
gulp.task('angular-controllers', function() {
    return gulp.src('src/application/controllers/**/*.js')
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
        .pipe(gulp.dest('www/javascript'));
});

// process directives js
gulp.task('angular-directives', function() {
    return gulp.src('src/application/directives/**/*.js')
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
        .pipe(gulp.dest('www/javascript'));
});

// process services
gulp.task('angular-services', function() {
    return gulp.src('src/application/services/**/*.js')
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
        .pipe(gulp.dest('www/javascript'));
});

// process templates
gulp.task('angular-templates', function() {
   return gulp.src('src/application/templates/**/*.html')
       .pipe(gulp.dest('www/templates'));
});

// default task, will listen for changes
gulp.task('default', function() {
    gulp.watch('src/application/app.js', function() {
        gulp.run('angular-app');
    });

    gulp.watch('src/application/controllers/**/*.js', function() {
        gulp.run('angular-controllers');
    });

    gulp.watch('src/application/directives/**/*.js', function() {
        gulp.run('angular-directives');
    });

    gulp.watch('src/application/services/**/*.js', function() {
        gulp.run('angular-services');
    });

    gulp.watch('src/application/templates/**/*.html', function() {
        gulp.run('angular-templates');
    });
});
