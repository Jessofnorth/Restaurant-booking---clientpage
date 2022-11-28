const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const terser = require('gulp-terser');

// directorys
//directorys
const files = {
    htmlPath: "src/**/*.html",
    sassPath: 'src/sass/**/*.scss',
    tsPath: 'src/typescript/*.ts',
    imgPath: 'src/img/*',
    webpPath: 'src/img/*.jpg'
}

//HTML-task, copy HTML to pub, browsersync watching for changes
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub'))
        .pipe(browserSync.stream());
}

// Sass task, compile sass to css and copy to pub directory. Sourcemaps and browsersync used also
function sassTask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on("error", sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest("pub/css"))
        .pipe(browserSync.stream());
}

// typescript task - transpile Typescript to JS, move files
function typescriptTask() {
    return src(files.tsPath, { sourcemaps: true })
        .pipe(tsProject())
        .pipe(terser())
        .pipe(dest('pub/js'))
        .pipe(browserSync.stream());

}

//IMG-task, copy IMG to pub, browsersync watching for changes
function imgTask() {
    return src(files.imgPath)
        // minify images with these settings
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('pub/img'))
        .pipe(browserSync.stream());
}

// WEBP-task, convert JPG to WEBP
function webpTask() {
    return src(files.webpPath)
        .pipe(webp())
        .pipe(dest('pub/img'))
        .pipe(browserSync.stream());
}

//Watch-task, browsersync watching for changes
function watchTask() {
    browserSync.init({
        server: './pub'
    });
    watch([files.htmlPath, files.sassPath, files.tsPath, files.imgPath, files.webpPath], parallel(sassTask, copyHTML, typescriptTask, imgTask, webpTask)).on('change', browserSync.reload);
}

// export
exports.default = series(parallel(sassTask, copyHTML, typescriptTask, imgTask, webpTask), watchTask);