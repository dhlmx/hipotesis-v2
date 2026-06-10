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
import { ProfessionsService } from '../../../core/services/professions.service';

// Interfaces & Models
import { IProfessionPhoto } from '../../../core/interfaces/professions/iprofession-photo';
import { ISelect } from '../../../core/interfaces/iselect';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';

@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ConfirmationService, MessageService, AppService, FilesService, ProfessionsService],
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
    private readonly professionsService: ProfessionsService,
    private readonly messageService: MessageService
  ) {
    this.appService.setTitle(APP_TITLE, 'Tejidos - Doña Carmelita');
    this.appService.setDescription('Micrositio de tejidos de la maestra Doña Carmelita.');
  }

  ngOnInit() {
    this.initialize();
  }

  get categories(): ISelect[] {
    return this.professionsService.categories;
  }

  get image(): SafeUrl|null {
    return this.filesService.imageUrl;
  }

  get index(): number {
    return this.professionsService.index;
  }

  get indexPosition(): string {
    return `${this.professionsService.index + 1} / ${this.professionsService.photos.length}`;
  }

  get isFileOk(): boolean {
    return this.filesService.isFileOk;
  }

  get photo(): IProfessionPhoto|null {
    return this.professionsService.photo;
  }

  get photos(): IProfessionPhoto[] {
    return this.professionsService.photos;
  }

  get projects(): ISelect[] {
    return this.professionsService.projects;
  }

  get subcategories(): ISelect[] {
    return this.professionsService.subcategories;
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading categories...');

    this.professionsService.getCategories().subscribe({
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

    this.professionsService.getSubcategories(this.controls.categoryId.value || 0).subscribe({
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

    this.professionsService.getProjects(this.controls.categoryId.value || 0, this.controls.subcategoryId.value || 0).subscribe({
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

    this.professionsService.getPhotos(this.controls.projectId.value || 0).subscribe({
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
    this.professionsService.goToFirst();
    this.loadPhoto();
  }

  public onClickLast = (): void => {
    this.professionsService.goToLast();
    this.loadPhoto();
  }

  public onClickNext = (): void => {
    this.professionsService.goToNext();
    this.loadPhoto();
  }

  public onClickPrevious = (): void => {
    this.professionsService.goToPrevious();
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
