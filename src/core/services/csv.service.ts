import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

// Services & Utilities
import { lineByLine } from '../utilities/text';

@Injectable({
  providedIn: 'root'
})
export class CSVService {

  constructor(private readonly http: HttpClient) { }

  load = (path: string): Observable<string> => {
    return this.http.get(path, { responseType: 'text' }).pipe(
      map((fileContent: string) => fileContent),
      catchError((err: any) => {
        console.error('load: ERROR', err);
        return of('');
      })
    );
  };

  loadLineByLine = (path: string): Observable<string[]> => {
    return this.load(path).pipe(
      map((fileContent: string) => lineByLine(fileContent)),
      catchError((err: any) => {
        console.error('load: ERROR', err);
        return of([]);
      })
    );
  };

  loadWords = (path: string): Observable<string[]> => {
    return this.loadLineByLine(path).pipe(
      map((lines: string[]) => this.toWords(lines)),
      catchError((err: any) => {
        console.error('load: ERROR', err);
        return of([]);
      })
    );
  };

  toWords = (lines: string[]): string[] => {
    return lines
      .filter((line: string) => line !== '')
      .map(word => word.trim());
  }
}
