import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Services & Utilities
import { HttpService } from './http.service';

// Interfaces & Models
import { HttpResponse } from '../models/http/http-response';
import { ISqlQuery } from '../interfaces/sql/isql-query';
import { ISqlQueryParameters } from '../interfaces/sql/isql-query-parameters';

// Enums & Constants
const { api } = environment;

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private readonly httpService: HttpService) { }

  getTable(params: ISqlQueryParameters): Observable<HttpResponse> {
    return this.httpService.get(this.getTableUrl(params));
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
