// grab our gulp packages
var gulp            = require('gulp'),
    browserSync     = require('browser-sync').create(),
    glob            = require("glob"),
    gutil           = require('gulp-util'),
    sourcemaps      = require('gulp-sourcemaps'),
    rename          = require('gulp-rename'),
    bower           = require('gulp-bower'),

    jshint          = require('gulp-jshint'),
    include         = require("gulp-include"),
    uglify          = require('gulp-uglify'),

    sass            = require('gulp-sass'),
    sassLint        = require('gulp-sass-lint'),
    cssnano         = require('gulp-cssnano'),
    combineMq       = require('gulp-combine-mq'),
    autoprefixer    = require('gulp-autoprefixer'),

    imagemin        = require('gulp-imagemin'),
    cache           = require('gulp-cache');


var assetPath       = "public/assets/",
    bowerPath       = "bower_components/";

// define the default task and add the watch task to it
gulp.task('default', ['serve']);

// bower
gulp.task('bower', function () {
    return bower();
});

// html: nunjucks
// gulp.task('twig', function() {
//     return gulp.src('app/templates/pages/*.+(html|twig)')
//         .pipe(data(function(file) {
//             return require('./app/data/data.json');
//         }))
//         .pipe(twig())
//         .pipe(rename(function(opt) {
//             opt.basename = opt.basename.replace(/\.html/, '');
//             extname = '.html';
//             return opt;
//         }))
//         .pipe(gulp.dest('app'));
// });


// compress images
gulp.task('images', function () {
    return gulp.src(assetPath + 'images')
        .pipe(cache(imagemin(
            { 
                optimizationLevel: 5, 
                progressive: true, 
                interlaced: true 
            }
        )))
        .pipe(gulp.dest(assetPath + 'images'));
});

// process icon sprites
// gulp.task('sprite', function () {
//     var spriteData = gulp.src(assetPath + 'images/sprites/**/*.png')
//         .pipe(spritesmith(
//             {
//                 spritesmith: function (options, sprite) {
//                     options.imgPath = '../images/sprites/' + options.imgName;
//                     options.cssName = sprite + '.scss';
//                     options.padding = 2;
//                     cssSpritesheetName = 'sp-' + sprite;
//                 }
//             }
//         ))
//             .on('error', function (err) {
//                 console.log(err);
//             });
//     return (
//         spriteData.img.pipe(gulp.dest(assetPath + 'images/sprites')),
//         spriteData.css.pipe(gulp.dest(assetPath + 'css/_scss/partials/modules/sprites'))
//     );    
// });

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src(assetPath + 'js/src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        // .pipe(include(
        //     {
        //         includePaths: ['bower_components/']
        //     }
        // ))
        //     .on('error', console.log)
        .pipe(gulp.dest(assetPath + 'js'))
        .pipe(rename(
            { suffix: '.min' }
        ))
        .pipe(uglify())
        .pipe(gulp.dest(assetPath + 'js'));
});

// create a task that ensures the `js` task is complete
// before reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// process sass
gulp.task('sass', function () {
    return gulp.src(assetPath + 'css/*.scss')
        // .pipe(sourcemaps.init())  // Process the original sources
        .pipe(sass(
            {
                includePaths: ['bower_components/']
            }
        ))
            .on('error', sass.logError)
        .pipe(combineMq({
            beautify: true
        }))
        .pipe(autoprefixer())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(assetPath + 'css'))
        .pipe(sassLint())
        // .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(browserSync.stream())
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest(assetPath + 'css'));
});

// Static server
gulp.task('serve', function () {
    browserSync.init({
        proxy: "http://football.local/",
        host: "192.168.0.70",
        // server: { 
        //     baseDir: "public"
        // },
        reloadOnRestart: true,
        // notify: false
    });
    gulp.watch(assetPath + 'css/*.scss', ['sass']);
    gulp.watch(assetPath + 'js/src/*.js', ['js-watch']);
    gulp.watch('public/*.html').on('change', browserSync.reload);
});