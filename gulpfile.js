////////////////////////////////////////////////////////////////////////////////
/**
 * @name Gulp taskrunner
 * @desc The TickerTags dashboard taskrunner and build creator
 */

var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    gulpif        = require('gulp-if'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    sass          = require('gulp-ruby-sass'),
    streamqueue   = require('streamqueue'),
    sourcemaps    = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    htmlReplace   = require('gulp-html-replace'),
    runSequence   = require('run-sequence'),
    stripDebug    = require('gulp-strip-debug'),
    del           = require('del'),
    es            = require('event-stream');

var paths = {
    scripts: [
        '']
};

var version = '';
var env = process.env.V; // V={version number} ie: V=1.0.1 gulp build

// Log Errors
function errorlog(err) {
    console.log(err.message);
    this.emit('end');
}

/** Build Tasks */
/** ------------------------------------------------------------------------- */
////////////////////////////////////////////////////////////////////////////////

gulp.task('version', function() {
    return printOut(env);
});

function printOut(ver) {
    version = ver;
    if (version === undefined) {
        version = '0.0.0';
    }
    console.log('Building version',version);
}

/** Main Gulp Tasks */
/** ------------------------------------------------------------------------- */
////////////////////////////////////////////////////////////////////////////////

/** HTML Template caching */
/** ------------------------------------------------------------------------- */

/** Main App Angular Modules */
/** ------------------------------------------------------------------------- */

/** Main Styles */
/** ------------------------------------------------------------------------- */
gulp.task('app-css', function() {
    return sass('sass-smacss/sass/leongaban9.scss', {
        // noCache: true,
        style: 'compressed'
    })
    .pipe(sourcemaps.init())
    .on('error', errorlog)
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('assets/css/'))
});

/** Development watch */
/** ------------------------------------------------------------------------- */
gulp.task('watch', function() {
    gulp.watch('app/**/**/*.html', ['html-templates']).on('change', function(file) {
        gutil.log(gutil.colors.yellow.bold('HTML updated' + ' (' + file.path + ')'));
    });

    gulp.watch('app/assets/imgs/*.svg').on('change', function(file) {
        gutil.log(gutil.colors.magenta('SVG updated' + ' (' + file.path + ')'));
    });

    gulp.watch('bower_components/sass-smacss/sass/**/*.scss', ['app-css']).on('change', function(file) {
        gutil.log(gutil.colors.cyan.bold('CSS updated' + ' (' + file.path + ')'));
    });
});