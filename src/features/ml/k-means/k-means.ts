import { AfterViewInit, Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, JsonPipe } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Chart } from 'chart.js';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services & Utilities
import { AppService } from '../../../core/services/app.service';
import { getFormArray, getFormControl, getFormGroupFromFormArray } from '../../../core/utilities/form';
import { PdfService } from '../../../core/services/pdf.service';
import { randomMultidimensionalSeries } from '../../../core/utilities/array';

// Interfaces & Models
import { IRange } from '../../../core/interfaces/ml/irange';
import { KMeansAlgorithm } from '../../../core/models/ml/k-means-algorithm';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { AXES } from '../../../core/constants/math/math';
import { CHART_K_MEANS, CHART_RMSE, DIMENSION, MAX, MIN, KMEANS, ITERATIONS, POINTS } from '../../../core/constants/ml/k-means/data';

@Component({
  selector: 'app-k-means',
  templateUrl: './k-means.html',
  styleUrl: './k-means.css',
  providers: [FormBuilder],
  imports: [CoreModule, PrimeNgModule],
})
export class KMeans implements OnInit, AfterViewInit {
  @ViewChild('kMeansCanvas', { static: false }) kMeansCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('rmseCanvas', { static: false }) rmseCanvas!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly documentStyle = getComputedStyle(document.documentElement);
  private textColor = '';
  private textColorSecondary = '';
  private surfaceBorder = '';

  private chartKMeans = { ...CHART_K_MEANS };
  private chartRMSE = { ...CHART_RMSE };
  dPoints = POINTS;
  dDimension = DIMENSION;
  dMin = MIN;
  dMax = MAX;
  dKMeans = KMEANS;
  dIterations = ITERATIONS;

  private kMeansChart!: Chart;
  private rmseChart!: Chart;
  points: number[][] = [];
  kMeans: KMeansAlgorithm = new KMeansAlgorithm();

  rangesControls: {
     min: FormControl,
    max: FormControl
  }[] = [];

  rangesForm = new FormGroup({
  });

  dataControls: {
    points: FormControl,
    dimensions: FormControl,
    ranges: FormArray<FormGroup>
  } = {
    points: new FormControl(POINTS.value,
      [Validators.required, Validators.min(POINTS.min), Validators.max(POINTS.max), Validators.minLength(POINTS.minLength), Validators.maxLength(POINTS.maxLength)]),
    dimensions: new FormControl(DIMENSION.value,
      [Validators.required, Validators.min(DIMENSION.min), Validators.max(DIMENSION.max), Validators.minLength(DIMENSION.minLength), Validators.maxLength(DIMENSION.maxLength)]),
    ranges: new FormArray<FormGroup>([])
  };

  dataForm = new FormGroup({
    ...this.dataControls
  });

  modelControls: {
    k: FormControl,
    maxOfIterations: FormControl
  } = {
    k: new FormControl(KMEANS.value,
      [Validators.required, Validators.min(KMEANS.min), Validators.max(KMEANS.max), Validators.minLength(KMEANS.minLength), Validators.maxLength(KMEANS.maxLength)]),
    maxOfIterations: new FormControl(ITERATIONS.value,
      [Validators.required, Validators.min(ITERATIONS.min), Validators.max(ITERATIONS.max), Validators.minLength(ITERATIONS.minLength), Validators.maxLength(ITERATIONS.maxLength)])
  };

  modelForm = new FormGroup({
    ...this.modelControls
  });

  constructor(
    public readonly appService: AppService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly pdfService: PdfService,
    private readonly fb: FormBuilder
  ) {
    this.appService.setTitle(APP_TITLE, 'K-Means');
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

    this.chartKMeans.options.scales.x.ticks.color = this.textColorSecondary;
    this.chartKMeans.options.scales.x.grid.color = this.surfaceBorder;
    this.chartKMeans.options.scales.y.ticks.color = this.textColorSecondary;
    this.chartKMeans.options.scales.y.grid.color = this.surfaceBorder;
    this.chartKMeans.options.plugins.legend.labels.color = this.textColor;

    this.chartRMSE.options.scales.x.ticks.color = this.textColorSecondary;
    this.chartRMSE.options.scales.x.grid.color = this.surfaceBorder;
    this.chartRMSE.options.scales.y.ticks.color = this.textColorSecondary;
    this.chartRMSE.options.scales.y.grid.color = this.surfaceBorder;
    this.chartRMSE.options.plugins.legend.labels.color = this.textColor;

    window.addEventListener('resize', () => {
      this.kMeansChart.resize();
      this.rmseChart.resize();
    });

    this.appService.process.stop();
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.renderKMeansGraph();
    this.renderRMSEGraph();
  }

  get fileURL(): string {
    return this.appService.fileURL;
  }

  get fileSize(): string {
    return this.appService.fileSize;
  }

  get rangesForms(): FormArray {
    return getFormArray(this.dataForm, 'ranges') as FormArray;
  }

  getAxes = (dimension: number): string => dimension < 0 || dimension > 2 ? '' : `${AXES[dimension]}`;

  onGenerateData = (): void => {
    this.appService.process.start('Generating data...');
    this.kMeans.reset();

    const ranges: IRange[] = [];

    for (let i = 0; i < this.dataControls.dimensions.value; i++) {
      const formGroup = getFormGroupFromFormArray(this.rangesForms, i);

      if (formGroup !== null && formGroup instanceof FormGroup) {
        const min = getFormControl(formGroup, 'min');
        const max = getFormControl(formGroup, 'max');

        if (min !== null && max !== null) {
          ranges.push({
            min: min.value,
            max: max.value
          });
        }
      }
    }

    this.points = randomMultidimensionalSeries(
      2,
      this.dataControls.points.value,
      ranges,
      false,
      true
    );

    this.chartKMeans.data.datasets[0].data = this.points.map(point => ({ x: point[0], y: point[1] }));
    this.chartKMeans.data.datasets[1].data = this.kMeans.centroids2D;
    this.kMeansChart.update();

    this.chartRMSE.data.labels = this.kMeans.logIterations;
    this.chartRMSE.data.datasets[0].data = this.kMeans.logRMSEs;
    this.rmseChart.update();

    this.appService.process.stop();
  };

  onChangeDimensions = (): void => {
    // this.buildRangesFormArray();
  };

  onCalculate(): void {
    this.appService.process.start('Training model...');

    this.kMeans = new KMeansAlgorithm();
    this.kMeans.init(this.points, this.modelControls.k.value, this.modelControls.maxOfIterations.value);
    this.kMeans.solve();

    this.chartKMeans.data.datasets[1].data = this.kMeans.centroids2D;
    this.kMeansChart.update();

    this.chartRMSE.data.labels = this.kMeans.logIterations;
    this.chartRMSE.data.datasets[0].data = this.kMeans.logRMSEs;
    this.rmseChart.update();

    this.appService.createDataJson(this.kMeans.info());
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

  round = (value: number): number => Math.round(value);

  // Private Methods
  private buildRangesFormArray = (): void => {
    this.dataControls.ranges = this.fb.array<FormGroup>([]);
    this.rangesControls = [];

    for (let i = 0; i < this.dataControls.dimensions.value; i++) {
      this.rangesControls.push({
        min: new FormControl(MIN.value,
          [Validators.required, Validators.min(MIN.min), Validators.max(MIN.max), Validators.minLength(MIN.minLength), Validators.maxLength(MIN.maxLength)]),
        max: new FormControl(MAX.value,
          [Validators.required, Validators.min(MAX.min), Validators.max(MAX.max), Validators.minLength(MAX.minLength), Validators.maxLength(MAX.maxLength)])
      });

      this.dataControls.ranges.push(
        this.fb.group(this.rangesControls[i])
      );
    }

    this.dataForm = new FormGroup({
      ...this.dataControls
    })
  };

  private initialize = (): void => {
    this.appService.process.start('Loading initial data...');

    this.buildRangesFormArray();

    this.dataForm.get('dimensions')?.valueChanges.subscribe((dimension) => {
      if (dimension >= this.dDimension.min && dimension <= this.dDimension.max) {
        this.buildRangesFormArray();
      }
    });

    this.appService.process.stop();
  }

  private renderKMeansGraph = (): void => {
    const kMeansContext = this.kMeansCanvas.nativeElement.getContext('2d');

    if (kMeansContext) {
      this.kMeansChart = new Chart(kMeansContext, { ...this.chartKMeans });
    }
  }

  private renderRMSEGraph = (): void => {
    const rmseContext = this.rmseCanvas.nativeElement.getContext('2d');

    if (rmseContext) {
      this.rmseChart = new Chart(rmseContext, { ...this.chartRMSE });
    }
  }
}
