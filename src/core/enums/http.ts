export enum HttpResponseCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Conflict = 409,
  TooManyRequests = 429,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504
}

export enum HttpResponseStatus {
  OK = 'OK',
  Created = 'Created',
  Accepted = 'Accepted',
  NoContent = 'No Content',
  BadRequest = 'Bad Request',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  NotFound = 'Not Found',
  MethodNotAllowed = 'Method Not Allowed',
  Conflict = 'Conflict',
  TooManyRequests = 'Too Many Requests',
  InternalServerError = 'Internal Server Error',
  NotImplemented = 'Not Implemented',
  BadGateway = 'Bad Gateway',
  ServiceUnavailable = 'Service Unavailable',
  GatewayTimeout = 'Gateway Timeout'
}
