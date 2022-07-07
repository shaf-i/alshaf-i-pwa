import {config} from 'dotenv';

import {createLogger} from './@alwatr/logger/src/logger.js';

export const logger = createLogger('api-server');

if (process.env.DEBUG_MODE == 'production') {
  // load .env file
  config();
}
export const port: number = parseInt(process.env.PORT || '') || 8080;
export const allowOriginHost: string = process.env.ALLOW_ORIGIN_HOST || '*';
logger.logMethodArgs('load_conifg', {port: port, allow_origin_host: allowOriginHost});

export const jsonFilePath = 'data/user.json';
