import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Chart } from 'chart.js';
import { Ensemble,Metrics } from '@kanaries/ml';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services & Utilities
import { AppService } from '../../../core/services/app.service';
import { ChartService } from '../../../core/services/chart.service';
import { IrisService } from '../../../core/services/iris.service';
import { PdfService } from '../../../core/services/pdf.service';

// Interfaces & Models
import { ChartHelper } from '../../../core/models/chart/chart-helper';
import { IAxisTitle } from '../../../core/interfaces/charts/iaxis-title';
import { ISelect } from '../../../core/interfaces/iselect';
import { ISVMTest } from '../../../core/interfaces/ml/isvm-test';
import { ITitle } from '../../../core/interfaces/charts/ititle';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { CONTROL_ESTIMATORS, CONTROL_MAX_FEATURES, CONTROL_RANDOM_STATE, MAX_FEATURES } from '../../../core/constants/ml/random-forest/data';
import { PETAL_LENGTH, PETAL_LENGTH_VS_WIDTH, PETAL_WIDTH, SEPAL_LENGTH, SEPAL_LENGTH_VS_PETAL_LENGTH, SEPAL_LENGTH_VS_PETAL_WIDTH, SEPAL_LENGTH_VS_WIDTH, SEPAL_WIDTH, SEPAL_WIDTH_VS_PETAL_LENGTH, SEPAL_WIDTH_VS_PETAL_WIDTH } from '../../../core/constants/ml/support-vector-machine/data';

@Component({
  selector: 'app-random-forest',
  templateUrl: './random-forest.html',
  styleUrl: './random-forest.css',
  providers: [HttpClient, IrisService, ChartService],
  imports: [CoreModule, PrimeNgModule],
})
export class RandomForest implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('sepalLengthCanvas', { static: false }) sepalLengthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sepalWidthCanvas', { static: false }) sepalWidthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('petalLengthCanvas', { static: false }) petalLengthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('petalWidthCanvas', { static: false }) petalWidthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sepalLengthVsWidthCanvas', { static: false }) sepalLengthVsWidthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('petalLengthVsWidthCanvas', { static: false }) petalLengthVsWidthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sepalLengthVsPetalLengthCanvas', { static: false }) sepalLengthVsPetalLengthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sepalLengthVsPetalWidthCanvas', { static: false }) sepalLengthVsPetalWidthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sepalWidthVsPetalLengthCanvas', { static: false }) sepalWidthVsPetalLengthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sepalWidthVsPetalWidthCanvas', { static: false }) sepalWidthVsPetalWidthCanvas!: ElementRef<HTMLCanvasElement>;

  private readonly sepalLength = new ChartHelper('line');
  private readonly sepalWidth = new ChartHelper('line');
  private readonly petalLength = new ChartHelper('line');
  private readonly petalWidth = new ChartHelper('line');
  private readonly sepalLengthVsWidth = new ChartHelper('scatter');
  private readonly petalLengthVsWidth = new ChartHelper('scatter');
  private readonly sepalLengthVsPetalLength = new ChartHelper('scatter');
  private readonly sepalLengthVsPetalWidth = new ChartHelper('scatter');
  private readonly sepalWidthVsPetalLength = new ChartHelper('scatter');
  private readonly sepalWidthVsPetalWidth = new ChartHelper('scatter');

  private sepalLengthChart!: Chart;
  private sepalWidthChart!: Chart;
  private petalLengthChart!: Chart;
  private petalWidthChart!: Chart;
  private sepalLengthVsWidthChart!: Chart;
  private petalLengthVsWidthChart!: Chart;
  private sepalLengthVsPetalLengthChart!: Chart;
  private sepalLengthVsPetalWidthChart!: Chart;
  private sepalWidthVsPetalLengthChart!: Chart;
  private sepalWidthVsPetalWidthChart!: Chart;

  maxFeaturesOptions = MAX_FEATURES.map(mf => ({ label: mf, value: mf, inactive: false } as ISelect));
  maxFeatures = CONTROL_MAX_FEATURES;
  estimators = CONTROL_ESTIMATORS;
  randomState = CONTROL_RANDOM_STATE;

  controls: {
    maxFeatures: FormControl,
    estimators: FormControl,
    randomState: FormControl
  } = {
    maxFeatures: new FormControl(this.maxFeatures.value, [Validators.required]),
    estimators: new FormControl(this.estimators.value, [Validators.required, Validators.min(this.estimators.min), Validators.max(this.estimators.max)]),
    randomState: new FormControl(this.randomState.value, [Validators.required, Validators.min(this.randomState.min), Validators.max(this.randomState.max)])
  };

  form = new FormGroup({
    ...this.controls
  });

  randomSample: {
    train: { measurements: number[], features: number[][], species: string[], labels: number[] },
    test: { measurements: number[], features: number[][], species: string[], labels: number[] }
  } = {
  train: { measurements: [], features: [], species: [], labels: [] },
  test: { measurements: [], features: [], species: [], labels: [] }
  };

  rfc = new Ensemble.RandomForestClassifier();
  predictions: number[] = [];
  tests: ISVMTest[] = [];
  matrix: number[][] = [];

  constructor(
    public readonly appService: AppService,
    private readonly chartService: ChartService,
    private readonly confirmationService: ConfirmationService,
    private readonly iris: IrisService,
    private readonly messageService: MessageService,
    private readonly pdfService: PdfService
  ) {
    this.appService.setTitle(APP_TITLE, 'Support Vector Machine');
    this.appService.process.start('Loading data...');
    this.appService.resetFile();

    window.addEventListener('resize', () => {
      this.sepalLengthChart.resize();
      this.sepalWidthChart.resize();
      this.petalLengthChart.resize();
      this.petalWidthChart.resize();
      this.sepalLengthVsWidthChart.resize();
      this.petalLengthVsWidthChart.resize();
      this.sepalLengthVsPetalLengthChart.resize();
      this.sepalLengthVsPetalWidthChart.resize();
      this.sepalWidthVsPetalLengthChart.resize();
      this.sepalWidthVsPetalWidthChart.resize();
    });
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.iris.load('data/iris.csv').subscribe({
      next: () => {
        this.sepalLengthChart = this.chartService.render2D(this.sepalLengthCanvas, this.sepalLength.toObject());
        this.sepalWidthChart = this.chartService.render2D(this.sepalWidthCanvas, this.sepalWidth.toObject());
        this.petalLengthChart = this.chartService.render2D(this.petalLengthCanvas, this.petalLength.toObject());
        this.petalWidthChart = this.chartService.render2D(this.petalWidthCanvas, this.petalWidth.toObject());
        this.sepalLengthVsWidthChart = this.chartService.render2D(this.sepalLengthVsWidthCanvas, this.sepalLengthVsWidth.toObject());
        this.petalLengthVsWidthChart = this.chartService.render2D(this.petalLengthVsWidthCanvas, this.petalLengthVsWidth.toObject());
        this.sepalLengthVsPetalLengthChart = this.chartService.render2D(this.sepalLengthVsPetalLengthCanvas, this.sepalLengthVsPetalLength.toObject());
        this.sepalLengthVsPetalWidthChart = this.chartService.render2D(this.sepalLengthVsPetalWidthCanvas, this.sepalLengthVsPetalWidth.toObject());
        this.sepalWidthVsPetalLengthChart = this.chartService.render2D(this.sepalWidthVsPetalLengthCanvas, this.sepalWidthVsPetalLength.toObject());
        this.sepalWidthVsPetalWidthChart = this.chartService.render2D(this.sepalWidthVsPetalWidthCanvas, this.sepalWidthVsPetalWidth.toObject());
      },
      complete: () => {
        this.sepalLength.setLabels(this.iris.measurements.map(m => m.toString()));
        this.sepalLength.addDataset(SEPAL_LENGTH.setosa.dataset, this.iris.getSepalLengthBySpecies('Iris-setosa'));
        this.sepalLength.addDataset(SEPAL_LENGTH.versicolor.dataset, this.iris.getSepalLengthBySpecies('Iris-versicolor'));
        this.sepalLength.addDataset(SEPAL_LENGTH.virginica.dataset, this.iris.getSepalLengthBySpecies('Iris-virginica'));
        this.sepalLengthChart.update();

        this.sepalWidth.setLabels(this.iris.measurements.map(m => m.toString()));
        this.sepalWidth.addDataset(SEPAL_WIDTH.setosa.dataset, this.iris.getSepalWidthBySpecies('Iris-setosa'));
        this.sepalWidth.addDataset(SEPAL_WIDTH.versicolor.dataset, this.iris.getSepalWidthBySpecies('Iris-versicolor'));
        this.sepalWidth.addDataset(SEPAL_WIDTH.virginica.dataset, this.iris.getSepalWidthBySpecies('Iris-virginica'));
        this.sepalWidthChart.update();

        this.petalLength.setLabels(this.iris.measurements.map(m => m.toString()));
        this.petalLength.addDataset(PETAL_LENGTH.setosa.dataset, this.iris.getPetalLengthBySpecies('Iris-setosa'));
        this.petalLength.addDataset(PETAL_LENGTH.versicolor.dataset, this.iris.getPetalLengthBySpecies('Iris-versicolor'));
        this.petalLength.addDataset(PETAL_LENGTH.virginica.dataset, this.iris.getPetalLengthBySpecies('Iris-virginica'));
        this.petalLengthChart.update();

        this.petalLengthVsWidth.setLabels(this.iris.measurements.map(m => m.toString()));
        this.petalLengthVsWidth.addDataset(PETAL_LENGTH_VS_WIDTH.setosa.dataset, this.iris.getPetalLengthVsWidthBySpecies('Iris-setosa'));
        this.petalLengthVsWidth.addDataset(PETAL_LENGTH_VS_WIDTH.versicolor.dataset, this.iris.getPetalLengthVsWidthBySpecies('Iris-versicolor'));
        this.petalLengthVsWidth.addDataset(PETAL_LENGTH_VS_WIDTH.virginica.dataset, this.iris.getPetalLengthVsWidthBySpecies('Iris-virginica'));
        this.petalLengthVsWidthChart.update();

        this.petalWidth.setLabels(this.iris.measurements.map(m => m.toString()));
        this.petalWidth.addDataset(PETAL_WIDTH.setosa.dataset, this.iris.getPetalWidthBySpecies('Iris-setosa'));
        this.petalWidth.addDataset(PETAL_WIDTH.versicolor.dataset, this.iris.getPetalWidthBySpecies('Iris-versicolor'));
        this.petalWidth.addDataset(PETAL_WIDTH.virginica.dataset, this.iris.getPetalWidthBySpecies('Iris-virginica'));
        this.petalWidthChart.update();

        this.sepalLengthVsWidth.setLabels(this.iris.measurements.map(m => m.toString()));
        this.sepalLengthVsWidth.addDataset(SEPAL_LENGTH_VS_WIDTH.setosa.dataset, this.iris.getSepalLengthVsWidthBySpecies('Iris-setosa'));
        this.sepalLengthVsWidth.addDataset(SEPAL_LENGTH_VS_WIDTH.versicolor.dataset, this.iris.getSepalLengthVsWidthBySpecies('Iris-versicolor'));
        this.sepalLengthVsWidth.addDataset(SEPAL_LENGTH_VS_WIDTH.virginica.dataset, this.iris.getSepalLengthVsWidthBySpecies('Iris-virginica'));
        this.sepalLengthVsWidthChart.update();

        this.sepalLengthVsPetalLength.setLabels(this.iris.measurements.map(m => m.toString()));
        this.sepalLengthVsPetalLength.addDataset(SEPAL_LENGTH_VS_PETAL_LENGTH.setosa.dataset, this.iris.getSepalLengthVsPetalLengthBySpecies('Iris-setosa'));
        this.sepalLengthVsPetalLength.addDataset(SEPAL_LENGTH_VS_PETAL_LENGTH.versicolor.dataset, this.iris.getSepalLengthVsPetalLengthBySpecies('Iris-versicolor'));
        this.sepalLengthVsPetalLength.addDataset(SEPAL_LENGTH_VS_PETAL_LENGTH.virginica.dataset, this.iris.getSepalLengthVsPetalLengthBySpecies('Iris-virginica'));
        this.sepalLengthVsPetalLengthChart.update();

        this.sepalLengthVsPetalWidth.setLabels(this.iris.measurements.map(m => m.toString()));
        this.sepalLengthVsPetalWidth.addDataset(SEPAL_LENGTH_VS_PETAL_WIDTH.setosa.dataset, this.iris.getSepalLengthVsPetalWidthBySpecies('Iris-setosa'));
        this.sepalLengthVsPetalWidth.addDataset(SEPAL_LENGTH_VS_PETAL_WIDTH.versicolor.dataset, this.iris.getSepalLengthVsPetalWidthBySpecies('Iris-versicolor'));
        this.sepalLengthVsPetalWidth.addDataset(SEPAL_LENGTH_VS_PETAL_WIDTH.virginica.dataset, this.iris.getSepalLengthVsPetalWidthBySpecies('Iris-virginica'));
        this.sepalLengthVsPetalWidthChart.update();

        this.sepalWidthVsPetalLength.setLabels(this.iris.measurements.map(m => m.toString()));
        this.sepalWidthVsPetalLength.addDataset(SEPAL_WIDTH_VS_PETAL_LENGTH.setosa.dataset, this.iris.getSepalWidthVsPetalLengthBySpecies('Iris-setosa'));
        this.sepalWidthVsPetalLength.addDataset(SEPAL_WIDTH_VS_PETAL_LENGTH.versicolor.dataset, this.iris.getSepalWidthVsPetalLengthBySpecies('Iris-versicolor'));
        this.sepalWidthVsPetalLength.addDataset(SEPAL_WIDTH_VS_PETAL_LENGTH.virginica.dataset, this.iris.getSepalWidthVsPetalLengthBySpecies('Iris-virginica'));
        this.sepalWidthVsPetalLengthChart.update();

        this.sepalWidthVsPetalWidth.setLabels(this.iris.measurements.map(m => m.toString()));
        this.sepalWidthVsPetalWidth.addDataset(SEPAL_WIDTH_VS_PETAL_WIDTH.setosa.dataset, this.iris.getSepalWidthVsPetalWidthBySpecies('Iris-setosa'));
        this.sepalWidthVsPetalWidth.addDataset(SEPAL_WIDTH_VS_PETAL_WIDTH.versicolor.dataset, this.iris.getSepalWidthVsPetalWidthBySpecies('Iris-versicolor'));
        this.sepalWidthVsPetalWidth.addDataset(SEPAL_WIDTH_VS_PETAL_WIDTH.virginica.dataset, this.iris.getSepalWidthVsPetalWidthBySpecies('Iris-virginica'));
        this.sepalWidthVsPetalWidthChart.update();

        this.randomSample = this.iris.getRandomSample(15);
        this.appService.process.stop();
      }
    });
  }

  ngOnDestroy(): void {
    this.sepalLengthChart.destroy();
    this.sepalWidthChart.destroy();
    this.petalLengthChart.destroy();
    this.petalLengthVsWidthChart.destroy();
    this.petalWidthChart.destroy();
    this.sepalLengthVsWidthChart.destroy();
    this.sepalLengthVsPetalLengthChart.destroy();
    this.sepalLengthVsPetalWidthChart.destroy();
    this.sepalWidthVsPetalLengthChart.destroy();
    this.sepalWidthVsPetalWidthChart.destroy();
  }

  get fileURL(): string {
    return this.appService.fileURL;
  }

  get fileSize(): string {
    return this.appService.fileSize;
  }

  get uniqueSpecies(): string[] {
    return this.iris.uniqueSpecies;
  }

  onPredict(): void {
    this.predictions = this.rfc.predict(this.randomSample.test.features);

    this.predictions.forEach((p, i) => {
      console.info('Prediction', p);
      let adjustment = Math.round(p);
      this.tests.push({
        measurement: this.randomSample.test.measurements[i],
        species: this.randomSample.test.species[i],
        label: this.randomSample.test.labels[i],
        prediction: p,
        adjustment,
        isTrue: p === this.randomSample.test.labels[i] || adjustment === this.randomSample.test.labels[i]
      });
    });

    this.matrix = Metrics.confusionMatrix(
        this.tests.map(t => t.adjustment),
        this.tests.map(t => t.label),
        this.iris.uniqueSpecies.map((_, i) => i)
      );

    this.appService.createDataJson({
      tests: this.tests,
      accuracy: this.tests.filter(t => t.isTrue).length / this.tests.length,
      matrix: this.matrix
    });
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

  onSave = (): void => {
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
  };

  onTrain = (): void => {
    this.appService.process.start('Training...');

    this.appService.resetFile();

    this.rfc = new Ensemble.RandomForestClassifier({
      nEstimators: this.controls.estimators.value,
      maxFeatures: this.controls.maxFeatures.value,
      randomState: this.controls.randomState.value,
      bootstrap: true
    });

    this.predictions = [];
    this.tests = [];
    this.matrix = [];

    setTimeout(() => {
      this.rfc.fit(this.randomSample.train.features, this.randomSample.train.labels);
      this.appService.process.stop();
      this.messageService.add({ severity: 'success', summary: 'Info', detail: 'Training finished' })
    }, 1000);
  }

  // Private Methods
  private readonly initialize = (): void => {
    this.setCharts();
  }

  private readonly setCharts = (): void => {
    this.petalLength.setTitle({ text: 'Petal Length by Species', font: { size: 22 } } as ITitle);
    this.petalLength.setXTitle({ text: 'Measurements' } as IAxisTitle);
    this.petalLength.setYTitle({ text: 'Length (cm)' } as IAxisTitle);

    this.petalLengthVsWidth.setTitle({ text: 'Petal Length and Width by Species', font: { size: 22 } } as ITitle);
    this.petalLengthVsWidth.setXTitle({ text: 'Length (cm)' } as IAxisTitle);
    this.petalLengthVsWidth.setYTitle({ text: 'Width (cm)' } as IAxisTitle);

    this.petalWidth.setTitle({ text: 'Petal Width by Species', font: { size: 22 } } as ITitle);
    this.petalWidth.setXTitle({ text: 'Measurements' } as IAxisTitle);
    this.petalWidth.setYTitle({ text: 'Width (cm)' } as IAxisTitle);

    this.sepalLength.setTitle({ text: 'Sepal Length by Species', font: { size: 22 } } as ITitle);
    this.sepalLength.setXTitle({ text: 'Measurements' } as IAxisTitle);
    this.sepalLength.setYTitle({ text: 'Length (cm)' } as IAxisTitle);

    this.sepalLengthVsPetalLength.setTitle({ text: 'Sepal Length Vs Petal Length by Species', font: { size: 22 } } as ITitle);
    this.sepalLengthVsPetalLength.setXTitle({ text: 'Sepal Length (cm)' } as IAxisTitle);
    this.sepalLengthVsPetalLength.setYTitle({ text: 'Petal Length (cm)' } as IAxisTitle);

    this.sepalLengthVsPetalWidth.setTitle({ text: 'Sepal Length vs Petal Width by Species', font: { size: 22 } } as ITitle);
    this.sepalLengthVsPetalWidth.setXTitle({ text: 'Sepal Length (cm)' } as IAxisTitle);
    this.sepalLengthVsPetalWidth.setYTitle({ text: 'Petal Width (cm)' } as IAxisTitle);

    this.sepalWidthVsPetalLength.setTitle({ text: 'Sepal Width Vs Petal Length by Species', font: { size: 22 } } as ITitle);
    this.sepalWidthVsPetalLength.setXTitle({ text: 'Sepal Width (cm)' } as IAxisTitle);
    this.sepalWidthVsPetalLength.setYTitle({ text: 'Petal Length (cm)' } as IAxisTitle);

    this.sepalWidthVsPetalWidth.setTitle({ text: 'Sepal Width Vs Petal Width by Species', font: { size: 22 } } as ITitle);
    this.sepalWidthVsPetalWidth.setXTitle({ text: 'Sepal Width (cm)' } as IAxisTitle);
    this.sepalWidthVsPetalWidth.setYTitle({ text: 'Petal Width (cm)' } as IAxisTitle);

    this.sepalLengthVsWidth.setTitle({ text: 'Sepal Length and Width by Species', font: { size: 22 } } as ITitle);
    this.sepalLengthVsWidth.setXTitle({ text: 'Length (cm)' } as IAxisTitle);
    this.sepalLengthVsWidth.setYTitle({ text: 'Width (cm)' } as IAxisTitle);

    this.sepalWidth.setTitle({ text: 'Sepal Width by Species', font: { size: 22 } } as ITitle);
    this.sepalWidth.setXTitle({ text: 'Measurements' } as IAxisTitle);
    this.sepalWidth.setYTitle({ text: 'Width (cm)' } as IAxisTitle);
  };
}
