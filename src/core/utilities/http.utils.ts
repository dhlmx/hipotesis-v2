import { IHttpResponse } from '../interfaces/http/ihttp-response';
import { IPhpError } from '../interfaces/php/iphp-error';
import { IPhpJsonSintaxError } from '../interfaces/php/iphp-json-sintax-error';
import { IPhpResponse } from '../interfaces/php/iphp-response';
import { IPhpPdoError } from '../interfaces/php/iphp-pdo-error';
import { ISqlResponse } from '../interfaces/sql/isql-response';
import { IHttpResponseExtended } from '../interfaces/http/ihttp-response-extended';

export const isIHttpResponse = (entity: any): entity is IHttpResponse => {
  const test = entity as IHttpResponse;
  return test.status !== undefined
    && test.code !== undefined
    && test.message !== undefined
    && test.data !== undefined;
},

isIHttpResponseExtended = (entity: any): entity is IHttpResponseExtended => {
  const test = entity as IHttpResponseExtended;
  return test.body !== undefined
    && test.headers !== undefined
    && test.ok !== undefined
    && test.status !== undefined
    && test.statusText !== undefined
    && test.url !== undefined;
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

isSqlResponse = (entity: any): entity is ISqlResponse => {
  const test = entity as ISqlResponse;
  return test.affectedRows !== undefined;
},

toIHttpResponse = (source: IPhpResponse): IHttpResponse => {
  return {
    code: source.status,
    status: source.statusText,
    message: source.message,
    data: source.data
  };
},

toSqlResponse = (data: any): ISqlResponse => {
  const sqlResponse: ISqlResponse = {} as ISqlResponse;
  if (isSqlResponse(data)) {
    sqlResponse.lastIdentityId = data.lastIdentityId ? data.lastIdentityId : 0;
    sqlResponse.affectedRows = data.affectedRows;
  } else {
    console.error('Invalid SQL Response', data);
    sqlResponse.lastIdentityId = 0;
    sqlResponse.affectedRows = 0;
  }
  return sqlResponse;
};
