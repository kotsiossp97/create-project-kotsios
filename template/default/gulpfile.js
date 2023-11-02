const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

const paths = {
    scss: "./sass/**/*.scss",
    scssMain: "./sass/style.scss",
    css: "./public/css/",
};

const compileSassDev = () => {
    return gulp
        .src(paths.scssMain)
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(gulp.dest(paths.css));
};

const compileSassProd = () => {
    return gulp
        .src(paths.scssMain)
        .pipe(
            sass.sync({ outputStyle: "compressed" }).on("error", sass.logError)
        )
        .pipe(gulp.dest(paths.css));
};

const prefixSass = () => {
    return gulp
        .src(paths.css + "style.css")
        .pipe(
            prefix({
                cascade: false,
            })
        )
        .pipe(gulp.dest(paths.css));
};

const compressCss = () => {
    return gulp
        .src(paths.css + "style.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.css));
};

const watchSass = () => {
    return gulp.watch(paths.scss, gulp.series(compileSassDev));
};

const serve = () => {
    browserSync.init({
        server: {
            baseDir: "./public",
        },
    });

    watchSass();
    gulp.watch("./**/*").on("change", browserSync.reload);
};

exports.watch = watchSass;
exports.build = gulp.series(compileSassProd, prefixSass, compressCss);
exports.serve = gulp.series(compileSassDev, serve);
