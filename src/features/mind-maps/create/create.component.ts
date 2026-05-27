import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

// Modules
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { MindMapsService } from '../../../core/services/mind-maps.service';

// Interfaces & Models
import { IMindMap } from '../../../core/interfaces/mind-maps/imind-map';
import { ISelect } from '../../../core/interfaces/iselect';
import { CoreModule } from '../../../core/modules/core.module';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { DB } from '../../../core/constants/db';
import { ISELECT_YES_NO } from '../../../core/constants/select';

const { mindMaps } = DB;

@Component({
  standalone: true,
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ConfirmationService, MessageService, AppService, MindMapsService],
  imports: [CoreModule, PrimeNgModule]
})
export class CreateComponent implements OnInit {

  activeOptions = ISELECT_YES_NO;

  controls: {
    categoryId: FormControl,
    title: FormControl,
    subtitle: FormControl,
    author: FormControl,
    jpg: FormControl,
    png: FormControl,
    svg: FormControl,
    pdf: FormControl,
    isActive: FormControl
  } = {
    categoryId: new FormControl(0, Validators.required),
    title: new FormControl('', [Validators.required, Validators.minLength(mindMaps.title.minLength), Validators.maxLength(mindMaps.title.maxLength)]),
    subtitle: new FormControl('', [Validators.required, Validators.minLength(mindMaps.subtitle.minLength), Validators.maxLength(mindMaps.subtitle.maxLength)]),
    author: new FormControl('', [Validators.required, Validators.minLength(mindMaps.author.minLength), Validators.maxLength(mindMaps.author.maxLength)]),
    jpg: new FormControl('', [Validators.minLength(mindMaps.jpg.minLength), Validators.maxLength(mindMaps.jpg.maxLength)]),
    png: new FormControl('', [Validators.minLength(mindMaps.png.minLength), Validators.maxLength(mindMaps.png.maxLength)]),
    svg: new FormControl('', [Validators.minLength(mindMaps.svg.minLength), Validators.maxLength(mindMaps.svg.maxLength)]),
    pdf: new FormControl('', [Validators.minLength(mindMaps.pdf.minLength), Validators.maxLength(mindMaps.pdf.maxLength)]),
    isActive: new FormControl(false, Validators.required)
  };

  form = new FormGroup({
    ...this.controls
  });

  constructor(
    public readonly appService: AppService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly mindMapsService: MindMapsService
  ) {
    this.appService.setTitle(APP_TITLE, 'MindMaps - Create');
  }

  ngOnInit(): void {
    this.initialize();
  }

  get categories(): ISelect[] {
    return this.mindMapsService.categoriesSelect;
  }

  get isValidSqlResponse(): boolean {
    return this.mindMapsService.sqlResponse.lastIdentityId !== undefined
      && this.mindMapsService.sqlResponse.lastIdentityId > 0
      && this.mindMapsService.sqlResponse.affectedRows === 1;
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading categories...');

    this.mindMapsService.getCategories().subscribe({
      next: () => {
        if (this.mindMapsService.categoriesSelect.length > 0) {
          this.selectCategory();
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Categories not found' });
        }
      },
      complete: () => {
        this.appService.process.stop();
      }
    });
  }

  onClickSave = (): void => {
    this.confirmationService.confirm({
      message: '¿Estás seguro de proceder?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appService.process.start('Creating MindMap...');
        this.mindMapsService.createMindMap(this.toIMindMap()).subscribe({
          next: () => {
            if (this.isValidSqlResponse) {
              this.resetForm();
              this.messageService.add({ severity: 'success', summary: 'Confirmación', detail: 'MindMap saved' });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Confirmación', detail: 'MindMap not saved' });
            }
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {
            this.appService.process.stop();
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Operación no realizada'})
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelación', detail: 'Operación cancelada'})
            break;
        }
      }
    });
  }

  // Private methods
  private readonly resetForm = (): void => {
    this.controls.categoryId.setValue(0);
    this.controls.title.setValue('');
    this.controls.subtitle.setValue('');
    this.controls.author.setValue('');
    this.controls.jpg.setValue('');
    this.controls.png.setValue('');
    this.controls.svg.setValue('');
    this.controls.pdf.setValue('');
    this.controls.isActive.setValue(false);
  }

  private readonly selectCategory = (): void => {
    if (this.mindMapsService.categoriesSelect.length > 0) {
      this.controls.categoryId.setValue(this.mindMapsService.categoriesSelect[0].value);
    }
  }

  private readonly toIMindMap = (): IMindMap => {
    return {
      mindMapId: 0,
      categoryId: this.controls.categoryId.value,
      title: this.controls.title.value,
      subtitle: this.controls.subtitle.value,
      author: this.controls.author.value,
      jpg: this.controls.jpg.value,
      png: this.controls.png.value,
      svg: this.controls.svg.value,
      pdf: this.controls.pdf.value,
      isActive: this.controls.isActive.value
    } as IMindMap;
  }
}
