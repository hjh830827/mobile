# project-front-nuxt

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# 도커 생성 로컬용 테스트

1. 도커 운영체제에 맞는 도커를 설치.
2. 현재 프로젝트 폴더에서 아래 명령어 수행. 도커 이미지 docker build -t front/test .
3. 도커 기동 docker run -it -p 3000:3000 front/test
4. 로컬 브라우저상에서 localhost:3000 작성한 페이지 확인.

기타 관련 정보 도커 이미지/컨테이너 정보는 도커 대시보드에서 살펴볼것. (컨테이너 중지/기동(기동시 포트정보 3000:3000 ))

# 나중에 노드 환경 설정 뒤에 설정에 맞는 도커 파일 재수정 예정임.
