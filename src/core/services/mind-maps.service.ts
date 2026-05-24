import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Services
import { RepositoryService } from './repository.service';
import { toSqlResponse } from '../utilities/http.utils';
import { categoriesToISelect, mindMapsToISelect } from '../services/mapper.service';


// Interfaces & Models
import { HttpResponse } from '../models/http/http-response';
import { IMindMap } from '../interfaces/mind-maps/imind-map';
import { IMindMapCategory } from '../interfaces/mind-maps/imind-map-category';
import { ISqlQuery } from '../interfaces/sql/isql-query';
import { ISqlResponse } from '../interfaces/sql/isql-response';
import { ISelect } from '../interfaces/iselect';

// Enums & Constants
import { IMIND_MAP_DEFAULT, IMIND_MAP_CATEGORY_DEFAULT } from '../constants/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MindMapsService {

  private categories: IMindMapCategory[] = [];
  public categoriesSelect: ISelect[] = [];
  public category: IMindMapCategory = IMIND_MAP_CATEGORY_DEFAULT;
  private mindMaps: IMindMap[] = [];
  public mindMapsSelect: ISelect[] = [];
  public mindMap: IMindMap = IMIND_MAP_DEFAULT;
  public index = -1;
  public sqlResponse: ISqlResponse = {} as ISqlResponse;

  constructor(private readonly repository: RepositoryService) { }

  createMindMap(mindMap: IMindMap): Observable<void> {
    return this.postExecuteSqlQuery(this.getInsertQuery(mindMap));
  }

  deleteMindMap(mindMap: IMindMap): Observable<void> {
    return this.postExecuteSqlQuery(this.getDeleteQuery(mindMap.mindMapId));
  }

  getCategories(): Observable<void> {
    this.resetCategories();

    return this.repository.postExecuteSqlQuery({
      query: 'CALL up_get_mind_map_categories();',
      entityName: 'MindMapCategory'
    }).pipe(
      map((response: HttpResponse) => response.isOK ? response.data as IMindMapCategory[] : [] as IMindMapCategory[]),
      map((categories: IMindMapCategory[]) => this.processCategories(categories))
    );
  }


  getMindMap(mindMapId: number): Observable<void> {
    this.resetMindMaps();
    return this.getRawMindMaps({ query: `CALL up_read_mind_map(${mindMapId});`, entityName: 'MindMap' });
  }

  getMindMaps(): Observable<void> {
    this.resetMindMaps();
    return this.getRawMindMaps({ query: 'CALL up_get_mind_maps();', entityName: 'MindMap' });
  }

  getMindMapsByCategory(categoryId: number): Observable<void> {
    this.resetMindMaps();
    return this.getRawMindMaps({ query: `CALL up_get_mind_maps_by_category(${categoryId});`, entityName: 'MindMap' });
  }

  getRawMindMaps(query: ISqlQuery): Observable<void> {
    return this.repository.postExecuteSqlQuery(query).pipe(
      map((response: HttpResponse) => response.isOK ? response.data as IMindMap[] : [] as IMindMap[]),
      map((mindMaps: IMindMap[]) => this.processMindMaps(mindMaps))
    );
  }

  goToFirst = (): void => {
    if (this.index > 0) {
      this.index = 0;
      this.mindMap = this.mindMaps[this.index];
    }
  }

  goToLast = (): void => {
    if (this.index < this.mindMaps.length - 1) {
      this.index = this.mindMaps.length - 1;
      this.mindMap = this.mindMaps[this.index];
    }
  }

  goToNext = (): void => {
    if (this.index < this.mindMaps.length - 1) {
      this.index++;
      this.mindMap = this.mindMaps[this.index];
    }
  }

  goToPrevious = (): void => {
    if (this.index > 0) {
      this.index--;
      this.mindMap = this.mindMaps[this.index];
    }
  }

  postExecuteSqlQuery = (query: ISqlQuery): Observable<void> => {
    return this.repository.postExecuteSqlQuery(query).pipe(
      map((response: HttpResponse) => response.isOK ? response.data as ISqlResponse : response.data),
      map((data: any) => {
        this.sqlResponse = toSqlResponse(data);
      })
    );
  }

  resetCategory = (categoryId: number): void => {
    this.category = this.categories.find((category: IMindMapCategory) => category.categoryId === categoryId) || IMIND_MAP_CATEGORY_DEFAULT;
  }

  resetMindMap = (mindMapId: number): void => {
    this.mindMap = this.mindMaps.find((mindMap: IMindMap) => mindMap.mindMapId === mindMapId) || IMIND_MAP_DEFAULT;
  }

  updateMindMap = (mindMap: IMindMap): Observable<void> => {
    return this.postExecuteSqlQuery(this.getUpdateQuery(mindMap));
  }

  // Private Methods
  private readonly getDeleteQuery = (mindMapId: number): ISqlQuery => {
    return {
      query: `CALL up_delete_mind_map(${mindMapId})`,
      entityName: 'SqlResponse'
    };
  }

  private readonly getInsertQuery = (mindMap: IMindMap): ISqlQuery => {
    return {
      query: `CALL up_create_mind_map(
        ${mindMap.categoryId},
        '${mindMap.title}',
        '${mindMap.subtitle}',
        '${mindMap.author}',
        ${mindMap.jpg ? `'${mindMap.jpg}'` : null},
        ${mindMap.png ? `'${mindMap.png}'` : null},
        ${mindMap.svg ? `'${mindMap.svg}'` : null},
        ${mindMap.pdf ? `'${mindMap.pdf}'` : null},
        ${mindMap.isActive ? 1 : 0 }
      )`,
      entityName: 'SqlResponse'
    };
  }

  private readonly getUpdateQuery = (mindMap: IMindMap): ISqlQuery => {
    return {
      query: `CALL up_update_mind_map(
        ${mindMap.mindMapId},
        ${mindMap.categoryId},
        '${mindMap.title}',
        '${mindMap.subtitle}',
        '${mindMap.author}',
        ${mindMap.jpg ? `'${mindMap.jpg}'` : null},
        ${mindMap.png ? `'${mindMap.png}'` : null},
        ${mindMap.svg ? `'${mindMap.svg}'` : null},
        ${mindMap.pdf ? `'${mindMap.pdf}'` : null},
        ${mindMap.isActive ? 1 : 0 }
      );`,
      entityName: 'SqlResponse'
    };
  }

  private readonly processCategories = (categories: IMindMapCategory[]): void => {
    this.categories = categories;

    if (this.categories.length > 0) {
      this.categoriesSelect = categoriesToISelect(this.categories);
      this.category = this.categories[0];
    }
  }

  private readonly processMindMaps = (mindMaps: IMindMap[]): void => {
    this.mindMaps = mindMaps;

    if (this.mindMaps.length > 0) {
      this.mindMapsSelect = mindMapsToISelect(this.mindMaps);
      this.index = 0;
      this.mindMap = this.mindMaps[this.index];
    }
  }

  private readonly resetCategories = (): void => {
    this.categories = [];
    this.categoriesSelect = [];
    this.category = IMIND_MAP_CATEGORY_DEFAULT;
  }

  private readonly resetMindMaps = (): void => {
    this.mindMaps = [];
    this.mindMapsSelect = [];
    this.index = -1;
    this.mindMap = IMIND_MAP_DEFAULT;
  }
}
