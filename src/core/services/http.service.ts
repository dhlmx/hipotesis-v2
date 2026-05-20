import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FileUploadEvent } from 'primeng/types/fileupload';
import { environment } from '../../environments/environment';

// Services & Utilities
import { isIHttpResponse, isIPhpResponse, toIHttpResponse } from '../utilities/http.utils';
import { handleError } from '../utilities/error.utils';

// Interfaces & Models
import { HttpResponse } from '../models/http/http-response';
import { IHttpOptions } from '../interfaces/http/ihttp-options';
import { IHttpResponse } from '../interfaces/http/ihttp-response';
import { ISqlQuery } from '../interfaces/sql/isql-query';

// Enums & Constants
import { HttpResponseCode, HttpResponseStatus } from '../enums/http';
import { ALL, APPLICATION_JSON, ARRAY_BUFFER, BEARER, CALLBACK, EVENTS, HEADER_ACCEPT, HEADER_AUTHORIZATION, HEADER_CONTENT_TYPE } from '../constants/http';

const { api } = environment;

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  image: ArrayBuffer = new ArrayBuffer(0) ;
  progress = 0;

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

  getImage(url: string): Observable<void> {
    return this.http.get(url, { responseType: ARRAY_BUFFER, observe: EVENTS }).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.progress = event?.total ? Math.round((event.loaded / event.total) * 100) : 0;
          console.log(`Image loading progress: ${this.progress}%`);
        } else if (event.type === HttpEventType.Response) {
          this.image = event.body;
        }
      })
    );
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

  postExecuteSQLQuery = (data: ISqlQuery): Observable<HttpResponse> => {
    return this.post(
      `${api.host}${api.basePath ? '/' : ''}${api.basePath}/${api.resources.postExecuteSQLQuery}`,
      data
    ).pipe(
      map((response: any) => this.handleResponse(response)),
      catchError((err: any) => of(handleError(err)))
    );
  }

  postUploadFile(targetPath: string, fileName: string, file: Blob): Observable<HttpResponse> {
    const formData = new FormData();

    formData.append('file', file, fileName);
    formData.append('targetPath', `/${targetPath}`);

    return this.http.post(
      `${api.host}${api.basePath ? '/' : ''}${api.basePath}/${api.resources.postUploadFile}`,
      formData
    ).pipe(
      map((response: any) => this.handleResponse(response)),
      catchError((err: any) => of(handleError(err)))
    ).pipe(
      map(response => new HttpResponse(response))
    );
  }

  postUploadFileByEvent(targetPath: string, event: FileUploadEvent): Observable<HttpResponse> {
    const formData = new FormData();

    formData.append('file', event.files[0], event.files[0].name);
    formData.append('targetPath', `/${targetPath}`);

    return this.http.post(
      `${api.host}${api.basePath ? '/' : ''}${api.basePath}/${api.resources.postUploadFile}`,
      formData
    ).pipe(
      map((response: any) => this.handleResponse(response)),
      catchError((err: any) => of(handleError(err)))
    ).pipe(
      map(response => new HttpResponse(response))
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

  // Private Methods
  private getCommonHeaders(accept?: string, contentType?: string, authorization?: string): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append(HEADER_ACCEPT, accept ?? ALL);
    headers.append(HEADER_CONTENT_TYPE, contentType ?? APPLICATION_JSON);

    if (authorization) {
      headers.append(HEADER_AUTHORIZATION, `${BEARER}: ${authorization}`);
    }
    return headers;
  }

  private getCommonOptions(headers?: HttpHeaders): IHttpOptions {
    return headers ? { headers } : { headers: this.getCommonHeaders() };
  }

  private handleResponse(response: any): HttpResponse {
    if (isIPhpResponse(response)) {
      return new HttpResponse(toIHttpResponse(response));
    }

    if (isIHttpResponse(response)) {
      return new HttpResponse(response);
    }

    return new HttpResponse({
      status: HttpResponseStatus.OK,
      code: HttpResponseCode.OK,
      message: 'Original response is not an IHttpResponse entity',
      data: response
    });
  }
}
