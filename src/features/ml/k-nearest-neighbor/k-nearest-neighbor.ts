import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Chart } from 'chart.js';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services & Utilities
import { AppService } from '../../../core/services/app.service';
import { ChartService } from '../../../core/services/chart.service';
import { PdfService } from '../../../core/services/pdf.service';
import { getColor } from '../../../core/constants/color';

// Interfaces & Models
import { ChartHelper } from '../../../core/models/chart/chart-helper';
import { IFormControl } from '../../../core/interfaces/iform-control';
import { IPerson } from '../../../core/interfaces/ml/iperson';
import { KNearestNeighborAlgorithm } from '../../../core/models/ml/k-nearest-neighbor-algorithm';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { K, HEIGHT, PERSONS, WEIGHT } from '../../../core/constants/ml/k-nearest-neighbor/data';
import { IDataset } from '../../../core/interfaces/charts/idataset';
import { IPointXY } from '../../../core/interfaces/charts/ipoint-xy';

@Component({
  selector: 'app-k-nearest-neighbor',
  templateUrl: './k-nearest-neighbor.html',
  styleUrl: './k-nearest-neighbor.css',
  providers: [ChartService],
  imports: [CoreModule, PrimeNgModule],
})
export class KNearestNeighbor implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('knnCanvas', { static: false }) knnCanvas!: ElementRef<HTMLCanvasElement>;

  private readonly persons: IPerson[] = PERSONS;
  private readonly knnSetup = new ChartHelper('scatter');
  private knnChart!: Chart;

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
    private readonly chartService: ChartService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly pdfService: PdfService
  ) {
    this.appService.setTitle(APP_TITLE, 'K-Nearest Neighbor');
    this.appService.process.start('Loading...');
    this.appService.resetFile();

    window.addEventListener('resize', () => {
      this.knnChart.resize();
    });

    this.appService.process.stop();
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.knnChart = this.chartService.render2D(this.knnCanvas, this.knnSetup);
    this.appService.process.stop();
  }

  ngOnDestroy(): void {
    this.knnChart.destroy();
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
    this.setCharts();
  }

  private setCharts = (): void => {
    this.knnSetup.setLabels(this.labels);

    this.knnSetup.addDataset({
      label: 'Female',
      data: this.chartService.toPointsXY(this.women),
      backgroundColor: getColor('Black'),
      borderColor: getColor('Aqua'),
      pointRadius: 4
    } as IDataset);

    this.knnSetup.addDataset({
      label: 'Male',
      data: this.chartService.toPointsXY(this.men),
      backgroundColor: getColor('Black'),
      borderColor: getColor('Orange'),
      pointRadius: 4
    } as IDataset);
  }
}
