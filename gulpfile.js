const gulp = require('gulp');
const gp = require('gulp-load-plugins') ();

const sassGlob = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const browserSync = require('browser-sync').create();

const paths = {
    build: './build',                               // paths.build
    templates: {
        pages: 'src/templates/pages/*.pug',         //paths.templates.pages
        src: 'src/templates/**/*.pug',              //paths.templates.src
    },
    styles: {
        src: 'src/styles/**/*.scss',                //paths.styles.src
        dest: 'build/styles/'                       //paths.styles.dest
    },
    css: {
        src: 'src/scripts/libs/*.css',
        dest: 'build/styles'
    },
    libs: {
        src: 'src/scripts/libs/*.js',
        dest: 'build/js'
    },    
    img: {
        src: 'src/img/**/*.*',                      //paths.img.src
        dest: 'build/img/'                          //paths.img.dest
    },
    fonts: {
        src: 'src/fonts/**/*.*',                    //paths.fonts.src
        dest: 'build/fonts/'                        //paths.fonts.dest
    },
    scripts: {
        src: 'src/scripts/**/*.js',                 //paths.scripts.src
        dest: 'build/js/'                           //paths.scripts.dest
    },
    assets: {
        src: 'src/assets/**/*.json',                 //paths.scripts.src
        dest: 'build/assets/'                           //paths.scripts.dest
    }
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(gp.plumber())
        .pipe(gp.pug({ pretty: true }))
        .pipe(gulp.dest(paths.build));
}

// scss
function styles() {
    return gulp.src('./src/styles/main.scss')
        .pipe(gp.plumber())
        //.pipe(gp.sourcemaps.init())
        .pipe(sassGlob())
        .pipe(gp.sass({outputStyle: 'compressed'}))
        .pipe(groupMediaQueries())
        .pipe(gp.autoprefixer({
            browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'],
            cascade: false
        }))
        .pipe(gp.concat('main.css'))
        //.pipe(cleanCSS())
        .pipe(gp.rename({suffix: '.min'}))
        //.pipe(gp.sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
}

// webpack
function scripts() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(gp.plumber())
        .pipe(gulpWebpack(webpackConfig, webpack)) 
        .pipe(gulp.dest(paths.scripts.dest));
}

// clean
function clean() {
    return del(paths.build);
}

// gulp watch
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.img.src, img);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.assets.src, assets);
}

// server(livereload)
function server() {
    browserSync.init({
        server: paths.build
    });
    browserSync.watch(paths.build + '/**/*.*', browserSync.reload);
}

// replace img
function img() {
    return gulp.src(paths.img.src)
        .pipe(gulp.dest(paths.img.dest));
}

//replace css
function css() {
    return gulp.src(paths.css.src)
        .pipe(gulp.dest(paths.css.dest))
}
//replace libs
function libs() {
    return gulp.src(paths.libs.src)
        .pipe(gulp.dest(paths.libs.dest))
}


// replace fonts
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}
// replace fonts
function assets() {
    return gulp.src(paths.assets.src)
        .pipe(gulp.dest(paths.assets.dest));
}


exports.templates = templates;
exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;
exports.img = img;
exports.fonts = fonts;
exports.assets = assets;
exports.watch = watch;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, img, css, assets, libs, fonts, scripts),
    gulp.parallel(watch, server)
));