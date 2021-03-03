# generate 실행
npm run generate

# dist 폴더로 이동
cd dist

# html 폴더 생성 후 파일 이동
mkdir html
mv index.html ./html
mv ./skt-product-select/index.html ./html/skt-product-select.html
mv ./order-confirm/index.html ./html/order-confirm.html
mv 404.html ./html

# static 폴더 생성 후 파일 이동
mkdir static
mv _nuxt ./static/js
mv images ./static
mv fonts ./static
mv favicon.ico ./static/images/

# 기존 폴더 삭제
rm -rf skt-product-select
rm -rf order-confirm

# html 파일 내 경로 변경
cd ..
gulp



