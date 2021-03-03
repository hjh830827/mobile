const { Nuxt, Builder } = require('nuxt');
const cors = require('cors');
const xmlJs = require('xml-js');
const app = require('express')();
const port = process.env.PORT || 3000;

// We instantiate Nuxt.js with the options
const config = require('./nuxt.config.js');
const nuxt = new Nuxt(config);
app.use(nuxt.render);
app.use(cors((_, callback) => {
  // 상용 환경이 아닌 경우 `CORS` 허용
  const corsOptions = {
    origin: true, // currentEnvironment !== ENVIRONMENT.PRODUCTION,
    credentials: true,
  };
  callback(null, corsOptions);
}))


// 실제로는 /api 라우트를 처리하는 메소드가 된다.
app.get('/api/epost', (req, res) => {
  const address = decodeURIComponent(req.query.address);
  const params = {
    regkey: 'ef176844b004b7fbe1609922073084',
    target: 'postNew',
    query: address,
    // TODO: 추가로 페이징 처리 필요
    countPerPage: 50,
    currentPage: 1
  };
  axios.get('http://biz.epost.go.kr/KpostPortal/openapi2', {
    params
  }).then((epostRes) => {
    if (!epostRes || epostRes.status !== 200) {
      throw epostRes;
    }
    const response = xmlJs.xml2js(epostRes.data, {
      compact: true,
      ignoreDeclaration: true,
      cdataKey: 'value',
      textKey: 'value'
    })

    if (Object.keys(response)[0] === 'error') {
      throw response;
    }
    const postInfo = response.post;
    const list = [];
    postInfo.itemlist.item.forEach((item, index) => {
      const updateData = {};
      const keys = Object.keys(item)
      keys.forEach((val) => {
        updateData[val] = item[val].value;
      })
      list.push(updateData);
    });
    res.send({
      code: epostRes.status,
      result: {
        list,
        totalCount: parseInt(postInfo.pageinfo.totalCount.value, 10),
        totalPage: parseInt(postInfo.pageinfo.totalPage.value, 10),
        currentPage: parseInt(postInfo.pageinfo.currentPage.value, 10),
        countPerPage: parseInt(postInfo.pageinfo.countPerPage.value, 10)
      }
    })
  }).catch((error) => {
    console.error(error)
    const status = error.status || 203;
    const message = error.error && error.error.error_code ? {
      code: error.error.error_code.value,
      result: error.error.message.value
    } : error.message
    res.status(status)
    res.send(message)
    // error 발생시 에러 화면 노출
  })
})

// Build only in dev mode
if (config.dev) {
  new Builder(nuxt).build();
}

// Listen the server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
