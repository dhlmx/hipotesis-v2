import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { DailyService } from '../../../core/services/daily.service';

// Interfaces & Models
import { Daily } from '../../../core/models/daily';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';

@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ConfirmationService, MessageService, AppService, DailyService, DatePipe],
  imports: [CoreModule, PrimeNgModule]
})
export class ListComponent implements OnInit {

  controls = {
    dailyId: new FormControl(),
    remark: new FormControl(),
    createdAt: new FormControl()
  };

  form = new FormGroup({
    ...this.controls
  });

  constructor(
    public appService: AppService,
    private readonly dailyService: DailyService,
    private readonly messageService: MessageService,
    private readonly datePipe: DatePipe
  ) {
    this.appService.setTitle(APP_TITLE, 'Diario - Listado');
    this.appService.setDescription('Diario de notas sobre el acontecer en México y el Mundo. Una mirada crítica y alternativa.');
  }

  ngOnInit() {
    this.initialize();
  }

  get daily(): Daily {
    return this.dailyService.daily;
  }

  get dailyCreatedAt(): string {
    return this.datePipe.transform(this.dailyService.daily.createdAt, 'dd/MM/yyyy') || '';
  }

  get dates(): Daily[] {
    return this.dailyService.dates;
  }

  get index(): number {
    return this.dailyService.index;
  }

  get indexPosition(): string {
    return `${this.dailyService.index + 1} / ${this.dailyService.dates.length}`;
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading daily...');

    this.dailyService.getDailies().subscribe({
      next: () => {
        this.processDaily(this.dailyService.daily);

        if (this.dailyService.daily.dailyId <= 0) {
          this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Daily not found' });
        }
      },
      complete: () => {
        this.appService.process.stop();
      }
    });
  }

  public onClickFirst = (): void => {
    this.dailyService.goToFirst();
    this.processDaily(this.dailyService.daily);
  }

  public onClickLast = (): void => {
    this.dailyService.goToLast();
    this.processDaily(this.dailyService.daily);
  }

  public onClickNext = (): void => {
    this.dailyService.goToNext();
    this.processDaily(this.dailyService.daily);
  }

  public onClickPrevious = (): void => {
    this.dailyService.goToPrevious();
    this.processDaily(this.dailyService.daily);
  }

  private readonly processDaily = (daily: Daily): void => {
    if (this.dailyService.daily.dailyId) {
      this.setForm(daily);
    } else {
      this.resetForm();
    }
  }

  private readonly resetForm = (): void => {
    this.controls.dailyId.setValue(0);
    this.controls.remark.setValue('');
    this.controls.createdAt.setValue(null);
  }

  private readonly setForm = (daily: Daily): void => {
    this.controls.dailyId.setValue(daily.dailyId);
    this.controls.remark.setValue(daily.remark);
    this.controls.createdAt.setValue(daily.createdAt);
  }
}
