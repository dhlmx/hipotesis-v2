import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { MindMapsService } from '../../../core/services/mind-maps.service';

// Interfaces & Models
import { IMindMap } from '../../../core/interfaces/mind-maps/imind-map';
import { IMindMapCategory } from '../../../core/interfaces/mind-maps/imind-map-category';
import { ISelect } from '../../../core/interfaces/iselect';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
const { publicHtml } = environment;

@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ConfirmationService, MessageService],
  imports: [CoreModule, PrimeNgModule]
})
export class ListComponent implements OnInit {

  controls = {
    categoryId: new FormControl(0, Validators.required),
    mindMapId: new FormControl(0, Validators.required),
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
  };

  form = new FormGroup({
    ...this.controls
  });

  constructor(
    public appService: AppService,
    private readonly messageService: MessageService,
    private readonly mindMapsService: MindMapsService
  ) {
    this.appService.setTitle(APP_TITLE, 'Análisis - Mapas Mentales');
    this.appService.setDescription('Análisis situacional de México y del Mundo. Una mirada crítica y alternativa.');
  }

  ngOnInit() {
    this.initialize();
  }

  get category(): IMindMapCategory {
    return this.mindMapsService.category;
  }

  get categories(): ISelect[] {
    return this.mindMapsService.categoriesSelect;
  }

  get mindMap(): IMindMap {
    return this.mindMapsService.mindMap;
  }

  get mindMaps(): ISelect[] {
    return this.mindMapsService.mindMapsSelect;
  }

  getPdfUrl = (mindMap: IMindMap): string => {
    return `/${publicHtml.base}/${publicHtml.mindMaps}/${mindMap.pdf}`;
  }

  getSvgUrl = (mindMap: IMindMap): string => {
    return `/${publicHtml.base}/${publicHtml.mindMaps}/${mindMap.svg}`;
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading categories...');

    this.mindMapsService.getCategories().subscribe({
      next: () => {
        this.resetCategory();
      },
      complete: () => {
        this.appService.process.stop();

        if (this.categories.length === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Categories not found' });
        } else {
          this.appService.process.start('Loading mind maps...');

          this.mindMapsService.getMindMapsByCategory(this.category.categoryId).subscribe({
            next: () => {
              this.resetMindMap();
            },
            complete: () => {
              this.appService.process.stop();

              if (this.mindMaps.length === 0) {
                this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Mind maps not found' });
              }
            }
          });
        }
      }
    });
  }

  onChangeCategory = (): void => {
    this.appService.process.start('Loading mind maps...');

    this.resetMindMap();

    this.mindMapsService.getMindMapsByCategory(Number(this.controls.categoryId.value)).subscribe({
      next: () => {
        this.resetMindMap();
      },
      complete: () => {
        this.appService.process.stop();

        if (this.mindMaps.length === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Mind maps not found' });
        }
      }
    });
  }

  onChangeMindMap = (): void => {
    this.appService.process.start('Loading mind map...');
    this.loadMindMap(Number(this.controls.mindMapId.value));
    this.appService.process.stop();
  }

  loadMindMap = (mindMapId: number): void => {
    this.mindMapsService.resetMindMap(mindMapId);
  }

  resetCategory = (): void => {
    this.controls.categoryId.setValue(this.categories.length > 0 ? this.categories[0].value : 0);
  }

  resetMindMap = (): void => {
    this.controls.mindMapId.setValue(this.mindMaps.length > 0 ? this.mindMaps[0].value : 0);
  }
}
