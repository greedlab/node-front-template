// npm install

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
const changedInPlace = require('gulp-changed-in-place');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const del = require('del');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
// var react = require('gulp-react');
const browserify = require('browserify');
// const glob = require('node-glob');
const glob = require("glob")
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// const exec = require('child_process').exec;

const lib_dir = 'lib';

const src_sync_files = 'src/**/*.{ico,html}';
const lib_sync_dir = 'lib';

const src_image_files = 'src/public/**/*.{jpg,jpeg,png,gif}';
const lib_image_dir = 'lib/public';

const src_jsx_files = 'src/**/*.jsx';
const lib_jsx_dir = 'lib';

const src_js_files = 'src/**/*.{js,es6}';
const lib_js_files = 'lib/**/*.js';
const lib_js_dir = 'lib';

const src_scss_files = 'src/**/*.scss';
const lib_css_files = 'src/**/*.css';
const lib_css_dir = 'lib';

gulp.task('clean', () => {
    return del(lib_dir);
});

gulp.task('sync', () => {
    return gulp.src(src_sync_files)
        .pipe(plumber())
        .pipe(changed(lib_sync_dir))
        .pipe(gulp.dest(lib_sync_dir));
});

gulp.task('min-image', () => {
    return gulp.src(src_image_files)
        .pipe(plumber())
        .pipe(changed(lib_image_dir))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(lib_image_dir));
});

gulp.task('build-js', () => {
    return gulp.src(src_js_files)
        .pipe(plumber())
        .pipe(changed(lib_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(lib_js_dir));
});

gulp.task('uglify-js', () => {
    return gulp.src(src_js_files)
        .pipe(plumber())
        .pipe(changed(lib_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(lib_js_dir));
});

gulp.task('uglify-jsx', () => {
    return browserify(src_jsx_files)
        .pipe(plumber())
        .pipe(changed(lib_js_dir))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.jsx'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(lib_jsx_dir));
});

gulp.task('build-jsx', function() {
    glob(src_jsx_files, {}, function(err, files) {
        var b = browserify();
        files.forEach(function(file) {
            b.add(file);
        });
        b.bundle()
            .pipe(plumber())
            // .pipe(changed(lib_js_dir))
            // .pipe(sourcemaps.init())
            .pipe(source('output.js'))
            .pipe(buffer())
            .pipe(rename({
                extname: '.min.jsx'
            }))
            // .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(lib_jsx_dir));
    });
});

gulp.task('uglify-jsx', function() {
    glob(src_jsx_files, {}, function(err, files) {
        var b = browserify();
        files.forEach(function(file) {
            b.add(file);
        });
        b.bundle()
            .pipe(plumber())
            // .pipe(changed(lib_js_dir))
            .pipe(source('output.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(lib_jsx_dir));
    });
});

gulp.task('build-css', () => {
    return gulp.src(src_scss_files)
        .pipe(plumber())
        .pipe(changed(lib_css_dir))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(lib_css_dir));
});

gulp.task('uglify-css', () => {
    return gulp.src(src_scss_files)
        .pipe(plumber())
        .pipe(changed(lib_css_dir))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(lib_css_dir));
});

// gulp.task('build', () => {
//     runSequence('clean',
//         ['sync','min-image','build-js','build-css','uglify-js', 'uglify-css']);
// });

gulp.task('build', ['sync','min-image','build-js','build-css','uglify-js', 'uglify-css', 'build-jsx', 'uglify-jsx']);

// gulp.task('build', () => {
//     runSequence('sync','min-image','build-js','build-css','uglify-js', 'uglify-css');
// });

gulp.task('watch', () => {
    gulp.watch(src_sync_files, ['sync']);
    gulp.watch(src_image_files, ['min-image']);
    gulp.watch(src_js_files, ['build-js','uglify-js']);
    gulp.watch(src_jsx_files, ['build-jsx','uglify-jsx']);
    gulp.watch(src_scss_files, ['build-css','uglify-css']);
});
