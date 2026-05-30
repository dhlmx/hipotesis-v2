import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { FileUploadEvent } from 'primeng/fileupload';
import { environment } from '../../environments/environment';

// Services & Utilities
import { HttpService } from './http.service';
import { handleError } from '../utilities/error.utils';

// Interfaces & Models
import { HttpResponse } from '../models/http/http-response';
import { IHttpOptions } from '../interfaces/http/ihttp-options';
import { ISqlQuery } from '../interfaces/sql/isql-query';
import { ISqlQueryParameters } from '../interfaces/sql/isql-query-parameters';

// Enums & Constants
const { api } = environment;

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  image: ArrayBuffer = new ArrayBuffer(0) ;
  progress = 0;

  constructor(private readonly httpService: HttpService) { }

  // , { responseType: 'arraybuffer', observe: 'events' } as IHttpOptions
  /*
  getImage(url: string): Observable<void> {
    return this.httpService.get(url).pipe(
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
  */

  getTable(params: ISqlQueryParameters): Observable<HttpResponse> {
    return this.httpService.get(this.getTableUrl(params));
  }

  postCreateFile(file: Blob, isActive: boolean): Observable<HttpResponse> {
    const formData = new FormData();
    formData.append('isActive', `${ isActive ? 1 : 0 }`);
    formData.append('file', file);

    return this.httpService.post(
      `${api.host}${api.basePath ? '/' : ''}${api.basePath}/${api.resources.postCreateFile}`,
      formData
    ).pipe(
      map((response: any) => this.httpService.handleResponse(response)),
      catchError((err: any) => of(handleError(err)))
    );
  }

  postReadFile(fileId: number): Observable<HttpResponse> {
    return this.httpService.post(
      `${api.host}${api.basePath ? '/' : ''}${api.basePath}/${api.resources.postReadFile}`,
      { fileId },
      this.httpService.getFileOptions()
    ).pipe(
      map((response: any) => this.httpService.handleResponse(response)),
      catchError((err: any) => of(handleError(err)))
    );
  }

  postUploadFile(targetPath: string, fileName: string, file: Blob): Observable<HttpResponse> {
    const formData = new FormData();

    formData.append('file', file, fileName);
    formData.append('targetPath', `/${targetPath}`);

    return this.httpService.post(
      `${api.host}${api.basePath ? '/' : ''}${api.basePath}/${api.resources.postUploadFile}`,
      formData
    ).pipe(
      map((response: any) => this.httpService.handleResponse(response)),
      catchError((err: any) => {
        console.info(err);
        return of(handleError(err));
      })
    ).pipe(
      map(response => {
        console.info('postUploadFile', response)
        return new HttpResponse(response);
      })
    );
  }

  postUploadFileByEvent(targetPath: string, event: FileUploadEvent): Observable<HttpResponse> {
    const formData = new FormData();

    formData.append('file', event.files[0], event.files[0].name);
    formData.append('targetPath', `/${targetPath}`);

    return this.httpService.post(
      `${api.host}${api.basePath ? '/' : ''}${api.basePath}/${api.resources.postUploadFile}`,
      formData
    ).pipe(
      map((response: any) => this.httpService.handleResponse(response)),
      catchError((err: any) => of(handleError(err)))
    ).pipe(
      map(response => new HttpResponse(response))
    );
  }

  postExecuteSqlQuery = (data: ISqlQuery): Observable<HttpResponse> => {
    return this.httpService.post(
      `${api.host}${api.basePath ? '/' : ''}${api.basePath}/${api.resources.postExecuteSQLQuery}`,
      data
    );
  }

  // Private Methods
  private readonly getTableUrl = (params: ISqlQueryParameters): string => {
    let url = `${api.host}${api.basePath ? '/' : ''}${api.basePath}/${api.resources.getTable}`;
    url += `?table=${params.table}`;
    url += params.isDistinct ? `&isDistinct=${params.isDistinct}` : '';
    url += params.fields ? `&fields=${params.fields}` : '';
    url += params.groupBy ? `&groupBy=${params.groupBy}` : '';
    url += params.having ? `&having=${params.having}` : '';
    url += params.where ? `&where=${params.where}` : '';
    url += params.orderBy ? `&orderBy=${params.orderBy}` : '';
    url += params.limit ? `&limit=${params.limit}` : '';
    return url;
  };
}
