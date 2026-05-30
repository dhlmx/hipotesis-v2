import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Services
import { RepositoryService } from './repository.service';
import { toSqlResponse } from '../utilities/http.utils';

// Interfaces & Models
import { HttpResponse } from '../models/http/http-response';
import { ISqlResponse } from '../interfaces/sql/isql-response';
import { SqlResponse } from '../models/http/sql-response';

// Enums & Constants
import { HttpResponseStatus } from '../enums/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private _httpResponse = new HttpResponse();
  private _sqlResponse = new SqlResponse();
  private _files: Blob[] = [];
  private _file: Blob = new Blob();
  private _index = -1;

  constructor(private readonly repository: RepositoryService) { }

  get file(): Blob {
    return this._file;
  }

  get files(): Blob[] {
    return this._files;
  }

  get httpResponse(): HttpResponse {
    return this._httpResponse;
  }

  get index(): number {
    return this._index;
  }

  get isFileOk(): boolean {
    return this._httpResponse.status === HttpResponseStatus.OK
      && this._file.type !== ''
      && this._file.size > 0;
  }

  get sqlResponse(): SqlResponse {
    return this._sqlResponse;
  }

  goToFirst = (): void => {
    if (this._index > 0) {
      this._index = 0;
      this._file = this._files[this._index];
    }
  }

  goToLast = (): void => {
    if (this._index < this._files.length - 1) {
      this._index = this._files.length - 1;
      this._file = this._files[this._index];
    }
  }

  goToNext = (): void => {
    if (this._index < this._files.length - 1) {
      this._index++;
      this._file = this._files[this._index];
    }
  }

  goToPrevious = (): void => {
    if (this._index > 0) {
      this._index--;
      this._file = this._files[this._index];
    }
  }

  postCreateFile = (file: Blob, isActive: boolean): Observable<void> => {
    return this.repository.postCreateFile(file, isActive).pipe(
      map((response: HttpResponse) => {
        this._httpResponse = response;
        this._sqlResponse = new SqlResponse(toSqlResponse(response.data as ISqlResponse));
      })
    );
  }

  postReadFile = (fileId: number): Observable<void> => {
    return this.repository.postReadFile(fileId).pipe(
      map((response: HttpResponse) => {
        this._httpResponse = response;
        this._file = this._httpResponse.isOK ? this._httpResponse.data as Blob : new Blob();
      })
    );
  }

  postUploadFile = (targetPath: string, fileName: string, file: Blob): Observable<void> => {
    return this.repository.postUploadFile(targetPath, fileName, file).pipe(
      map((response: HttpResponse) => {
        this._httpResponse = response;
      })
    );
  }
}
