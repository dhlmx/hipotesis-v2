import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { IDayValue } from '../../../core/interfaces/preprocessing/iday-value';
import { ChartHelper } from '../../../core/models/chart/chart-helper';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { XS, YS, ZS } from '../../../core/constants/ml/polynomail-regression/data';

@Component({
  selector: 'app-noise-handling',
  templateUrl: './noise-handling.html',
  styleUrl: './noise-handling.css',
  providers: [ChartService],
  imports: [CoreModule, PrimeNgModule],
})
export class NoiseHandling implements OnInit, AfterViewInit {
  @ViewChild('versusCanvas', { static: false }) versusCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lossCanvas', { static: false }) lossCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fxCanvas', { static: false }) fxCanvas!: ElementRef<HTMLCanvasElement>;

  versusChart!: Chart;
  lossChart!: Chart;
  fxChart!: Chart;

  versusSetup = new ChartHelper('line');
  lossSetup = new ChartHelper('line');
  fxSetup = new ChartHelper('line');

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
    this.appService.setTitle(APP_TITLE, 'ML - Polynomial Regression');
    this.appService.resetFile();

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
    this.versusSetup.addDataset({
      label: 'Sin(x)',
      data: [],
      backgroundColor: '#42A5F5',
      borderColor: '#42A5F5',
      borderWidth: 2,
      fill: false,
      pointBackgroundColor: '#42A5F5',
      pointRadius: 3,
      pointStyle: 'circle',
      showLine: false,
      tension: this.controls.graphTension.value
    });

    this.versusSetup.addDataset({
      label: 'Sin(x) + Noise',
      data: [],
      backgroundColor: '#FFA726',
      borderColor: '#FFA726',
      borderWidth: 2,
      fill: false,
      pointBackgroundColor: '#FFA726',
      pointRadius: 3,
      pointStyle: 'circle',
      tension: this.controls.graphTension.value
    });

    this.lossSetup.addDataset({
      label: 'Loss',
      data: [],
      backgroundColor: '#66BB6A',
      borderColor: '#66BB6A',
      borderWidth: 2,
      fill: false,
      pointBackgroundColor: '#66BB6A',
      pointRadius: 3,
      pointStyle: 'circle',
      showLine: false,
      tension: this.controls.graphTension.value
    });

    this.fxSetup.addDataset({
      label: 'Sin(x)',
      data: [],
      backgroundColor: '#42A5F5',
      borderColor: '#42A5F5',
      borderWidth: 2,
      fill: false,
      pointBackgroundColor: '#42A5F5',
      pointRadius: 3,
      pointStyle: 'circle',
      tension: this.controls.graphTension.value
    });

    this.fxSetup.addDataset({
      label: 'F(x)',
      data: [],
      backgroundColor: '#FFA726',
      borderColor: '#FFA726',
      borderWidth: 2,
      fill: false,
      pointBackgroundColor: '#FFA726',
      pointRadius: 3,
      pointStyle: 'circle',
      tension: this.controls.graphTension.value
    });

    this.chartService.render2D(this.versusCanvas, this.versusSetup);
    this.chartService.render2D(this.lossCanvas, this.lossSetup);
    this.chartService.render2D(this.fxCanvas, this.fxSetup);
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

    /*
    XS.dataSync().forEach((value: number) => {
      let val = value.toFixed(2);
      this.versusSetup.data.labels.push(val);
    });

    YS.dataSync().forEach((value: number) => {
      this.versusSetup.data.datasets[0].data.push(value.toFixed(2));
    });

    ZS.dataSync().forEach((value: number) => {
      this.versusSetup.data.datasets[1].data.push(value);
    });
    */

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


  private train = (iterations: number) => {
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

  private triAverage = (dayValues: IDayValue[]): IDayValue[] => {
    const averages: IDayValue[] = [];

    dayValues.forEach((dayValue, index) => {
      if (index > 0 && index < dayValues.length - 2) {
        const average = (dayValues[index - 1].value + dayValue.value + dayValues[index + 1].value) / 3;
        averages.push({ day: dayValue.day, value: average });
      }
    });

    return averages;
  }

  private pentaAverage = (dayValues: IDayValue[]): IDayValue[] => {
    const averages: IDayValue[] = [];

    dayValues.forEach((dayValue, index) => {
      if (index > 1 && index < dayValues.length - 3) {
        const average = (
          dayValues[index - 2].value + dayValues[index - 1].value
          + dayValue.value
          + dayValues[index + 1].value + dayValues[index + 2].value) / 5;
        averages.push({ day: dayValue.day, value: average });
      }
    });

    return averages;
  }

  private updateData = (): void => {
    this.lossChart.data.labels = [];
    this.lossChart.data.datasets[0].data = [];

    /*
    this.losses.forEach((loss, index) => {
      this.lossChart.data.labels.push((index + 1).toString());
      this.lossChart.data.datasets[0].data.push(Number(loss));
    });

    this.fxChart.data.labels = this.data.labels;
    this.fxChart.data.datasets[0].data = this.data.datasets[1].data;
    this.fxChart.data.datasets[1].data = [];

    this.predictions.forEach((prediction) => {
      this.fxData.datasets[1].data.push(Number(prediction));
    });
    */
  }
}
