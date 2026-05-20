import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SanititizeService {
  prepareTextForMySQL = (text: string): string => text.replaceAll("'", "''");

  prepareDateTimeForMySQL = (date: Date, applyDifferenceTime: boolean = true): string => {
    if (applyDifferenceTime) {
      date.setTime(date.getTime() - (date.getTimezoneOffset() * 60000));
    }
    return date.toISOString().replaceAll('T', ' ').replaceAll('Z', '');
  }
}
