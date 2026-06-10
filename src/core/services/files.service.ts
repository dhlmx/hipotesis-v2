import { Injectable, OnDestroy, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
export class FilesService implements OnDestroy {
  private _httpResponse = new HttpResponse();
  private _sqlResponse = new SqlResponse();
  private _files: Blob[] = [];
  private _blob: Blob = new Blob();
  private _index = -1;
  private _imageUrl: SafeUrl|null = null;

  constructor(
    private readonly repository: RepositoryService,
    private readonly sanitizer: DomSanitizer
  ) { }

  ngOnDestroy(): void {
    this._httpResponse = new HttpResponse();
    this._sqlResponse = new SqlResponse();
    this._files = [];
    this._blob = new Blob();
    this._index = -1;
    this._imageUrl = null;
  }

  get blob(): Blob {
    return this._blob;
  }

  get blobType(): string {
    return this._blob.type;
  }

  get blobSize(): string {
    return this.formatSize(this._blob.size);
  }

  get files(): Blob[] {
    return this._files;
  }

  get httpResponse(): HttpResponse {
    return this._httpResponse;
  }

  get imageUrl(): SafeUrl|null {
    return this._imageUrl;
  }

  get index(): number {
    return this._index;
  }

  get isFileOk(): boolean {
    return this._httpResponse.status === HttpResponseStatus.OK
      && this._blob.type !== ''
      && this._blob.size > 0;
  }

  get sqlResponse(): SqlResponse {
    return this._sqlResponse;
  }

  goToFirst = (): void => {
    if (this._index > 0) {
      this._index = 0;
      this._blob = this._files[this._index];
    }
  }

  goToLast = (): void => {
    if (this._index < this._files.length - 1) {
      this._index = this._files.length - 1;
      this._blob = this._files[this._index];
    }
  }

  goToNext = (): void => {
    if (this._index < this._files.length - 1) {
      this._index++;
      this._blob = this._files[this._index];
    }
  }

  goToPrevious = (): void => {
    if (this._index > 0) {
      this._index--;
      this._blob = this._files[this._index];
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
        this._blob = this._httpResponse.isOK ? this._httpResponse.data as Blob : new Blob();
        this.toBase64(this._blob);
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

  resetBlob = (): void => {
    this._blob = new Blob();
    this._imageUrl = null;
  }

  // Private methods
  private readonly formatSize = (size: number): string => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1048576) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1073741824) {
      return `${(size / 1048576).toFixed(2)} MB`;
    } else {
      return `${(size / 1073741824).toFixed(2)} GB`;
    }
  }

  private readonly toBase64 = (blob: Blob): void => {
    const reader = new FileReader();

    reader.onload = (): void => {
      this._imageUrl = this.sanitizer.sanitize(SecurityContext.URL, reader.result);
    };

    reader.readAsDataURL(blob);
  }
}
