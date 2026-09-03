import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import moment from 'moment';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { PdfService } from '../../../core/services/pdf.service';

// Interfaces & Models

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';

@Component({
  selector: 'app-water-consumption',
  templateUrl: './water-consumption.html',
  styleUrl: './water-consumption.css',
  providers: [ConfirmationService, MessageService, AppService, PdfService],
  imports: [CoreModule, PrimeNgModule],
})
export class WaterConsumption implements OnInit {

  days = 0;
  dailyAverage = 0;
  bimonthlyConsumption = 0;
  daysCharged = 0;

  readonly controls: {
    previousReading: FormControl,
    previousDate: FormControl,
    currentReading: FormControl,
    currentDate: FormControl,
    days: FormControl,
    dailyAverage: FormControl,
    bimonthlyConsumption: FormControl
  } = {
    previousReading: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    previousDate: new FormControl(new Date(), [Validators.required]),
    currentReading: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    currentDate: new FormControl(new Date(), [Validators.required]),
    days: new FormControl(0, [Validators.required, Validators.min(1)]),
    dailyAverage: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    bimonthlyConsumption: new FormControl(0, [Validators.required, Validators.min(0.01)])
  };

  readonly form = new FormGroup({
    ...this.controls
  });


  constructor(
    public readonly appService: AppService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly pdfService: PdfService
  ) {
    this.appService.setTitle(APP_TITLE, 'ML - Polynomial Regression');
  }

  ngOnInit(): void {
    this.initialize();
  }

  get areDaysChargedValid(): boolean {
    return this.daysCharged - this.controls.days.value === 0;
  }

  get areDaysValid(): boolean {
    return this.days - this.controls.days.value === 0;
  }

  get isDailyAverageValid(): boolean {
    return Number(this.controls.dailyAverage.value).toFixed(2) === Number(this.dailyAverage).toFixed(2);
  }

  get isBimonthlyConsumptionValid(): boolean {
    return Number(this.controls.bimonthlyConsumption.value).toFixed(2) === Number(this.bimonthlyConsumption).toFixed(2);
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

  onCalculate(): void {
    this.appService.process.start('Calculating...');

    this.days = moment(this.controls.currentDate.value).diff(moment(this.controls.previousDate.value), 'days');
    this.bimonthlyConsumption = Number(this.controls.currentReading.value) - Number(this.controls.previousReading.value);
    this.dailyAverage = this.bimonthlyConsumption / this.days;
    this.daysCharged = Math.round(Number(this.controls.bimonthlyConsumption.value) / this.dailyAverage);

    this.appService.process.stop();
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

  private initialize = (): void => {
    this.appService.process.start('Loading initial data...');

    this.appService.process.stop();
  }

}
