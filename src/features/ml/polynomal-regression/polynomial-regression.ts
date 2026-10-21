import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Chart } from 'chart.js';
import * as tf from '@tensorflow/tfjs';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { ChartService } from '../../../core/services/chart.service';
import { PdfService } from '../../../core/services/pdf.service';

// Interfaces & Models
import { ChartHelper } from '../../../core/models/chart/chart-helper';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { XS, YS, ZS } from '../../../core/constants/ml/polynomail-regression/data';
import { IDataset } from '../../../core/interfaces/charts/idataset';
import { IAxisTitle } from '../../../core/interfaces/charts/iaxis-title';

@Component({
  selector: 'app-polynomial-regression',
  templateUrl: './polynomial-regression.html',
  styleUrl: './polynomial-regression.css',
  providers: [ChartService],
  imports: [CoreModule, PrimeNgModule],
})
export class PolynomialRegression implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('versusCanvas', { static: false }) versusCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lossCanvas', { static: false }) lossCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fxCanvas', { static: false }) fxCanvas!: ElementRef<HTMLCanvasElement>;

  private readonly versusSetup = new ChartHelper('line');
  private readonly lossSetup = new ChartHelper('line');
  private readonly fxSetup = new ChartHelper('line');

  versusChart!: Chart;
  lossChart!: Chart;
  fxChart!: Chart;

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

  constructor(
    public readonly appService: AppService,
    private readonly chartService: ChartService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly pdfService: PdfService
  ) {
    this.appService.setTitle(APP_TITLE, 'Polynomial Regression');
    this.appService.process.start('Loading...');
    this.appService.resetFile();

    this.setCharts();

    window.addEventListener('resize', () => {
      this.versusChart.resize();
      this.lossChart.resize();
      this.fxChart.resize();
    });

    this.optimizer = tf.train.adam(this.controls.learningRate.value);
    this.appService.process.stop();
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.versusChart = this.chartService.render2D(this.versusCanvas, this.versusSetup);
    this.lossChart = this.chartService.render2D(this.lossCanvas, this.lossSetup);
    this.fxChart = this.chartService.render2D(this.fxCanvas, this.fxSetup);
  }

  ngOnDestroy(): void {
    this.versusChart.destroy();
    this.lossChart.destroy();
    this.fxChart.destroy();
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

  onRun = (): void => {
    this.appService.process.start('Training model...');

    setTimeout(() => {
      this.optimizer = tf.train.adam(this.controls.learningRate.value);
      this.run(this.controls.trainingIterations.value);
      this.updateData();
      this.lossChart.update();
      this.fxChart.update();
      this.appService.process.stop();
    }, 1000);
  }

  // Private Methods
  private readonly initialize = (): void => {
    this.appService.process.start('Loading initial data...');

    XS.dataSync().forEach((value: number) => {
      this.versusSetup.data.labels.push(value.toFixed(2));
    });

    YS.dataSync().forEach((value: number) => {
      (this.versusSetup.data.datasets[0].data as number[]).push(value);
    });

    ZS.dataSync().forEach((value: number) => {
      (this.versusSetup.data.datasets[1].data as number[]).push(value);
    });

    this.appService.process.stop();
  }

  private readonly getLoss = (prediction: tf.Tensor, label: tf.Tensor): tf.Scalar => prediction.sub(label).square().mean();

  private readonly getPolynomialRegression = (x: tf.Tensor, weights: Array<tf.Variable>): tf.Tensor => {
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

  private readonly getSecureRandom = (): number => {
    const randomValue = new Uint32Array(1);
    crypto.getRandomValues(randomValue);
    return randomValue[0] / 0x100000000;
  }

  private readonly getWeights = (degree: number, variable: tf.Variable): Array<tf.Variable> => {
    return Array.from({ length: degree + 1 }, () => variable);
  }

  private readonly setCharts = (): void => {
    this.versusSetup.addDataset({
      label: 'Sin(x)',
      data: [] as number[],
      fill: false,
      borderColor: '#42A5F5',
      tension: 0.4
    } as IDataset);

    this.versusSetup.addDataset({
      label: 'Sin(x) + Noise',
      data: [] as number[],
      fill: false,
      borderColor: '#FFA726',
      tension: 0.4
    } as IDataset);

    this.versusSetup.setXTitle({ text: 'Radians' } as IAxisTitle);
    this.versusSetup.setYTitle({ text: 'Sin(x), Sin(x) + Noise' } as IAxisTitle);

    this.lossSetup.addDataset({
      label: 'Loss',
      data: [] as number[],
      fill: true,
      borderColor: '#66BB6A',
      tension: 0.4
    } as IDataset);

    this.lossSetup.setXTitle({ text: 'Iterations' } as IAxisTitle);
    this.lossSetup.setYTitle({ text: 'Loss' } as IAxisTitle);

    this.fxSetup.addDataset({
      label: 'Sin(x)',
      data: [] as number[],
      fill: false,
      borderColor: '#42A5F5',
      tension: 0.4
    } as IDataset);

    this.fxSetup.addDataset({
      label: 'F(x)',
      data: [] as number[],
      fill: false,
      borderColor: '#FFA726',
      tension: 0.4
    } as IDataset);

    this.versusSetup.setXTitle({ text: 'Radians' } as IAxisTitle);
    this.versusSetup.setYTitle({ text: 'Sin(x), F(x)' } as IAxisTitle);
  }

  private readonly run = (iterations: number) => {
    this.losses = [];
    this.predictions = [];

    const weights = this.getWeights(this.controls.polynomialDegree.value, tf.scalar(this.getSecureRandom() - 0.5).variable());

    for (let i = 0; i < iterations; i++) {
      const lost = this.optimizer.minimize(() => {
        const fx = this.getPolynomialRegression(XS, weights);
        this.predictions = Array.from(fx.dataSync());
        return this.getLoss(fx, YS)
      }, true);

      this.losses.push(lost ? Array.from(lost.dataSync()) : []);
    }
  };

  private readonly updateData = (): void => {
    this.lossSetup.data.labels = [];
    this.lossSetup.data.datasets[0].data = [];

    this.losses.forEach((loss, index) => {
      this.lossSetup.data.labels.push((index + 1).toString());
      (this.lossSetup.data.datasets[0].data as number[]).push(Number(loss));
    });

    this.fxSetup.data.labels = this.versusSetup.data.labels;
    this.fxSetup.data.datasets[0].data = this.versusSetup.data.datasets[1].data;
    this.fxSetup.data.datasets[1].data = [];

    this.predictions.forEach((prediction) => {
      (this.fxSetup.data.datasets[1].data as number[]).push(Number(prediction));
    });
  }
}
