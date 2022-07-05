import {AlwatrMicroServer} from './@alwatr/micro-server/src/micro-server.js';

export const app = new AlwatrMicroServer(8080, undefined, {
  corsHelper: {
    allowOrigin: '*', // "http://shafi.localhost" for production
    allowMethods: '*',
    maxAge: 5 * 60, // 5 Minute
  },
});
