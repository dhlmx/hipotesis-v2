import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { FilesService } from '../../../core/services/files.service';
import { MaintenanceService } from '../../../core/services/maintenance.service';

// Interfaces & Models
import { IMaintenancePhoto } from '../../../core/interfaces/maintenance/imaintenance-photo';
import { ISelect } from '../../../core/interfaces/iselect';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';

@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ConfirmationService, MessageService, AppService, FilesService, MaintenanceService],
  imports: [CoreModule, PrimeNgModule]
})
export class ListComponent implements OnInit {

  controls = {
    categoryId: new FormControl(0, Validators.required),
    subcategoryId: new FormControl(0, Validators.required),
    projectId: new FormControl(0, Validators.required),
    photoId: new FormControl(0, Validators.required),
    description: new FormControl('')
  };

  form = new FormGroup({
    ...this.controls
  });

  constructor(
    public appService: AppService,
    private readonly filesService: FilesService,
    private readonly maintenanceService: MaintenanceService,
    private readonly messageService: MessageService
  ) {
    this.appService.setTitle(APP_TITLE, 'Proyectos');
    this.appService.setDescription('Micrositio de mantenimiento en línea blanca, cocinas, baños, etc.');
  }

  ngOnInit() {
    this.initialize();
  }

  get categories(): ISelect[] {
    return this.maintenanceService.categories;
  }

  get image(): SafeUrl|null {
    return this.filesService.imageUrl;
  }

  get index(): number {
    return this.maintenanceService.index;
  }

  get indexPosition(): string {
    return `${this.maintenanceService.index + 1} / ${this.maintenanceService.photos.length}`;
  }

  get isFileOk(): boolean {
    return this.filesService.isFileOk;
  }

  get photo(): IMaintenancePhoto|null {
    return this.maintenanceService.photo;
  }

  get photos(): IMaintenancePhoto[] {
    return this.maintenanceService.photos;
  }

  get projects(): ISelect[] {
    return this.maintenanceService.projects;
  }

  get subcategories(): ISelect[] {
    return this.maintenanceService.subcategories;
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading categories...');

    this.maintenanceService.getCategories().subscribe({
      next: () => {
        this.processCategories();
      },
      complete: () => {
        this.appService.process.stop();

        if (this.categories.length === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Categories not found' });
        } else {
          this.onChangeCategory();
        }
      }
    });
  }

  public onChangeCategory = (): void => {
    this.resetPhoto();

    this.appService.process.start('Loading subcategories...');

    this.maintenanceService.getSubcategories(this.controls.categoryId.value || 0).subscribe({
      next: () => {
        this.processSubcategories();
      },
      complete: () => {
        this.appService.process.stop();

        if (this.subcategories.length === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Subcategories not found' });
        } else {
          this.onChangeSubcategory();
        }
      }
    });
  }

  public onChangeSubcategory = (): void => {
    this.resetPhoto();

    this.appService.process.start('Loading projects...');

    this.maintenanceService.getProjects(this.controls.categoryId.value || 0, this.controls.subcategoryId.value || 0).subscribe({
      next: () => {
        this.processProjects();
      },
      complete: () => {
        this.appService.process.stop();

        if (this.subcategories.length === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Subcategories not found' });
        } else {
          this.onChangeProject();
        }
      }
    });
  }

  public onChangeProject = (): void => {
    this.resetPhoto();

    this.appService.process.start('Loading photos...');

    this.maintenanceService.getPhotos(this.controls.projectId.value || 0).subscribe({
      next: () => {
        this.processPhotos();
      },
      complete: () => {
        this.appService.process.stop();

        if (this.subcategories.length === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Photos not found' });
        } else {
          this.loadPhoto();
        }
      }
    });
  }

  public onClickFirst = (): void => {
    this.maintenanceService.goToFirst();
    this.loadPhoto();
  }

  public onClickLast = (): void => {
    this.maintenanceService.goToLast();
    this.loadPhoto();
  }

  public onClickNext = (): void => {
    this.maintenanceService.goToNext();
    this.loadPhoto();
  }

  public onClickPrevious = (): void => {
    this.maintenanceService.goToPrevious();
    this.loadPhoto();
  }

  // Private Methods
  private readonly loadPhoto = (): void => {
    if (this.photo) {
      this.appService.process.start('Loading photo...');

      this.filesService.postReadFile(this.photo.fileId).subscribe({
        next: () => {
          this.processPhoto();
        }, complete: () => {
          this.appService.process.stop();
        }
      });
    }
  }

  private readonly processCategories = (): void => {
    if (this.categories.length > 0) {
      this.controls.categoryId.setValue(this.categories[0].value);
    }
  }

  private readonly processPhoto = (): void => {
    this.controls.description.setValue(this.photo?.description || 'No disponible');
  }

  private readonly processPhotos = (): void => {
    if (this.photos.length > 0) {
      this.controls.photoId.setValue(this.photos[0].photoId);
    }
  }

  private readonly processProjects = (): void => {
    if (this.projects.length > 0) {
      this.controls.projectId.setValue(this.projects[0].value);
    }
  }

  private readonly processSubcategories = (): void => {
    if (this.subcategories.length > 0) {
      this.controls.subcategoryId.setValue(this.subcategories[0].value);
    }
  }

  private readonly resetPhoto = (): void => {
    this.filesService.resetBlob();
    this.controls.description.setValue('');
  }
}
