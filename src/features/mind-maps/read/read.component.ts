import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  providers: [ConfirmationService, MessageService],
  imports: [CoreModule, PrimeNgModule]
})
export class ReadComponent implements OnInit {
  activeOptions = ISELECT_YES_NO;

  controls: {
    mindMapId: FormControl,
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
    mindMapId: new FormControl(0, Validators.required),
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
    private readonly mindMapsService: MindMapsService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.appService.setTitle(APP_TITLE, 'MindMaps - Read');
  }

  ngOnInit(): void {
    this.initialize();
  }

  get categories(): ISelect[] {
    return this.mindMapsService.categoriesSelect;
  }

  get isValidSqlResponse(): boolean {
    return this.mindMapsService.sqlResponse.affectedRows === 1;
  }

  get mindMap(): IMindMap {
    return this.mindMapsService.mindMap;
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading categories...');

    this.controls.mindMapId.setValue(Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0'));
    this.mindMapsService.getCategories().subscribe({
      next: () => {
          this.selectCategory();
      },
      complete: () => {
        this.appService.process.stop();

        if (this.mindMapsService.categoriesSelect.length === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Categories not found' });
        } else {
          this.appService.process.start('Loading MindMap...');

          this.mindMapsService.getMindMap(this.controls.mindMapId.value).subscribe({
            next: () => {
              this.setForm(this.mindMapsService.mindMap);
            },
            complete: () => {
              this.appService.process.stop();

              if (this.mindMapsService.mindMapsSelect.length === 0) {
                this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'MindMap not found' });
              }
            }
          })
        }
      }
    });
  }

  private readonly selectCategory = (): void => {
    if (this.mindMapsService.categoriesSelect.length > 0) {
      this.controls.categoryId.setValue(this.mindMapsService.categoriesSelect[0].value);
    }
  }

  private readonly setForm = (mindMap: IMindMap): void => {
    this.controls.categoryId.setValue(mindMap.categoryId);
    this.controls.title.setValue(mindMap.title);
    this.controls.subtitle.setValue(mindMap.subtitle);
    this.controls.author.setValue(mindMap.author);
    this.controls.jpg.setValue(mindMap.jpg);
    this.controls.png.setValue(mindMap.png);
    this.controls.svg.setValue(mindMap.svg);
    this.controls.pdf.setValue(mindMap.pdf);
    this.controls.isActive.setValue(mindMap.isActive);
  }
}
