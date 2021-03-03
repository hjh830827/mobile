import wrapAxios from 'zipkin-axios';
import { HttpLogger } from 'zipkin-transport-http';
import { Tracer, ExplicitContext, BatchRecorder } from 'zipkin';
import axios from '~/plugins/axios';

let zipkinAxios;

try {
  // Setup zipkin components
  const ctxImpl = new ExplicitContext();
  const recorder = new BatchRecorder({
    logger: new HttpLogger({
      endpoint: `${process.env.ZIPKIN_SERVER_URL}api/v1/spans`
    })
  });
  const tracer = new Tracer({ ctxImpl, recorder });

  // Wrapp an instance of axios
  zipkinAxios = wrapAxios(axios, { tracer, serviceName: 'bff-module-front' });
} catch (e) {
  console.log(e);
}

export default ({ app }, inject) => {
  inject('axios', zipkinAxios);
};
