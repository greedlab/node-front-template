// npm install

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
// const changedInPlace = require('gulp-changed-in-place');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const del = require('del');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const react = require('gulp-react');
const glob = require("glob");
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const htmlmin = require('gulp-htmlmin');

// const exec = require('child_process').exec;

const dist_dir = 'dist';
const dist_assets_dir = dist_dir + '/assets';

const src_sync_files = 'src/**/*.ico}';
const dist_sync_dir = dist_dir;

const src_assets_image_files = 'src/assets/**/*.{jpg,jpeg,png,gif}';
const dist_assets_image_dir = dist_assets_dir;

const src_assets_jsx_files = 'src/assets/**/*.jsx';
const dist_assets_jsx_dir = dist_assets_dir;

const src_assets_js_files = 'src/assets/**/*.{js,es6}';
const dist_assets_js_dir = dist_assets_dir;

const src_js_files = ['src/!(assets)/**/*.{js,es6}', 'src/*.{js,es6}'];
const dist_js_dir = dist_dir;

const src_assets_css_files = 'src/assets/**/*.scss';
const dist_assets_css_dir = dist_assets_dir;

const src_html_files = 'src/**/*.html';
const dist_html_dir = dist_dir;

gulp.task('clean', () => {
    return del(dist_dir);
});

gulp.task('sync', () => {
    return gulp.src(src_sync_files)
        .pipe(plumber())
        .pipe(changed(dist_sync_dir))
        .pipe(gulp.dest(dist_sync_dir));
});

gulp.task('build-js', () => {
    return gulp.src(src_js_files)
        .pipe(plumber())
        .pipe(changed(dist_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_js_dir));
});

gulp.task('uglify-js', () => {
    return gulp.src(src_js_files)
        .pipe(plumber())
        .pipe(changed(dist_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_js_dir));
});

gulp.task('build-assets-js', () => {
    return gulp.src(src_assets_js_files)
        .pipe(plumber())
        // .pipe(changed(dist_assets_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist_assets_js_dir))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_js_dir))
        .pipe(rev.manifest({
            path: 'rev-js-manifest.json',
            merge: true
        }))
        .pipe(gulp.dest(dist_assets_js_dir));

});

gulp.task('uglify-assets-js', () => {
    return gulp.src(src_assets_js_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist_assets_js_dir))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_js_dir))
        .pipe(rev.manifest({
            path: 'rev-uglify-js-manifest.json',
            merge: true
        }))
        .pipe(gulp.dest(dist_assets_js_dir));
});

gulp.task('build-assets-jsx', () => {
    return gulp.src(src_assets_jsx_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_jsx_dir))
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(rename({
            extname: '.jsx'
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist_assets_jsx_dir))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_jsx_dir))
        .pipe(rev.manifest({
            path: 'rev-jsx-manifest.json',
            merge: true
        }))
        .pipe(gulp.dest(dist_assets_jsx_dir));
});

gulp.task('uglify-assets-jsx', () => {
    return gulp.src(src_assets_jsx_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_jsx_dir))
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.jsx'
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist_assets_jsx_dir))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_jsx_dir))
        .pipe(rev.manifest({
            path: 'rev-uglify-jsx-manifest.json',
            merge: true
        }))
        .pipe(gulp.dest(dist_assets_jsx_dir));
});

gulp.task('build-assets-css', () => {
    return gulp.src(src_assets_css_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_css_dir))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist_assets_css_dir))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_css_dir))
        .pipe(rev.manifest({
            path: 'rev-css-manifest.json',
            merge: true
        }))
        .pipe(gulp.dest(dist_assets_css_dir));
});

gulp.task('uglify-assets-css', () => {
    return gulp.src(src_assets_css_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_css_dir))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist_assets_css_dir))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_css_dir))
        .pipe(rev.manifest({
            path: 'rev-uglify-css-manifest.json',
            merge: true
        }))
        .pipe(gulp.dest(dist_assets_css_dir));
});

gulp.task('min-assets-image', () => {
    return gulp.src(src_assets_image_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_image_dir))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist_assets_image_dir))
        .pipe(rev.manifest({
            path: 'rev-image-manifest.json',
            merge: true
        }))
        .pipe(gulp.dest(dist_assets_image_dir));
});

gulp.task('build-html', () => {
    return gulp.src(['dist/assets/rev-*.json',src_html_files])
        .pipe(plumber())
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(dist_html_dir));
});

gulp.task('build', () => {
    return runSequence(['sync','min-assets-image','build-js', 'uglify-js', 'build-assets-js','uglify-assets-js'
        ,'build-assets-css', 'uglify-assets-css', 'build-assets-jsx', 'uglify-assets-jsx']
        ,'build-html');
});

gulp.task('watch', () => {
    gulp.watch(src_sync_files, ['sync']);
    gulp.watch(src_js_files, ['build-js','uglify-js']);
    gulp.watch(src_assets_image_files, runSequence('min-assets-image','build-html'));
    gulp.watch(src_assets_js_files, runSequence(['build-assets-js','uglify-assets-js'],'build-html'));
    gulp.watch(src_assets_jsx_files, runSequence(['build-assets-jsx','uglify-assets-jsx'],'build-html'));
    gulp.watch(src_assets_css_files, runSequence(['build-assets-css','uglify-assets-css'],'build-html'));
    gulp.watch(src_html_files, ['build-html']);
});
