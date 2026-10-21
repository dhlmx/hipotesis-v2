import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { getFormArray, getRangesFromFormArray } from '../../../core/utilities/form';
import { randomMultidimensionalSeries } from '../../../core/utilities/random';

// Interfaces & Models
import { ChartHelper } from '../../../core/models/chart/chart-helper';
import { IAxisTitle } from '../../../core/interfaces/charts/iaxis-title';
import { IDataset } from '../../../core/interfaces/charts/idataset';
import { IPointXY } from '../../../core/interfaces/charts/ipoint-xy';
import { ITitle } from '../../../core/interfaces/charts/ititle';
import { KMeansAlgorithm } from '../../../core/models/ml/k-means-algorithm';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { AXES } from '../../../core/constants/math/math';
import { DIMENSION, ITERATIONS, K, POINTS, RANGE_MIN, RANGE_MAX } from '../../../core/constants/ml/k-means/data';

@Component({
  selector: 'app-k-means',
  templateUrl: './k-means.html',
  styleUrl: './k-means.css',
  providers: [FormBuilder, ChartService],
  imports: [CoreModule, PrimeNgModule],
})
export class KMeans implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('kMeansCanvas', { static: false }) kMeansCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('kMeansSolutionCanvas', { static: false }) kMeansSolutionCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('rmseCanvas', { static: false }) rmseCanvas!: ElementRef<HTMLCanvasElement>;

  private kMeansSetup = new ChartHelper('scatter');
  private kMeansSolutionSetup = new ChartHelper('scatter');
  private rmseSetup = new ChartHelper('line');

  private kMeansChart!: Chart;
  private kMeansSolutionChart!: Chart;
  private rmseChart!: Chart;

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
    iterations: FormControl
  } = {
    k: new FormControl(K.value,
      [Validators.required, Validators.min(K.min), Validators.max(K.max), Validators.minLength(K.minLength), Validators.maxLength(K.maxLength)]),
    iterations: new FormControl(ITERATIONS.value,
      [Validators.required, Validators.min(ITERATIONS.min), Validators.max(ITERATIONS.max), Validators.minLength(ITERATIONS.minLength), Validators.maxLength(ITERATIONS.maxLength)])
  };

  modelForm = new FormGroup({
    ...this.modelControls
  });

  dDimension = DIMENSION;
  dIterations = ITERATIONS;
  dK = K;
  dPoints = POINTS;
  dRangeMin = RANGE_MIN;
  dRangeMax = RANGE_MAX;

  points: number[][] = [];
  kMeans: KMeansAlgorithm = new KMeansAlgorithm();

  rangesControls: {
    min: FormControl,
    max: FormControl
  }[] = [];

  rangesForm = new FormGroup({
  });

  constructor(
    public readonly appService: AppService,
    private readonly chartService: ChartService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly pdfService: PdfService,
    private readonly fb: FormBuilder
  ) {
    this.appService.setTitle(APP_TITLE, 'K-Means');
    this.appService.process.start('Loading...');
    this.appService.resetFile();

    this.preconfigCharts();

    window.addEventListener('resize', () => {
      this.kMeansChart.resize();
      this.kMeansSolutionChart.resize();
      this.rmseChart.resize();
    });

    this.appService.process.stop();
  }
  ngOnDestroy(): void {
    this.kMeansChart.destroy();
    this.kMeansSolutionChart.destroy();
    this.rmseChart.destroy();
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.kMeansChart = this.chartService.render2D(this.kMeansCanvas, this.kMeansSetup);
    this.kMeansSolutionChart = this.chartService.render2D(this.kMeansSolutionCanvas, this.kMeansSolutionSetup);
    this.rmseChart = this.chartService.render2D(this.rmseCanvas, this.rmseSetup);
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

  getCentroidColor = (index: number): string => {
    let color = '';

    switch (index) {
      case 0:
        color = getColor('Aqua');
        break;
      case 1:
        color = getColor('Fuchsia');
        break;
      case 2:
        color = getColor('Green');
        break;
      case 3:
        color = getColor('Lime');
        break;
      case 4:
        color = getColor('Maroon');
        break;
      case 5:
        color = getColor('Olive');
        break;
      case 6:
        color = getColor('Orange');
        break;
      case 7:
        color = getColor('Purple');
        break;
      case 8:
        color = getColor('Silver');
        break;
      case 9:
        color = getColor('Teal');
        break;
      default:
        color = getColor('Yellow');
        break;
    }

    return color;
  }

  onChangeDimensions = (): void => {
    // this.buildRangesFormArray();
  };

  onGenerateData = (): void => {
    this.appService.process.start('Generating data...');
    this.kMeans.reset();

    this.points = randomMultidimensionalSeries(
      this.dataControls.dimensions.value,
      this.dataControls.points.value,
      getRangesFromFormArray(this.rangesForms, this.dataControls.dimensions.value),
      false,
      true
    );

    // Points
    this.chartService.setData(this.kMeansChart, 0, this.chartService.toPointsXY(this.points));
    this.kMeansChart.update();

    // Points + Centroids
    this.chartService.removeDatasets(this.kMeansSolutionChart);
    this.kMeansSolutionChart.update();

    // RMSE
    this.chartService.setData(this.rmseChart, 0, this.kMeans.logRMSEs);
    this.chartService.setLabels(this.rmseChart, this.kMeans.logIterations);
    this.rmseChart.update();

    this.appService.process.stop();
  };

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

  onRun = (): void => {
    this.appService.process.start('Running K-Means Algorithm...');

    this.kMeans = new KMeansAlgorithm();
    this.kMeans.init(this.points, this.modelControls.k.value, this.modelControls.iterations.value);
    this.kMeans.solve();

    // K-Means Solution Chart
    this.chartService.removeDatasets(this.kMeansSolutionChart);

    this.kMeans.centroids.forEach((centroid, centroidIndex) => {
      let centroidColor = this.getCentroidColor(centroidIndex);

      // Centroid
      this.chartService.addDataset(this.kMeansSolutionChart, {
        label: `K${centroidIndex + 1}`,
        data: [this.chartService.toPointXY(centroid)],
        backgroundColor: centroidColor,
        borderColor: centroidColor,
        pointRadius: 8,
      });

      // Allocations
      this.chartService.addDataset(this.kMeansSolutionChart, {
        label: `Points to K${centroidIndex + 1}`,
        data: this.kMeans.allocations.filter(a => a.nearestCentroid === centroidIndex).map(s => this.chartService.toPointXY(s.point)),
        backgroundColor: getColor('Black'),
        borderColor: centroidColor,
        pointRadius: 4,
      });
    });

    this.kMeansSolutionChart.update();

    // RMSE Chart
    this.chartService.setData(this.rmseChart, 0, this.kMeans.logRMSEs);
    this.rmseChart.data.labels = this.kMeans.logIterations;
    this.rmseChart.update();

    this.appService.createDataJson(this.kMeans.info());
    this.appService.process.stop();
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
  private readonly buildRangesFormArray = (): void => {
    this.dataControls.ranges = this.fb.array<FormGroup>([]);
    this.rangesControls = [];

    for (let i = 0; i < this.dataControls.dimensions.value; i++) {
      this.rangesControls.push({
        min: new FormControl(RANGE_MIN.value,
          [Validators.required, Validators.min(RANGE_MIN.min), Validators.max(RANGE_MIN.max), Validators.minLength(RANGE_MIN.minLength), Validators.maxLength(RANGE_MIN.maxLength)]),
        max: new FormControl(RANGE_MAX.value,
          [Validators.required, Validators.min(RANGE_MAX.min), Validators.max(RANGE_MAX.max), Validators.minLength(RANGE_MAX.minLength), Validators.maxLength(RANGE_MAX.maxLength)])
      });

      this.dataControls.ranges.push(
        this.fb.group(this.rangesControls[i])
      );
    }

    this.dataForm = new FormGroup({
      ...this.dataControls
    })
  };

  private readonly preconfigCharts = (): void => {
    // Points
    this.kMeansSetup.addDataset({
      label: 'Points',
      data: [] as IPointXY[],
      backgroundColor: getColor('Black'),
      borderColor:  '#42A5F5',
      pointRadius: 4,
    } as IDataset);
    this.kMeansSetup.setTitle({ text: 'K-Means Algorithm', font: { size: 22 } } as ITitle);
    this.kMeansSetup.setSubtitle({ text: 'Random Points', font: { size: 12 } } as ITitle);
    this.kMeansSetup.setXTitle({ text: 'Range 1D (x)' } as IAxisTitle);
    this.kMeansSetup.setYTitle({ text: 'Range 2D (y)' } as IAxisTitle);

    // Points + Centroids
    this.kMeansSolutionSetup.setTitle({ text: 'K-Means Algorithm', font: { size: 22 } } as ITitle);
    this.kMeansSolutionSetup.setSubtitle({ text: 'Random Points + Centroids', font: { size: 12 } } as ITitle);
    this.kMeansSolutionSetup.setXTitle({ text: 'Range 1D (x)' } as IAxisTitle);
    this.kMeansSolutionSetup.setYTitle({ text: 'Range 2D (y)' } as IAxisTitle);

    // RMSE
    this.rmseSetup.addDataset({
      label: 'RMSE vs Iterations',
      data: [] as number[],
      fill: false,
      borderColor: getColor('Green'),
      tension: 0.4
    } as IDataset);
    this.rmseSetup.setTitle({ text: 'Root Mean Squared Error, RMSE', font: { size: 22 } } as ITitle);
    this.rmseSetup.setSubtitle({ text: 'RMSE vs Iterations', font: { size: 12 } } as ITitle);
    this.rmseSetup.setXTitle({ text: 'Iterations' } as IAxisTitle);
    this.rmseSetup.setYTitle({ text: 'RMSE' } as IAxisTitle);
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading initial data...');

    this.buildRangesFormArray();

    this.dataForm.get('dimensions')?.valueChanges.subscribe((dimension) => {
      if (dimension >= this.dDimension.min && dimension <= this.dDimension.max) {
        this.buildRangesFormArray();
      }
    });

    this.appService.process.stop();
  }
}
