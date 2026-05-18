import { HttpErrorResponse } from '@angular/common/http';

// Services & Utilities
import { isIPhpError, isIPhpJsonSintaxError } from './http.utils';

// Interfaces, Models & Types
import { ErrorType } from '../types/general';
import { HttpResponse } from '../models/http/http-response';
import { IHttpResponse } from '../interfaces/http/ihttp-response';

// Constants & Enums
import { HttpResponseCode, HttpResponseStatus } from '../enums/http';
import { ERROR_DUPLICATE_ENTRY, ERROR_NOT_IDENTIFIED, ERROR_PDO_DUPLICATE_ENTRY, ERROR_PDO_SQL_SYNTAX, ERROR_SQL_SYNTAX, ERROR_UTILITIES_NAME, ERROR_WITHOUT_DESCRIPTION } from '../constants/error';

export const handleError = (response: HttpErrorResponse): HttpResponse => {
  const httpResponse: IHttpResponse = {
    status: HttpResponseStatus.OK,
    code: HttpResponseCode.OK,
    message: '',
    data: null
  };

  if (!response.ok) {
    httpResponse.message = translateError(parseErrorMessage(response.error));
    return new HttpResponse(httpResponse);
  }

  if (response.message) {
    httpResponse.message = translateError(response.message, response.status.toString());
    return new HttpResponse(httpResponse);
  }

  if (response.error) {
    httpResponse.message = translateError(parseErrorMessage(response.error));
    return new HttpResponse(httpResponse);
  }

  console.warn(ERROR_NOT_IDENTIFIED, ERROR_UTILITIES_NAME, 'handleError()', response, httpResponse);
  return new HttpResponse(httpResponse);
},

parseErrorMessage = (entity: ErrorType): string => {
  if (entity instanceof HttpErrorResponse) {
    if (entity.error) {
      return parseErrorMessage(entity.error);
    } else if (entity.message) {
      return entity.message;
    }
  }

  if (entity instanceof ErrorEvent) {
    return entity.message;
  }

  if (isIPhpError(entity)) {
    return entity.text;
  }

  if (isIPhpJsonSintaxError(entity)) {
    return entity.message;
  }

  return '';
},

translateError = (message: string, status?: string): string => {
  if (!message) {
    return ERROR_WITHOUT_DESCRIPTION;
  }

  if (message.includes(ERROR_PDO_DUPLICATE_ENTRY)) {
    return ERROR_DUPLICATE_ENTRY;
  } else if (message.includes(ERROR_PDO_SQL_SYNTAX)) {
    return ERROR_SQL_SYNTAX;
  }

  console.warn(ERROR_NOT_IDENTIFIED, ERROR_UTILITIES_NAME, 'translateError()', message, status);
  return ERROR_NOT_IDENTIFIED;
};
