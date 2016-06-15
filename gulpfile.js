const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
// const watch = require('gulp-watch');
var changed = require('gulp-changed');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const exec = require('child_process').exec;

const src_sync_files = ['src/public/**/*.ico'];
const lib_sync_dir = 'src/public';

const src_image_files = ['src/public/**/*.{jpg,jpeg,png,gif}'];
const lib_image_dir = 'src/public';

const src_js_files = ['src/**/*.js'];
const lib_js_files = ['lib/**/*.js'];
const lib_js_dir = 'lib';

const src_scss_files = ['src/**/*.scss'];
const lib_css_files = ['src/**/*.css'];
const lib_css_dir = 'lib';

gulp.task('sync', () => {
    return gulp.src(src_sync_files)
        .pipe(changed(lib_sync_dir))
        .pipe(gulp.dest(lib_sync_dir));
});

gulp.task('min_image', () => {
    return gulp.src(src_image_files)
        .pipe(changed(lib_image_dir))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(lib_image_dir));
});

gulp.task('build_js', () => {
    return gulp.src(src_js_files)
        .pipe(changed(lib_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(lib_js_dir));
});

gulp.task('uglify_js', () => {
    return gulp.src(lib_js_files)
        .pipe(changed(lib_js_dir))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(lib_js_dir));
});

gulp.task('build_css', () => {
    return gulp.src(src_scss_files)
        .pipe(changed(lib_css_dir))
        .pipe(sourcemaps.init())
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(lib_css_dir));
});

gulp.task('uglify_css', () => {
    return gulp.src(lib_css_files)
        .pipe(changed(lib_css_dir))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(lib_css_dir));
});

gulp.task('build',['sync','min_image','build_js','uglify_js','build_css','uglify_css']);

gulp.task('watch', () => {
    gulp.watch(src_sync_files, ['sync']);
    gulp.watch(src_image_files, ['min_image']);
    gulp.watch(src_js_files, ['build_js','uglify_js']);
    gulp.watch(src_scss_files, ['build_css','uglify_css']);
});

gulp.task('develop', () => {
    exec('PORT = 4001 nodemon -w lib lib/app.js', function(err) {
        if (err) {
            console.log('error:',err);
        }
    });
});

gulp.task('release', () => {
    exec('pm2 lib/app.js  -i 0 --name node-front-template --watch', function(err) {
        if (err) {
            console.log('error:',err);
        }
    });
});
