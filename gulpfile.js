// npx gulp で監視開始

var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var plumber = require( 'gulp-plumber' );
var notify = require( 'gulp-notify' );
var sassGlob = require( 'gulp-sass-glob' );
var mmq = require( 'gulp-merge-media-queries' );
var gulpStylelint = require( 'gulp-stylelint' );
var postcss = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var cssdeclsort = require( 'css-declaration-sorter' );

const webp = require("gulp-webp");
const tap = require("gulp-tap");
const rename = require("gulp-rename");

gulp.task( 'default', function() {
    return gulp.watch('scss/**/*.scss', function() {
        return (
      gulp
        .src( 'scss/**/*.scss' )
        .pipe( plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) }) )
        .pipe( sassGlob() )
        .pipe( sass({ outputStyle: 'expanded' }) )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( postcss([ cssdeclsort({ order: 'alphabetically' }) ]) )
        .pipe( mmq() )
        .pipe( gulp.dest( 'css' ) )
        );
    });
});

// WebPファイル自動書き出し
const srcpath = "img/";
 
gulp.task("webp", function () {
	return gulp.src(srcpath + "origin/**/*.{jpg,jpeg,png}")
		.pipe(tap(function(file,t){
			var en = file.extname; //処理中のファイルの拡張子取得
			return gulp.src(file.path, {base: srcpath + 'origin/'})
			.pipe(webp({//webp生成
				quality: 80
			}))
			.pipe(rename({//ファイル名の末尾に元の拡張子を付ける
				suffix: en
			}))
			.pipe(gulp.dest(srcpath + 'img/'));
		}));
});
