const gulp = require('gulp');
const replace = require('gulp-replace');

const srcFiles = [
  './dist/html/index.html',
  './dist/html/skt-product-select.html',
  './dist/html/order-confirm.html',
  './dist/html/404.html'
];

gulp.task('default', async function () {
  gulp.src(srcFiles).pipe(replace('/_nuxt/', '/js/')).pipe(gulp.dest('dist/html/'));
});
