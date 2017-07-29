var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    plugins = require('gulp-load-plugins'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');


gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('scripts', () => {
    return browserify({
            'entries': ['app/js/main.js'],
            'debug': true,
            'transform': [
                babelify.configure({
                    'presets': ['es2015']
                })
            ]
        })
        .bundle()
        .on('error', function() {
            var args = Array.prototype.slice.call(arguments);

            plugins().notify.onError({
                'title': 'Compile Error',
                'message': '<%= error.message %>'
            }).apply(this, args);

            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(plugins().sourcemaps.init({ 'loadMaps': true }))
        .pipe(plugins().sourcemaps.write('.'))
        // .pipe(gulp.dest('dist/js'))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.stream());
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    });
});

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(sourcemaps.init())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            // Setting interlaced to true
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('clean:dist', function() {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('cache:clear', function(callback) {
    return cache.clearAll(callback);
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'scripts', 'browserSync', 'watch'],
        callback
    )
});

gulp.task('build', function(callback) {
    runSequence('cache:clear', 'clean:dist', ['sass', 'useref', 'images', 'fonts'],
        callback
    )
});