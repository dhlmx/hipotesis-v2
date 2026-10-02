import { AfterViewInit, Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Chart } from 'chart.js';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services & Utilities
import { AppService } from '../../../core/services/app.service';
import { PdfService } from '../../../core/services/pdf.service';

// Interfaces & Models
import { IFormControl } from '../../../core/interfaces/iform-control';
import { IPerson } from '../../../core/interfaces/ml/iperson';
import { KNearestNeighborAlgorithm } from '../../../core/models/ml/k-nearest-neighbor-algorithm';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { K, K_NEAREST_NEIGHBOR_CHART, HEIGHT, PERSONS, WEIGHT } from '../../../core/constants/ml/k-nearest-neighbor/data';

@Component({
  selector: 'app-k-nearest-neighbor',
  templateUrl: './k-nearest-neighbor.html',
  styleUrl: './k-nearest-neighbor.css',
  providers: [],
  imports: [CoreModule, PrimeNgModule],
})
export class KNearestNeighbor implements OnInit, AfterViewInit {
  @ViewChild('kNNCanvas', { static: false }) kNNCanvas!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly documentStyle = getComputedStyle(document.documentElement);
  private textColor = '';
  private textColorSecondary = '';
  private surfaceBorder = '';

  private readonly persons: IPerson[] = PERSONS;
  private knnSetup = { ...K_NEAREST_NEIGHBOR_CHART };
  private kNNChart!: Chart;

  height: IFormControl = { ...HEIGHT };
  k: IFormControl = { ...K };
  weight: IFormControl = { ...WEIGHT };
  knn = new KNearestNeighborAlgorithm();

  controls: {
    weight: FormControl,
    height: FormControl,
    k: FormControl
  } = {
    weight: new FormControl(WEIGHT.value,
      [Validators.required, Validators.min(WEIGHT.min), Validators.max(WEIGHT.max), Validators.minLength(WEIGHT.minLength), Validators.maxLength(WEIGHT.maxLength)]),
    k: new FormControl(K.value,
      [Validators.required, Validators.min(K.min), Validators.max(K.max), Validators.minLength(K.minLength), Validators.maxLength(K.maxLength)]),
    height: new FormControl(HEIGHT.value,
      [Validators.required, Validators.min(HEIGHT.min), Validators.max(HEIGHT.max), Validators.minLength(HEIGHT.minLength), Validators.maxLength(HEIGHT.maxLength)]),
  };

  form = new FormGroup({
    ...this.controls
  });

  constructor(
    public readonly appService: AppService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly pdfService: PdfService
  ) {
    this.appService.setTitle(APP_TITLE, 'K-Nearest Neighbor');
    this.appService.process.start('Loading...');

    if (isPlatformBrowser(this.platformId)) {
      this.textColor = this.documentStyle.getPropertyValue('--p-text-color');
      this.textColorSecondary = this.documentStyle.getPropertyValue('--p-text-muted-color');
      this.surfaceBorder = this.documentStyle.getPropertyValue('--p-content-border-color');
    } else {
      this.textColor = '#000000';
      this.textColorSecondary = '#000000';
      this.surfaceBorder = '#000000';
    }

    this.knnSetup.options.scales.x.ticks.color = this.textColorSecondary;
    this.knnSetup.options.scales.x.grid.color = this.surfaceBorder;
    this.knnSetup.options.scales.y.ticks.color = this.textColorSecondary;
    this.knnSetup.options.scales.y.grid.color = this.surfaceBorder;
    this.knnSetup.options.plugins.legend.labels.color = this.textColor;

    window.addEventListener('resize', () => {
      this.kNNChart.resize();
    });

    this.appService.process.stop();
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.renderKNNGraph();
  }

  get data(): number[][] {
    return this.persons.map(p => [p.weight, p.height]);
  }

  get fileURL(): string {
    return this.appService.fileURL;
  }

  get fileSize(): string {
    return this.appService.fileSize;
  }

  get labels(): string[] {
    return this.persons.map(p => (p.genre));
  }

  get men(): number[][] {
    return this.persons.filter(p => p.genre === 'Male').map(p => [p.weight, p.height]);
  }

  get women(): number[][] {
    return this.persons.filter(p => p.genre === 'Female').map(p => [p.weight, p.height]);
  }

  getPerson = (index: number): IPerson => this.persons[index];

  onPredict(): void {
    this.appService.process.start('Training model...');

    this.knn.init(this.controls.k.value, this.data, this.labels);
    this.knn.predict([this.controls.weight.value, this.controls.height.value]);

    this.appService.createDataJson(this.knn.info());
    this.appService.process.stop();
  }

  onPrint = (): void => {
    this.appService.process.start('Printing...');

    this.pdfService.exportPDF('htmlContent', 'resultados').subscribe({
      next: (status) => {
        console.info('exportPDF', status);
      },
      error: (e) => {
        console.info('exportPDF:ERROR', e);
      },
      complete: () => {
        this.appService.process.stop();
      }
    });
  };

  onSave(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de proceder?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appService.process.start('Upload SQL File');
        this.appService.process.stop();
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

  // Private Methods
  private initialize = (): void => {
    this.appService.process.start('Loading initial data...');

    this.knnSetup.data.labels = this.labels;
    this.knnSetup.data.datasets[0].data = this.women;
    this.knnSetup.data.datasets[1].data = this.men;

    this.appService.process.stop();
  }

  private renderKNNGraph = (): void => {
    const kNNContext = this.kNNCanvas.nativeElement.getContext('2d');

    if (kNNContext) {
      this.kNNChart = new Chart(kNNContext, { ...this.knnSetup });
    }
  }
}
