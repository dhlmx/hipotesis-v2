import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Services
import { RepositoryService } from './repository.service';
import { toSqlResponse } from '../utilities/http.utils';

// Interfaces & Models
import { HttpResponse } from '../models/http/http-response';
import { IMaintenanceCategory } from '../interfaces/maintenance/imaintenance-category';
import { IMaintenanceProject } from '../interfaces/maintenance/imaintenance-project';
import { IMaintenanceSubcategory } from '../interfaces/maintenance/imaintenance-subcategory';
import { ISelect } from '../interfaces/iselect';
import { ISqlQuery } from '../interfaces/sql/isql-query';
import { ISqlResponse } from '../interfaces/sql/isql-response';
import { SqlResponse } from '../models/http/sql-response';
import { IMaintenancePhoto } from '../interfaces/maintenance/imaintenance-photo';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private _categories: ISelect[] = [];
  private _subcategories: ISelect[] = [];
  private _projects: ISelect[] = [];
  private _photos: IMaintenancePhoto[] = [];
  private _photo: IMaintenancePhoto | null = null;
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

  get photo(): IMaintenancePhoto|null {
    return this._photo;
  }

  get photos(): IMaintenancePhoto[] {
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
      query: `CALL up_read_maintenance_categories()`,
      entityName: 'MaintenanceCategory'
    }).pipe(
      map((response: HttpResponse) => {
        return response.isOK ? response.data as IMaintenanceCategory[] : [] as IMaintenanceCategory[]
      }),
      map((categories: IMaintenanceCategory[]) => this.processCategories(categories))
    );
  }

  getPhotos = (projectId: number): Observable<void> => {
    this.resetPhotos();

    return this.repositoryService.postExecuteSqlQuery({
      query: `CALL up_read_maintenance_photos(${projectId})`,
      entityName: 'MaintenancePhoto'
    }).pipe(
      map((response: HttpResponse) => {
        return response.isOK ? response.data as IMaintenancePhoto[] : [] as IMaintenancePhoto[]
      }),
      map((photos: IMaintenancePhoto[]) => this.processPhotos(photos))
    );
  }

  getProjects = (categoryId: number, subcategoryId: number): Observable<void> => {
    this.resetProjects();

    return this.repositoryService.postExecuteSqlQuery({
      query: `CALL up_read_maintenance_projects(${categoryId}, ${subcategoryId})`,
      entityName: 'MaintenanceProject'
    }).pipe(
      map((response: HttpResponse) => {
        return response.isOK ? response.data as IMaintenanceProject[] : [] as IMaintenanceProject[]
      }),
      map((projects: IMaintenanceProject[]) => this.processProjects(projects))
    );
  }

  getSubcategories = (categoryId: number): Observable<void> => {
    this.resetSubcategories();

    return this.repositoryService.postExecuteSqlQuery({
      query: `CALL up_read_maintenance_subcategories(${categoryId})`,
      entityName: 'MaintenanceSubcategory'
    }).pipe(
      map((response: HttpResponse) => {
        return response.isOK ? response.data as IMaintenanceSubcategory[] : [] as IMaintenanceSubcategory[]
      }),
      map((subcategories: IMaintenanceSubcategory[]) => this.processSubcategories(subcategories))
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
  private readonly processCategories = (categories: IMaintenanceCategory[]): void => {
    this._categories = categories.map((category: IMaintenanceCategory) => ({ value: category.categoryId, label: category.category, inactive: false }));
  }

  private readonly processSubcategories = (subcategories: IMaintenanceSubcategory[]): void => {
    this._subcategories = subcategories.map((subcategory: IMaintenanceSubcategory) => ({ value: subcategory.subcategoryId, label: subcategory.subcategory, inactive: false }));
  }

  private readonly processPhotos = (photos: IMaintenancePhoto[]): void => {
    this._photos = photos;

    if (this._photos.length > 0) {
      this._index = 0;
      this._photo = this._photos[this._index];
    }
  }

  private readonly processProjects = (projects: IMaintenanceProject[]): void => {
    this._projects = projects.map((project: IMaintenanceProject) => ({ value: project.projectId, label: project.project, inactive: false }));
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
