import {AlwatrMicroServer} from './@alwatr/micro-server/src/micro-server.js';
import {allowOriginHost, port} from './config.js';

export const app = new AlwatrMicroServer(port, undefined, {
  corsHelper: {
    allowOrigin: allowOriginHost,
    allowMethods: '*',
  },
});
