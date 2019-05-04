// Gulp.js configuration
"use strict";

//source and build folders
const dir = {
  src: "./assets/src/",
  build: "./assets/build/",
  root: "./"
},
  // Gulp and plugins
  gulp = require("gulp"),
  gutil = require("gulp-util"),
  imagemin = require("gulp-imagemin"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  // concat = require("gulp-concat"),
  stripdebug = require("gulp-strip-debug"),
  uglify = require("gulp-uglify"),
  sourcemaps = require("gulp-sourcemaps"),
  // babel = require("gulp-babel"),
  gulpImport = require("gulp-imports"),
  livereload = require('gulp-livereload');




//- CSS
//config
var css = {
  src: dir.src + "scss/*.scss",
  watch: dir.src + "scss/**/*.scss",
  build: dir.build,
  sassOpts: {
    outputStyle: "expanded",
    //   imagePath       : images.build,
    precision: 3,
    errLogToConsole: true,
    includePaths: ['scss/**/*.scss']

  },
  processors: [
    require("postcss-assets")({
      // loadPaths: ['images/'],
      basePath: dir.build,
      baseUrl: "/"
    }),
    require("autoprefixer")({
      browsers: ["last 2 versions", "> 2%"]
    }),
    require("css-mqpacker"),
    require("cssnano")
  ]
};

// CSS processing task
gulp.task("css", () =>
{
  return gulp
    .src(css.src)
    .pipe(sourcemaps.init())
    .pipe(sass(css.sassOpts))
    .pipe(postcss(css.processors))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(css.build))
    .pipe(livereload());
});

//-Javascript
//head config
const jshead = {
  src: dir.src + "js/head.js", //*/
  build: dir.build + "./",
  watch: dir.src + "js/**/*.js" //*/
};

// JS head processing task
gulp.task("jshead", function ()
{
  return gulp
    .src(jshead.src)
    .pipe(sourcemaps.init())
    .pipe(gulpImport())
    //.pipe(uglify())
    //.pipe(stripdebug())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(jshead.build))
    .pipe(livereload());
});

// footer config
const jsfooter = {
  src: dir.src + "js/footer.js", //*/
  build: dir.build + "./",
  watch: dir.src + "js/**/*.js" //*/
};

// JS footer processing task
gulp.task("jsfooter", function ()
{
  return gulp
    .src(jsfooter.src)
    .pipe(sourcemaps.init())
    .pipe(gulpImport())
    .pipe(uglify())
    .pipe(stripdebug())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(jsfooter.build));
});

gulp.task("js", ["jshead", "jsfooter"]);

//- Build
gulp.task("build", ["css", "js"]);

//- Watch

gulp.task("watch", () =>
{
  livereload.listen();
  gulp.watch(css.watch, ["css"]);

  gulp.watch(jshead.watch, ["jshead"]);

  gulp.watch(jsfooter.watch, ["jsfooter"]);


});

// default task
gulp.task("default", ["build", "watch"]);

//- Image Uploads optimization

gulp.task("image", () =>
  gulp
    .src("../../uploads/**/*")
    .pipe(
      imagemin({
        verbose: true
      })
    )
    .pipe(gulp.dest("../../uploads/"))
);
