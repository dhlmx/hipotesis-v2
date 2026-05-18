import { IHttpResponse } from '../interfaces/http/ihttp-response';
import { IPhpError } from '../interfaces/php/iphp-error';
import { IPhpJsonSintaxError } from '../interfaces/php/iphp-json-sintax-error';
import { IPhpResponse } from '../interfaces/php/iphp-response';
import { IPhpPdoError } from '../interfaces/php/iphp-pdo-error';

export const isIHttpResponse = (entity: any): entity is IHttpResponse => {
  const test = entity as IHttpResponse;

  return test.status !== undefined
    && test.code !== undefined
    && test.message !== undefined
    && test.data !== undefined;
},

isIPhpError = (entity: any): entity is IPhpError => {
  const test = entity as IPhpError;
  return test.error !== undefined && test.text !== undefined;
},

isIPhpJsonSintaxError = (entity: any): entity is IPhpJsonSintaxError => {
  const test = entity as IPhpJsonSintaxError;

  return test.columnNumber !== undefined
    && test.fileName !== undefined
    && test.lineNumber !== undefined
    && test.message !== undefined
    && test.stack !== undefined;
},

isIPhpPdoError = (entity: any): entity is IPhpPdoError => {
  const test = entity as IPhpPdoError;

  return test.sqlState !== undefined
    && test.code !== undefined
    && test.message !== undefined;
},

isIPhpResponse = (entity: any): entity is IPhpResponse => {
  const test = entity as IPhpResponse;

  return test.status !== undefined
    && test.statusText !== undefined
    && test.message !== undefined
    && test.data !== undefined;
},

toIHttpResponse = (source: IPhpResponse): IHttpResponse => {
  return {
    code: source.status,
    status: source.statusText,
    message: source.message,
    data: source.data
  };
};
