import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Services
import { RepositoryService } from './repository.service';

// Interfaces & Models
import { Daily } from '../models/daily';
import { IDaily } from '../interfaces/idaily';
import { ISqlQueryParameters } from '../interfaces/sql/isql-query-parameters';

@Injectable({
  providedIn: 'root'
})
export class DailyService {

  public dates = [] as Daily[];
  public daily = {} as Daily;
  public index = -1;

  constructor(private readonly repositoryService: RepositoryService) {};

  getDaily = (parameters: ISqlQueryParameters): Observable<void> => {
    this.resetDates();

    return this.getRawDaily(parameters).pipe(
      map(dates => this.dates = dates),
      map(() => this.processDates())
    );
  }

  getRawDaily = (parameters: ISqlQueryParameters): Observable<Daily[]> => {
    return this.repositoryService.getTable(parameters).pipe(
      map(response => {
        return response.isOK ? response.data as IDaily[] : [] as IDaily[];
      }),
      map(dates => dates.map(daily => new Daily(daily)))
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

  private readonly processDates = (): void => {
    if (this.dates.length > 0) {
      this.index = 0;
      this.daily = this.dates[this.index];
    }
  }

  private readonly resetDates = (): void => {
    this.dates = [];
    this.daily = {} as Daily;
    this.index = -1;
  }
}
