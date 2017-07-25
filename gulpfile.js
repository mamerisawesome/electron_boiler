const gulp = require('gulp')
const pug = require('gulp-pug')
const gulp_min_js = require('gulp-uglify')
const gulp_min_css = require('gulp-clean-css')
const pump = require('pump')

const sh = require('shelljs')
const fs = require('fs')
const rimraf = require('rimraf')
const _ = require('lodash')

const checkIfExist = (src, cb) => {
    if (fs.existsSync(src)) {
        return cb
    } else {
        return () => {
            console.log('[404] ' + src)
        }
    }
}

gulp.task('clean', () => {
    checkIfExist('build', rimraf)('build/*', () => {
        return
    })
})

gulp.task('pugger', () => {
    checkIfExist('build/views', rimraf)('build/views/*', () => {
        return
    })

    return gulp.src('src/views/*.pug')
        .pipe(pug({
            data: {},
            verbose: true
        }))
        .pipe(gulp.dest('build/views/'));
})

gulp.task('assets', (cb) => {
    assets = [
        'node_modules/jquery/dist/jquery.js',
        'semantic/dist/semantic.js',
        'src/public/js/script.js',
        'semantic/dist/semantic.css',
        'src/public/css/style.css'
    ]

    _.some(assets, (src) => {
        let fname = src.split('/').pop()
        let ftype = fname.split('.').pop()

        checkIfExist(src, sh.cp)(src, 'src/public/' + ftype + '/' + fname)
    })
})

gulp.task('minify_css', (cb) => {
    pump([
        gulp.src('src/public/css/*'),
        gulp_min_css({compatibility: 'ie8'}),
        gulp.dest('build/public/css')
    ], cb)
})

gulp.task('minify_js', (cb) => {
    pump([
        gulp.src('src/public/js/*'),
        gulp_min_js({ie8: true}),
        gulp.dest('build/public/js')
    ], cb)
})
