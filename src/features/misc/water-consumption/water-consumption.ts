import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import moment from 'moment';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Components & Directives
import { TextSub } from '../../../core/directives/text-sub';

// Services
import { AppService } from '../../../core/services/app.service';
import { PdfService } from '../../../core/services/pdf.service';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';

@Component({
  selector: 'app-water-consumption',
  templateUrl: './water-consumption.html',
  styleUrl: './water-consumption.css',
  providers: [],
  imports: [CoreModule, PrimeNgModule, TextSub],
})
export class WaterConsumption implements OnInit {

  // Consumption
  days = 0;
  dailyAverage = 0;
  consumption = 0;
  daysCharged = 0;

  // Cost
  baseConsumption = 0;
  additionalConsumption = 0;
  additionalChargeByMeter3 = 0;
  consumptionByHousing = 0;
  chargeByHousing = 0;
  additionalChargeByHousing = 0;
  totalCharge = 0;

  readonly controls: {
    previousReading: FormControl,
    previousDate: FormControl,
    currentReading: FormControl,
    currentDate: FormControl,
    days: FormControl,
    dailyAverage: FormControl,
    consumption: FormControl,
    housings: FormControl,
    initialConsumptionLevel: FormControl,
    finalConsumptionLevel: FormControl,
    baseConsumptionCharge: FormControl,
    additionalConsumption: FormControl,
    additionalCharge: FormControl
    chargeByHousing: FormControl,
    totalCharge: FormControl
  } = {
    previousReading: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    previousDate: new FormControl(new Date(), [Validators.required]),
    currentReading: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    currentDate: new FormControl(new Date(), [Validators.required]),
    days: new FormControl(0, [Validators.required, Validators.min(1)]),
    dailyAverage: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    consumption: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    housings: new FormControl(0, [Validators.min(1)]),
    initialConsumptionLevel: new FormControl(20.01, [Validators.min(0.01)]),
    finalConsumptionLevel: new FormControl(30.00, [Validators.min(0.01)]),
    baseConsumptionCharge: new FormControl(0, [Validators.min(0.01)]),
    additionalConsumption: new FormControl(0, [Validators.min(0.01)]),
    additionalCharge: new FormControl(0, [Validators.min(0.01)]),
    chargeByHousing: new FormControl(0, [Validators.min(0.01)]),
    totalCharge: new FormControl(0, [Validators.min(0.01)])
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

  get isConsumptionValid(): boolean {
    return Number(this.controls.consumption.value).toFixed(2) === Number(this.consumption).toFixed(2);
  }

  get isChargeByHousingValid(): boolean {
    return Number(this.controls.chargeByHousing?.value || '0') === this.chargeByHousing;
  }

  get isTotalChargeValid(): boolean {
    return Number(this.controls.totalCharge?.value || '0') === this.totalCharge;
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

    // Consumption
    this.days = moment(this.controls.currentDate.value).diff(moment(this.controls.previousDate.value), 'days');
    this.consumption = Number(this.controls.currentReading.value) - Number(this.controls.previousReading.value);
    this.dailyAverage = this.consumption / this.days;
    this.daysCharged = Math.round(Number(this.controls.consumption.value) / this.dailyAverage);

    // Cost
    this.consumptionByHousing = this.consumption / Number(this.controls.housings.value);
    this.baseConsumption = Math.round(Number(this.controls.initialConsumptionLevel.value));

    this.additionalConsumption = this.consumptionByHousing - this.baseConsumption;
    this.additionalChargeByMeter3 = Number(this.controls.additionalCharge.value) / Number(this.controls.additionalConsumption.value);
    this.additionalChargeByHousing = this.additionalChargeByMeter3 * this.additionalConsumption;

    this.chargeByHousing = Number(this.controls.baseConsumptionCharge.value) + this.additionalChargeByHousing;
    this.totalCharge = Number(this.controls.housings.value) * this.chargeByHousing;

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
