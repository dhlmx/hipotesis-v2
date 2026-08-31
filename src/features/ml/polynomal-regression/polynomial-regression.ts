import { AfterViewInit, Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Chart } from 'chart.js';
import * as tf from '@tensorflow/tfjs';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { PdfService } from '../../../core/services/pdf.service';

// Interfaces & Models
import { IChartData } from '../../../core/interfaces/charts/ichart-data';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { XS, YS, ZS } from '../../../core/constants/polynomial-regression';

@Component({
  selector: 'app-polynomial-regression',
  templateUrl: './polynomial-regression.html',
  styleUrl: './polynomial-regression.css',
  providers: [ConfirmationService, MessageService, AppService, PdfService],
  imports: [CoreModule, PrimeNgModule],
})
export class PolynomialRegression implements OnInit, AfterViewInit {
  @ViewChild('versusCanvas', { static: false }) versusCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lossCanvas', { static: false }) lossCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fxCanvas', { static: false }) fxCanvas!: ElementRef<HTMLCanvasElement>;

  versusChart!: Chart;
  lossChart!: Chart;
  fxChart!: Chart;
  chartOptions: any = {};

  readonly platformId = inject(PLATFORM_ID);
  readonly documentStyle = getComputedStyle(document.documentElement);
  textColor = '';
  textColorSecondary = '';
  surfaceBorder = '';

  // Polynomial Model
  optimizer: tf.AdamOptimizer;
  losses: any[] = [];
  fx = tf.tensor([]);
  predictions: number[] = [];

  readonly controls: {
    graphTension: FormControl,
    polynomialDegree: FormControl,
    learningRate: FormControl,
    trainingIterations: FormControl
  } = {
    graphTension: new FormControl(0.4, [Validators.required, Validators.min(0.1), Validators.max(0.9)]),
    polynomialDegree: new FormControl(2, [Validators.required, Validators.min(0), Validators.max(19)]),
    learningRate: new FormControl(0.3, [Validators.required, Validators.min(0.1), Validators.max(0.9)]),
    trainingIterations: new FormControl(100, [Validators.required, Validators.min(100), Validators.max(1000)])
  };

  readonly form = new FormGroup({
    ...this.controls
  });

  readonly data: IChartData = {
    labels: [],
    datasets: [
      {
        label: 'Sin(x)',
        data: [],
        fill: false,
        borderColor: '#42A5F5',
        tension: this.controls.graphTension.value
      },
      {
        label: 'Sin(x) + Noise',
        data: [],
        fill: false,
        borderColor: '#FFA726',
        tension: this.controls.graphTension.value
      }
    ]
  };

  readonly lossData: IChartData = {
    labels: [],
    datasets: [
      {
        label: 'Loss',
        data: [],
        fill: true,
        borderColor: '#66BB6A',
        tension: this.controls.graphTension.value
      }
    ]
  };

  readonly fxData: IChartData = {
    labels: [],
    datasets: [
      {
        label: 'Sin(x)',
        data: [],
        fill: false,
        borderColor: '#42A5F5',
        tension: this.controls.graphTension.value
      },
      {
        label: 'F(x)',
        data: [],
        fill: false,
        borderColor: '#FFA726',
        tension: this.controls.graphTension.value
      }
    ]
  };

  constructor(
    public readonly appService: AppService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly pdfService: PdfService
  ) {
    this.appService.setTitle(APP_TITLE, 'ML - Polynomial Regression');

    if (isPlatformBrowser(this.platformId)) {
      this.textColor = this.documentStyle.getPropertyValue('--p-text-color');
      this.textColorSecondary = this.documentStyle.getPropertyValue('--p-text-muted-color');
      this.surfaceBorder = this.documentStyle.getPropertyValue('--p-content-border-color');
    } else {
      this.textColor = '#000000';
      this.textColorSecondary = '#000000';
      this.surfaceBorder = '#000000';
    }

    this.chartOptions = {
      responsive: true,
      aspectRatio: 2,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            color: this.textColor
          }
        }
      },
      scales: {
        x: {
            ticks: {
              color: this.textColorSecondary
            },
            grid: {
              color: this.surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: this.textColorSecondary
            },
            grid: {
              color: this.surfaceBorder,
              drawBorder: false
            }
          }
      }
    };

    this.optimizer = tf.train.adam(this.controls.learningRate.value);

    window.addEventListener('resize', () => {
      this.versusChart.resize();
      this.lossChart.resize();
      this.fxChart.resize();
    });
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.renderVersusGraph();
    this.renderLossGraph();
    this.renderFxGraph();
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
  }

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
    this.appService.process.start('Training model...');

    setTimeout(() => {
      this.optimizer = tf.train.adam(this.controls.learningRate.value);
      this.train(this.controls.trainingIterations.value);
      this.updateData();
      this.lossChart.update();
      this.fxChart.update();
      this.appService.process.stop();
    }, 1000);
  }

  private initialize = (): void => {
    this.appService.process.start('Loading initial data...');

    XS.dataSync().forEach((value: number) => {
      this.data.labels.push(value.toFixed(2));
    });

    YS.dataSync().forEach((value: number) => {
      this.data.datasets[0].data.push(value);
    });

    ZS.dataSync().forEach((value: number) => {
      this.data.datasets[1].data.push(value);
    });

    this.appService.process.stop();
  }

  private getLoss = (prediction: tf.Tensor, label: tf.Tensor): tf.Scalar => prediction.sub(label).square().mean();

  private getPolynomialRegression = (x: tf.Tensor, weights: Array<tf.Variable>): tf.Tensor => {
    const tfs: Array<tf.Tensor> = [];

    weights.forEach((w, i) => {
      if (i === 0) {
        tfs.push(w);
      } else if (i === 1) {
        tfs.push(w.mul(x));
      } else {
        tfs.push(w.mul(x.pow(tf.scalar(i))));
      }
    });

    return tfs.reduce((a, b) => a.add(b), tf.scalar(0));
  }

  private getSecureRandom = (): number => {
    const randomValue = new Uint32Array(1);
    crypto.getRandomValues(randomValue);
    return randomValue[0] / 0x100000000;
  }

  private getWeights = (degree: number, variable: tf.Variable): Array<tf.Variable> => {
    return Array.from({ length: degree + 1 }, () => variable);
  }

  private renderFxGraph = (): void => {
    const fxContext = this.fxCanvas.nativeElement.getContext('2d');

    if (fxContext) {
      this.fxChart = new Chart(fxContext, {
        type: 'line',
        data: this.fxData,
        options: this.chartOptions
      });
    }
  }

  private renderLossGraph = (): void => {
    const lossContext = this.lossCanvas.nativeElement.getContext('2d');

    if (lossContext) {
      this.lossChart = new Chart(lossContext, {
        type: 'line',
        data: this.lossData,
        options: this.chartOptions
      });
    }
  }

  private renderVersusGraph = (): void => {
    const versusContext = this.versusCanvas.nativeElement.getContext('2d');

    if (versusContext) {
      this.versusChart = new Chart(versusContext, {
        type: 'line',
        data: this.data,
        options: this.chartOptions
      });
    }
  }

  private train = (iterations: number) => {
    this.losses = [];
    this.predictions = [];

    const weights = this.getWeights(this.controls.polynomialDegree.value, tf.scalar(this.getSecureRandom() - 0.5).variable());

    for (let i = 0; i < iterations; i++) {
      const lost = this.optimizer.minimize(() => {
        const fx = this.getPolynomialRegression(XS, weights);

        // if (i === (iterations - 1)) {
        this.predictions = Array.from(fx.dataSync());
        // }

        return this.getLoss(fx, YS)
      }, true);

      this.losses.push(lost ? Array.from(lost.dataSync()) : []);
    }
  };

  private updateData = (): void => {
    this.lossData.labels = [];
    this.lossData.datasets[0].data = [];

    this.losses.forEach((loss, index) => {
      this.lossData.labels.push((index + 1).toString());
      this.lossData.datasets[0].data.push(Number(loss));
    });

    this.fxData.labels = this.data.labels;
    this.fxData.datasets[0].data = this.data.datasets[1].data;
    this.fxData.datasets[1].data = [];

    this.predictions.forEach((prediction) => {
      this.fxData.datasets[1].data.push(Number(prediction));
    });
  }
}
