import { myAppName } from '../const/app-name';
import { log } from './log';

// this is logger

const logLogger = (x) => log('>>> ', myAppName,', logger -> ', x);

export { logLogger as log };