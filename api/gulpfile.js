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
    bowerAssetsDestination : 'public/vendor',
    assetsDestination : 'public/assets',
    resources : 'resources/assets'
};

// get bower files
gulp.task('build-bower-assets', function() {
    // fonts
    gulp.src([
        // bootswatch
        paths.bower + '/bootswatch-dist/fonts/*',
        // font awesome
        paths.bower + '/font-awesome/fonts/*'
    ]).pipe(gulp.dest(paths.bowerAssetsDestination + '/fonts'));

    // javascript
    gulp.src([
        // bootswatch
        paths.bower + '/bootswatch-dist/js/*',
        // jquery
        paths.bower + '/jquery/dist/*'
    ]).pipe(gulp.dest(paths.bowerAssetsDestination + '/js'));

    // stylesheets
    gulp.src([
        // bootswatch
        paths.bower + '/bootswatch-dist/css/*',
        // font awesome
        paths.bower + '/font-awesome/css/*',
        // skeleton
        paths.bower + '/skeleton/css/*'
    ]).pipe(gulp.dest(paths.bowerAssetsDestination + '/css'));
});

// build css files
gulp.task('build-css', function() {
    return gulp.src([
            paths.resources + '/css/global.css',
            paths.resources + '/css/auth.css'
        ])
        .pipe(autoprefixer())
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(concat('screen.css'))
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(minifyCss())
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest(paths.assetsDestination + '/css'));
});

// create default task
gulp.task('default', function() {
    // watch for the css files
    gulp.watch(paths.resources + '/css/*.css', function() {
        // run task
        gulp.run('build-css');
    });
});
