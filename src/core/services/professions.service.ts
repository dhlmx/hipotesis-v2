import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Services
import { RepositoryService } from './repository.service';
import { toSqlResponse } from '../utilities/http.utils';

// Interfaces & Models
import { HttpResponse } from '../models/http/http-response';
import { IProfessionCategory } from '../interfaces/professions/iprofession-category';
import { IProfessionPhoto } from '../interfaces/professions/iprofession-photo';
import { IProfessionProject } from '../interfaces/professions/iprofession-project';
import { IProfessionSubcategory } from '../interfaces/professions/iprofession-subcategory';
import { ISelect } from '../interfaces/iselect';
import { ISqlQuery } from '../interfaces/sql/isql-query';
import { ISqlResponse } from '../interfaces/sql/isql-response';
import { SqlResponse } from '../models/http/sql-response';

@Injectable({
  providedIn: 'root'
})
export class ProfessionsService {
  private _categories: ISelect[] = [];
  private _subcategories: ISelect[] = [];
  private _projects: ISelect[] = [];
  private _photos: IProfessionPhoto[] = [];
  private _photo: IProfessionPhoto | null = null;
  private _index = -1;
  public httpResponse: HttpResponse = {} as HttpResponse;
  public sqlResponse = new SqlResponse();

  constructor(private readonly repositoryService: RepositoryService) {};

  get categories(): ISelect[] {
    return this._categories;
  }

  get index(): number {
    return this._index;
  }

  get photo(): IProfessionPhoto|null {
    return this._photo;
  }

  get photos(): IProfessionPhoto[] {
    return this._photos;
  }

  get projects(): ISelect[] {
    return this._projects;
  }

  get subcategories(): ISelect[] {
    return this._subcategories;
  }

  getCategories = (): Observable<void> => {
    this.resetCategories();

    return this.repositoryService.postExecuteSqlQuery({
      query: `CALL up_read_profession_categories()`,
      entityName: 'ProfessionCategory'
    }).pipe(
      map((response: HttpResponse) => {
        return response.isOK ? response.data as IProfessionCategory[] : [] as IProfessionCategory[]
      }),
      map((categories: IProfessionCategory[]) => this.processCategories(categories))
    );
  }

  getPhotos = (projectId: number): Observable<void> => {
    this.resetPhotos();

    return this.repositoryService.postExecuteSqlQuery({
      query: `CALL up_read_profession_photos(${projectId})`,
      entityName: 'ProfessionPhoto'
    }).pipe(
      map((response: HttpResponse) => {
        return response.isOK ? response.data as IProfessionPhoto[] : [] as IProfessionPhoto[]
      }),
      map((photos: IProfessionPhoto[]) => this.processPhotos(photos))
    );
  }

  getProjects = (categoryId: number, subcategoryId: number): Observable<void> => {
    this.resetProjects();

    return this.repositoryService.postExecuteSqlQuery({
      query: `CALL up_read_profession_projects(${categoryId}, ${subcategoryId})`,
      entityName: 'ProfessionProject'
    }).pipe(
      map((response: HttpResponse) => {
        return response.isOK ? response.data as IProfessionProject[] : [] as IProfessionProject[]
      }),
      map((projects: IProfessionProject[]) => this.processProjects(projects))
    );
  }

  getSubcategories = (categoryId: number): Observable<void> => {
    this.resetSubcategories();

    return this.repositoryService.postExecuteSqlQuery({
      query: `CALL up_read_profession_subcategories(${categoryId})`,
      entityName: 'ProfessionSubcategory'
    }).pipe(
      map((response: HttpResponse) => {
        return response.isOK ? response.data as IProfessionSubcategory[] : [] as IProfessionSubcategory[]
      }),
      map((subcategories: IProfessionSubcategory[]) => this.processSubcategories(subcategories))
    );
  }

  goToFirst = (): void => {
    if (this._index > 0) {
      this._index = 0;
      this._photo = this._photos[this._index];
    }
  }

  goToLast = (): void => {
    if (this._index < this._photos.length - 1) {
      this._index = this._photos.length - 1;
      this._photo = this._photos[this._index];
    }
  }

  goToNext = (): void => {
    if (this._index < this._photos.length - 1) {
      this._index++;
      this._photo = this._photos[this._index];
    }
  }

  goToPrevious = (): void => {
    if (this._index > 0) {
      this._index--;
      this._photo = this._photos[this._index];
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

  // Private Methods
  private readonly processCategories = (categories: IProfessionCategory[]): void => {
    this._categories = categories.map((category: IProfessionCategory) => ({ value: category.categoryId, label: category.category, inactive: false }));
  }

  private readonly processSubcategories = (subcategories: IProfessionSubcategory[]): void => {
    this._subcategories = subcategories.map((subcategory: IProfessionSubcategory) => ({ value: subcategory.subcategoryId, label: subcategory.subcategory, inactive: false }));
  }

  private readonly processPhotos = (photos: IProfessionPhoto[]): void => {
    this._photos = photos;

    if (this._photos.length > 0) {
      this._index = 0;
      this._photo = this._photos[this._index];
    }
  }

  private readonly processProjects = (projects: IProfessionProject[]): void => {
    this._projects = projects.map((project: IProfessionProject) => ({ value: project.projectId, label: project.project, inactive: false }));
  }

  private readonly resetCategories = (): void => {
    this._categories = [];
    this._subcategories = [];
    this._projects = [];
    this._photos = [];
    this._photo = null;
    this._index = -1;
  }

  private readonly resetPhotos = (): void => {
    this._photos = [];
    this._photo = null;
    this._index = -1;
  }

  private readonly resetProjects = (): void => {
    this._projects = [];
    this._photos = [];
    this._photo = null;
    this._index = -1;
  }

  private readonly resetSubcategories = (): void => {
    this._subcategories = [];
    this._projects = [];
    this._photos = [];
    this._photo = null;
    this._index = -1;
  }
}
