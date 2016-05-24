var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    prettify = require('gulp-prettify'),
    clean = require('gulp-clean'),
    webserver = require('gulp-webserver');


var path = {
    build: {
        root: 'build/',
        html: 'build/',
        css: 'build/css/',
        js: 'build/js/',
        img: 'build/images/',
        fonts: 'build/fonts/',
        assets: 'build/external/'
    },
    src: {
        jade: 'src/templates/*.jade',
        sass: 'src/sass/*.scss',
        js: 'src/js/*.js',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        assets: 'src/external/**/*.*',
    },
    watch: {
        jade: 'src/templates/**/*.jade',
        sass: 'src/sass/**/*.scss',
        js: 'src/js/*.js',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        assets: 'src/external/**/*.*'
    }
};
// SERVER

gulp.task('webserver', function() {
    gulp.src('build')
        .pipe(webserver({
            //livereload: true,
            open: true,
            port: 8080
        }));
});
// HTML
gulp.task('html:build', function() {
    gulp.src(path.src.jade)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(prettify({
            indent_size: 4
        }))
        .pipe(gulp.dest(path.build.html))

    return gulp.src('build/*.html', {
            read: false
        })
        .pipe(clean())
});

// CSS
gulp.task('style:build', function() {
    gulp.src(path.src.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 30 versions']
        }))
        .pipe(gulp.dest(path.build.css));
    return gulp.src('build/css/*.css', {
            read: false
        })
        .pipe(clean())
});

// JS
gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.js));
    return gulp.src('build/js/*.js', {
            read: false
        })
        .pipe(clean())
});

// IMAGES
gulp.task('image:build', function() {
    gulp.src(path.src.img)
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
    return gulp.src('build/images/**/*.*', {
            read: false
        })
        .pipe(clean())
});

// FONTS
gulp.task('font:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

// Assets
gulp.task('asset:build', function() {
    gulp.src(path.src.assets)
        .pipe(gulp.dest(path.build.assets));
});

gulp.task('build', [
    'html:build',
    'style:build',
    'js:build',
    'image:build',
    'font:build',
    'asset:build',
    'webserver'
]);

gulp.task('watch', function() {

    watch([path.watch.jade], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('font:build');
    });
    watch([path.watch.assets], function(event, cb) {
        gulp.start('asset:build');
    });

});

gulp.task('default', ['build', 'watch']);
