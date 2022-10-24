import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { RequestSnake } from './request.types';

export const camelToSnake = (request: Request): RequestSnake =>
  snakecaseKeys(request);
export const snakeToCamel = (request: RequestSnake): Request =>
  camelcaseKeys(request);
