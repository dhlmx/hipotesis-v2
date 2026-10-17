import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { SVM } from '@kanaries/ml';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services & Utilities
import { AppService } from '../../../core/services/app.service';
import { ChartService } from '../../../core/services/chart.service';
import { CSVService } from '../../../core/services/csv.service';
import { IrisService } from '../../../core/services/iris.service';
import { PdfService } from '../../../core/services/pdf.service';

// Interfaces & Models

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { CONTROL_EPSILON as EPSILON, CONTROL_RARE_TOKEN_WEIGHT as WEIGHT } from '../../../core/constants/ml/naive-bayes/data';
import { Chart } from 'chart.js';
import { SEPAL_LENGTH, SEPAL_WIDTH, PETAL_LENGTH, PETAL_WIDTH } from '../../../core/constants/ml/support-vector-machine/data';
import { ICHART_LINE_DEFAULT } from '../../../core/interfaces/charts/ichart-line';


@Component({
  selector: 'app-support-vector-machine',
  templateUrl: './support-vector-machine.html',
  styleUrl: './support-vector-machine.css',
  providers: [HttpClient, IrisService, ChartService],
  imports: [CoreModule, PrimeNgModule],
})
export class SupportVectorMachine implements OnInit, AfterViewInit {
  @ViewChild('sepalLengthCanvas', { static: false }) sepalLengthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sepalWidthCanvas', { static: false }) sepalWidthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('petalLengthCanvas', { static: false }) petalLengthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('petalWidthCanvas', { static: false }) petalWidthCanvas!: ElementRef<HTMLCanvasElement>;

  private readonly sepalLengthSetup = { ...ICHART_LINE_DEFAULT, ...SEPAL_LENGTH };
  private readonly sepalWidthSetup = { ...ICHART_LINE_DEFAULT, ...SEPAL_WIDTH };
  private readonly petalLengthSetup = { ...ICHART_LINE_DEFAULT, ...PETAL_LENGTH };
  private readonly petalWidthSetup = { ...ICHART_LINE_DEFAULT, ...PETAL_WIDTH };

  private sepalLengthChart!: Chart;
  private sepalWidthChart!: Chart;
  private petalLengthChart!: Chart;
  private petalWidthChart!: Chart;

  controls: {
    epsilon: FormControl,
    weight: FormControl
  } = {
    epsilon: new FormControl(EPSILON.value,
      [Validators.required, Validators.min(EPSILON.min), Validators.max(EPSILON.max), Validators.minLength(EPSILON.minLength), Validators.maxLength(EPSILON.maxLength)]),
    weight: new FormControl(WEIGHT.value,
      [Validators.required, Validators.min(WEIGHT.min), Validators.max(WEIGHT.max), Validators.minLength(WEIGHT.minLength), Validators.maxLength(WEIGHT.maxLength)])
  };

  form = new FormGroup({
    ...this.controls
  });

  epsilon = EPSILON;
  weight = WEIGHT;
  svm = new SVM.LinearSVR({ C: 1, epsilon: 0, maxIter: 1000, randomState: 0 });

  constructor(
    public readonly appService: AppService,
    private readonly chartService: ChartService,
    private readonly confirmationService: ConfirmationService,
    private readonly iris: IrisService,
    private readonly messageService: MessageService,
    private readonly pdfService: PdfService
  ) {
    this.appService.setTitle(APP_TITLE, 'Support Vector Machine');
    this.appService.resetFile();

    window.addEventListener('resize', () => {
      this.sepalLengthChart.resize();
      this.sepalWidthChart.resize();
      this.petalLengthChart.resize();
      this.petalWidthChart.resize();
    });
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.appService.process.start('Loading initial data...');

    this.sepalLengthChart = this.chartService.render2D(this.sepalLengthCanvas, this.sepalLengthSetup);
    this.sepalWidthChart = this.chartService.render2D(this.sepalWidthCanvas, this.sepalWidthSetup);
    this.petalLengthChart = this.chartService.render2D(this.petalLengthCanvas, this.petalLengthSetup);
    this.petalWidthChart = this.chartService.render2D(this.petalWidthCanvas, this.petalWidthSetup);

    this.iris.load('data/iris.csv').subscribe({
      next: () => {
      },
      complete: () => {
        this.sepalLengthChart.data.datasets[0].data = this.iris.getSepalLengthBySpecie('Iris-setosa');
        this.sepalLengthChart.data.datasets[1].data = this.iris.getSepalLengthBySpecie('Iris-versicolor');
        this.sepalLengthChart.data.datasets[2].data = this.iris.getSepalLengthBySpecie('Iris-virginica');
        this.sepalLengthChart.data.labels = this.iris.labels;
        this.sepalLengthChart.update();

        this.sepalWidthChart.data.datasets[0].data = this.iris.getSepalWidthBySpecie('Iris-setosa');
        this.sepalWidthChart.data.datasets[1].data = this.iris.getSepalWidthBySpecie('Iris-versicolor');
        this.sepalWidthChart.data.datasets[2].data = this.iris.getSepalWidthBySpecie('Iris-virginica');
        this.sepalWidthChart.data.labels = this.iris.labels;
        this.sepalWidthChart.update();

        this.petalLengthChart.data.datasets[0].data = this.iris.getPetalLengthBySpecie('Iris-setosa');
        this.petalLengthChart.data.datasets[1].data = this.iris.getPetalLengthBySpecie('Iris-versicolor');
        this.petalLengthChart.data.datasets[2].data = this.iris.getPetalLengthBySpecie('Iris-virginica');
        this.petalLengthChart.data.labels = this.iris.labels;
        this.petalLengthChart.update();

        this.petalWidthChart.data.datasets[0].data = this.iris.getPetalWidthBySpecie('Iris-setosa');
        this.petalWidthChart.data.datasets[1].data = this.iris.getPetalWidthBySpecie('Iris-versicolor');
        this.petalWidthChart.data.datasets[2].data = this.iris.getPetalWidthBySpecie('Iris-virginica');
        this.petalWidthChart.data.labels = this.iris.labels;
        this.petalWidthChart.update();

        this.svm.fit(this.iris.numbers4D, this.iris.labels);
        this.appService.process.stop();
      }
    });

    this.appService.process.stop();
  }

  get fileURL(): string {
    return this.appService.fileURL;
  }

  get fileSize(): string {
    return this.appService.fileSize;
  }

  onPredict(isNeutral: boolean = false): void {
    const pred = this.svm.predict(this.iris.getNumber4D(25));

    this.appService.createDataJson({
      prediction: pred,
      real: this.iris.getSpecies(25),
      predicted: this.iris.getSpecies(Math.round(pred[0]))
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

  onTrain(): void {
    this.appService.process.start('Training...');

    this.iris.load('data/iris.csv').subscribe({
      next: () => {
      },
      complete: () => {
        setTimeout(() => {
          this.sepalLengthChart.data.datasets[0].data = this.iris.sepalLengths;
          this.sepalLengthChart.data.labels = this.iris.labels;
          this.sepalLengthChart.update();

          this.sepalWidthChart.data.datasets[0].data = this.iris.sepalWidths;
          this.sepalWidthChart.data.labels = this.iris.labels;
          this.sepalWidthChart.update();

          this.petalLengthChart.data.datasets[0].data = this.iris.petalLengths;
          this.petalLengthChart.data.labels = this.iris.labels;
          this.petalLengthChart.update();

          this.petalWidthChart.data.datasets[0].data = this.iris.petalWidths;
          this.petalWidthChart.data.labels = this.iris.labels;
          this.petalWidthChart.update();

          this.svm.fit(this.iris.numbers4D, this.iris.labels);
          this.appService.process.stop();
        }, 2000);
      }
    });
  }

  // Private Methods
  private readonly initialize = (): void => {
  }
}
