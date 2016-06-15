const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const watch = require('gulp-watch');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const exec = require('child_process').exec;

const sync_files = ['src/public/**/*.ico'];
const image_files = ['src/public/**/*.png','src/public/**/*.jpb','src/public/**/*.gif'];
const src_js_files = ['src/**/*.js'];
const lib_js_files = ['lib/**/*.js'];
const build_scss_files = ['src/**/*.scss'];
const lib_css_files = ['src/**/*.scss'];

gulp.task('sync', () => {
    return gulp.src(sync_files)
        .pipe(watch(sync_files))
        .pipe(gulp.dest('./lib/public'));
});

gulp.task('min_image', () => {
    return gulp.src(image_files)
        .pipe(watch(image_files))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./lib/public'));
});

gulp.task('build_js', () => {
    return gulp.src(src_js_files)
        // .pipe(watch(src_js_files))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                'es2015',
                'stage-0'
            ],
            plugins: [
                ['transform-async-to-module-method', {
                    'module': 'bluebird',
                    'method': 'coroutine'
                }]
            ]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('lib'));
});

gulp.task('uglify_js', () => {
    return gulp.src(lib_js_files)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('build_css', () => {
    return gulp.src(build_scss_files)
        .pipe(watch(build_scss_files))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('uglify_css', () => {
    return gulp.src(lib_js_files)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('build',['sync','min_image','build_js','build_css']);

gulp.task('watch', () => {
    gulp.watch(sync_files, ['sync']);
    gulp.watch(src_js_files, ['build_js']);
    gulp.watch(build_scss_files, ['build_css']);
});

gulp.task('develop', () => {
    exec('./node_modules/.bin/nodemon lib/app.js', function(err) {
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
