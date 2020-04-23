// Gulp.js configuration
"use strict";

// options for src and build folders
const dir = {
    src: "./assets/src/",
    build: "./assets/build/",
    vendor: "./assets/vendor/",
    root: "./",
    // Replace with URL of your local site
    localDevURL: "dev-colab.test/"
  },
  // gulp plugins etc
  gulp = require("gulp"),
  gutil = require("gulp-util"),
  sass = require("gulp-sass"),
  cssnano = require("cssnano"),
  autoprefixer = require("gulp-autoprefixer"),
  gulpImport = require("gulp-imports"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  plumber = require("gulp-plumber"),
  babel = require("gulp-babel"),
  postcss = require("gulp-postcss"),
  browserSync = require("browser-sync").create();

// Browser-sync
var browsersync = false;

//- CSS
//config
var scss = {
  src: dir.src + "scss/*.scss",
  watch: dir.src + "scss/**/*.scss", //*/
  build: dir.build + "scss/",
  sassOpts: {
    outputStyle: "expanded",
    //   imagePath       : images.build,
    precision: 3,
    errLogToConsole: true
  },
  processors: [
    require("postcss-assets")({
      // loadPaths: ['images/'],
      basePath: dir.build
    }),
    require("autoprefixer")(),
    require("css-mqpacker"),
    require("cssnano")
  ]
};

// SCSS processing
gulp.task(
  "scss",
  gulp.series(() => {
    return gulp
      .src(scss.src)
      .pipe(sourcemaps.init())
      .pipe(sass(scss.sassOpts))
      .pipe(postcss(scss.processors))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest(scss.build))
      .pipe(
        browsersync
          ? browsersync.reload({
              stream: true
            })
          : gutil.noop()
      );
  })
);

//- Javascript
//config
var js = {
src: dir.src + "js/*.js",
watch: dir.src + "js/**/*.js",
build: dir.build + "js/",
};

// concat and minify JavaScript
gulp.task(
  "js",
  gulp.series(() => {
    return gulp
      .src(js.src)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(gulpImport())
      // .pipe(concat("scripts.js"))
      .pipe(gulp.dest(js.build))
      .pipe(
        rename({
          suffix: ".min"
        })
      )
      // .pipe(uglify())
      .pipe(sourcemaps.write(".")) // Creates sourcemap for minified JS
      .pipe(gulp.dest(js.build))
      .pipe(
        browsersync
          ? browsersync.reload({
              stream: true
            })
          : gutil.noop()
      );
  })
);



// Browser-Sync watch files and inject changes
gulp.task(
  "dev",
  gulp.series(() => {
    // Watch files
    var files = [
      "./assets/build/scss/*.css",
      "./assets/build/js/*.js",
    ];

    browserSync.init(files, {

      proxy: dir.localDevURL
    });

    //watch scss
      gulp.watch(scss.watch, gulp.series("scss"));

    // watch js
    gulp
      .watch("./assets/src/js/*.js", gulp.series("js"))
      .on("change", browserSync.reload);
  })
);

// Watch files for changes (without Browser-Sync)
gulp.task(
    "watch",
    gulp.series(() => {
        // Watch .scss files
        gulp.watch(["./assets/src/scss/**/*.scss"], gulp.series("scss"));

        // Watch site-js files
        gulp.watch("./assets/src/js/*.js", gulp.series("js"));
    })
);

// Run scss and js compilation
gulp.task(
  "default",
    gulp.series("scss", "js")

);
