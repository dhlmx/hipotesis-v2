import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Services
import { RepositoryService } from './repository.service';
import { toSqlResponse } from '../utilities/http.utils';

// Interfaces & Models
import { Daily } from '../models/daily';
import { HttpResponse } from '../models/http/http-response';
import { IDaily } from '../interfaces/idaily';
import { ISqlQuery } from '../interfaces/sql/isql-query';
import { ISqlResponse } from '../interfaces/sql/isql-response';
import { SqlResponse } from '../models/http/sql-response';

@Injectable({
  providedIn: 'root'
})
export class DailyService {
  public dates = [] as Daily[];
  public daily: Daily = new Daily();
  public index = -1;
  public httpResponse: HttpResponse = {} as HttpResponse;
  public sqlResponse = new SqlResponse();

  constructor(private readonly repositoryService: RepositoryService) {};

  createDaily = (daily: IDaily): Observable<void> => {
    return this.postExecuteSqlQuery(this.getCreateQuery(daily));
  }

  deleteDaily = (dailyId: number): Observable<void> => {
    return this.postExecuteSqlQuery(this.getDeleteQuery(dailyId));
  }

  getDailies = (): Observable<void> => {
    this.resetDates();
    return this.getExecuteSqlQuery({ query: `CALL up_get_daily()`, entityName: 'Daily' });
  }

  getDaily = (dailyId: number): Observable<void> => {
    this.resetDates();
    return this.getExecuteSqlQuery({ query: `CALL up_read_daily(${dailyId})`, entityName: 'Daily'});
  }

  getExecuteSqlQuery = (query: ISqlQuery): Observable<void> => {
    return this.repositoryService.postExecuteSqlQuery(query).pipe(
      map((response: HttpResponse) => response.isOK ? response.data as IDaily[] : [] as IDaily[]),
      map((dates: IDaily[]) => dates.map((date: IDaily) => new Daily(date))),
      map((dates: Daily[]) => {
        this.processDates(dates);
      })
    );
  }

  goToFirst = (): void => {
    if (this.index > 0) {
      this.index = 0;
      this.daily = this.dates[this.index];
    }
  }

  goToLast = (): void => {
    if (this.index < this.dates.length - 1) {
      this.index = this.dates.length - 1;
      this.daily = this.dates[this.index];
    }
  }

  goToNext = (): void => {
    if (this.index < this.dates.length - 1) {
      this.index++;
      this.daily = this.dates[this.index];
    }
  }

  goToPrevious = (): void => {
    if (this.index > 0) {
      this.index--;
      this.daily = this.dates[this.index];
    }
  }

  postExecuteSqlQuery = (query: ISqlQuery): Observable<void> => {
    return this.repositoryService.postExecuteSqlQuery(query).pipe(
      map((response: HttpResponse) => response.isOK ? response.data as ISqlResponse : response.data),
      map((data: any) => {
        this.sqlResponse = new SqlResponse(toSqlResponse(data));
      })
    );
  }

  updateDaily = (daily: IDaily): Observable<void> => {
    return this.postExecuteSqlQuery(this.getUpdateQuery(daily));
  }

  // Private Methods
  private readonly getCreateQuery = (daily: IDaily): ISqlQuery => {
    return {
      query: `CALL up_create_daily(
        '${daily.remark}',
        ${daily.isActive ? 1 : 0}
      )`,
      entityName: 'SqlResponse'
    };
  }

  private readonly getDeleteQuery = (dailyId: number): ISqlQuery => {
    return {
      query: `CALL up_delete_daily(${dailyId})`,
      entityName: 'SqlResponse'
    };
  }

  private readonly getUpdateQuery = (daily: IDaily): ISqlQuery => {
    return {
      query: `CALL up_update_daily(
        ${daily.dailyId},
        '${daily.remark}',
        ${daily.isActive ? 1 : 0}
      )`,
      entityName: 'SqlResponse'
    };
  }

  private readonly processDates = (dates: Daily[]): void => {
    this.dates = dates;
    if (this.dates.length > 0) {
      this.index = 0;
      this.daily = this.dates[this.index];
    }
  }

  private readonly resetDates = (): void => {
    this.dates = [];
    this.daily = new Daily();
    this.index = -1;
  }
}
