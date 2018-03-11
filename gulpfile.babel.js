'use strict'

// Modulos
import gulp from 'gulp'
import sass from 'gulp-sass'
import webserver from 'gulp-webserver'
import gutil from 'gulp-util'
import concat from 'gulp-concat'
import minify from 'gulp-minify'
import babelify from "babelify"
import browserify from 'browserify'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import svgSprite from 'gulp-svg-sprite'
import autoprefixer from 'gulp-autoprefixer'
import nunjucks from 'gulp-nunjucks'
import fs from 'fs'

// Configuration for Gulp
const config = {
  js: {
    src: 'src/index.js',
    watch: ['src/**/*.js'],
    outputDir: 'public/js/',
    outputFile: 'app.js'
  },
  css: {
    watch: ['scss/**/*.scss'],
    outputDir: 'public/css/'
  },
}

// Scripts
gulp.task('scripts', () => {
  let b = browserify({
    entries: config.js.src,
    debug: true,
    transform: [babelify]
  })
  return b.bundle()
    .on('error', function(err) {
      gutil.log(err.message)
      this.emit('end')
    })
    .pipe(source(config.js.outputFile))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.outputDir))
})

// Scripts watch
gulp.task('scripts:watch', () => {
  return gulp.watch(config.js.watch, ['scripts'])
})

// Scripts minify
gulp.task('compress', ['scripts'], () => {
  return gulp.src(config.js.outputDir + config.js.outputFile)
    .pipe(minify({
      ext: { min:'.min.js' }
    }))
    .pipe(gulp.dest(config.js.outputDir))
})

// Sass
gulp.task('sass', () => {
  return gulp.src(config.css.watch)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 6 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(config.css.outputDir))
})

// Sass watch
gulp.task('sass:watch', () => {
  return gulp.watch(config.css.watch, ['sass'])
})

// SVG
gulp.task('svg', () => {
  return gulp.src('svgs/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../svgsprite.svg'
        }
      }
    }))
    .pipe(gulp.dest('./public/'))
})

// SVG watch
gulp.task('svg:watch', () => {
  return gulp.watch('svgs/*.svg', ['svg'])
})

// Templates
gulp.task('template', () => {
  const settings_data = JSON.parse(fs.readFileSync('./settings/data.json'))
  const _nunjucks = require('nunjucks')
  const customEnv = new _nunjucks.Environment(new _nunjucks.FileSystemLoader('./views'))

  customEnv.addFilter('icon', function(name) {
    return `
      <svg class="svg-icon svg-icon-${name}">
        <use xlink:href="svgsprite.svg#${name}" />
      </svg>
    `
  })

  return gulp.src('./views/*.html')
    .pipe(
      nunjucks.compile(settings_data, {
        env: customEnv
      }).on('error', function (err) {
        console.log('nunjucks error: ', err.message)
        this.emit('end')
      })
    )
    .pipe(gulp.dest('./public'))
})

// Templates watch
gulp.task('template:watch', () => {
  return gulp.watch(['views/**/*.html', 'settings/*.json'], ['template'])
})

// Webserver
gulp.task('ws', ['sass', 'sass:watch', 'scripts:watch', 'svg:watch', 'template:watch'], () => {
  return gulp.src('public')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }))
})

// Default
gulp.task('default', ['sass', 'compress', 'template'])
