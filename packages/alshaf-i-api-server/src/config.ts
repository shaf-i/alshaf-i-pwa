import {config} from 'dotenv';

import {createLogger} from './@alwatr/logger/src/logger.js';

export const logger = createLogger('api-server');

// load config from .env file
if (process.env.DEBUG_MODE == 'production') {
  config();
}
export const port: number = parseInt(process.env.PORT || '') || 8080;
export const allowOriginHost: string = process.env.ALLOW_ORIGIN_HOST || '*';

// load token from .env file
config({path: '../../.env'})
export const apiToken: string | undefined = process.env.API_TOKEN;
if (apiToken === undefined) {
  logger.accident('load_token', 'undefined_token', 'Cannot load token from .env file')
  process.exit(1)
}

export const jsonFilePath = 'data/user.json';
