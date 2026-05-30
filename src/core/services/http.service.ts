import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Services & Utilities
import { isIHttpResponse, isIHttpResponseExtended, isIPhpResponse, toIHttpResponse } from '../utilities/http.utils';
import { handleError } from '../utilities/error.utils';

// Interfaces & Models
import { HttpResponse } from '../models/http/http-response';
import { IHttpFileOptions } from '../interfaces/http/ihttp-file-options';
import { IHttpOptions } from '../interfaces/http/ihttp-options';
import { IHttpResponse } from '../interfaces/http/ihttp-response';

// Enums & Constants
import { HttpResponseCode, HttpResponseStatus } from '../enums/http';
import { ALL, APPLICATION_JSON, BEARER, CALLBACK,
  HEADER_ACCEPT, HEADER_AUTHORIZATION, HEADER_CACHE_CONTROL, HEADER_CONTENT_TYPE,
  NO_CACHE } from '../constants/http';

const { api } = environment;

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private readonly http: HttpClient) { }

  get(
    url: string,
    options: IHttpOptions = this.getCommonOptions()
  ): Observable<HttpResponse> {
    return this.http.get<IHttpResponse>(url, options).pipe(
      map((response: any) => this.handleResponse(response)),
      catchError((err: any) => of(handleError(err)))
    );
  }

  getCommonHeaders(accept?: string, contentType?: string, authorization?: string): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append(HEADER_ACCEPT, accept ?? ALL);
    headers.append(HEADER_CACHE_CONTROL, NO_CACHE);
    headers.append(HEADER_CONTENT_TYPE, contentType ?? APPLICATION_JSON);

    if (authorization) {
      headers.append(HEADER_AUTHORIZATION, `${BEARER}: ${authorization}`);
    }
    return headers;
  }

  getCommonOptions(pHeaders?: HttpHeaders, options?: IHttpOptions): any {
    return {
      headers: pHeaders ?? this.getCommonHeaders(),
      ...options ?? { responseType: 'json', observe: 'response', withCredentials: false }
    };
  }

  getFileHeaders(accept?: string, authorization?: string): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append(HEADER_ACCEPT, accept ?? ALL);
    headers.append(HEADER_CACHE_CONTROL, NO_CACHE);

    if (authorization) {
      headers.append(HEADER_AUTHORIZATION, `${BEARER}: ${authorization}`);
    }
    return headers;
  }

  getFileOptions(pHeaders?: HttpHeaders, fileOptions?: IHttpFileOptions): any {
    return {
      headers: pHeaders ?? this.getFileHeaders(),
      ...fileOptions ?? { responseType: 'blob', observe: 'response', withCredentials: false }
    };
  }

  handleResponse(response: any): HttpResponse {
    if (!response) {
      return new HttpResponse({
        status: HttpResponseStatus.OK,
        code: HttpResponseCode.OK,
        message: 'Original response is NULL',
        data: null
      });
    }

    if (isIHttpResponseExtended(response)) {
      if (response.body instanceof Blob) {
        return new HttpResponse({ status: response.statusText, code: response.status, message: 'Blob handled correctly', data: response.body });
      } else if (isIPhpResponse(response.body)) {
        response.body.status = response.status;
        response.body.statusText = response.statusText;
        return new HttpResponse(toIHttpResponse(response.body));
      } else if (isIHttpResponse(response.body)) {
        response.body.code = response.status;
        response.body.status = response.statusText;
        return new HttpResponse(response.body);
      }
      return new HttpResponse({ status: response.statusText, code: response.status, message: '', data: response.body });
    }

    if (isIPhpResponse(response)) {
      return new HttpResponse(toIHttpResponse(response));
    }

    if (isIHttpResponse(response)) {
      return new HttpResponse(response);
    }

    return new HttpResponse({
      status: HttpResponseStatus.OK,
      code: HttpResponseCode.OK,
      message: 'Response type not identified',
      data: response
    });
  }

  jsonP(url: string): Observable<HttpResponse> {
    return this.http.jsonp<IHttpResponse>(url, CALLBACK).pipe(
      map((response: any) => this.handleResponse(response)),
      catchError((err: any) => of(handleError(err)))
    );
  }

  post(
    url: string,
    body: any = {},
    options: IHttpOptions = this.getCommonOptions()
  ): Observable<HttpResponse> {
    return this.http.post<IHttpResponse>(url, body, options).pipe(
      map((response: any) => this.handleResponse(response)),
      catchError((err: any) => of(handleError(err)))
    );
  }

  put(
    url: string,
    body: any = {},
    options: IHttpOptions = this.getCommonOptions()
  ): Observable<HttpResponse> {
    return this.http.put<IHttpResponse>(url, body, options).pipe(
      map((response: any) => this.handleResponse(response)),
      catchError((err: any) => of(handleError(err)))
    );
  }
}
