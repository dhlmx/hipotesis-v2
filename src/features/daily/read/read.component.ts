import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { DailyService } from '../../../core/services/daily.service';

// Interfaces & Models
import { Daily } from '../../../core/models/daily';
import { ISELECT_YES_NO } from '../../../core/constants/select';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';

@Component({
  standalone: true,
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  providers: [ConfirmationService, MessageService, AppService, DailyService],
  imports: [CoreModule, PrimeNgModule]
})
export class ReadComponent implements OnInit {
  public activeOptions = ISELECT_YES_NO;

  controls: {
    dailyId: FormControl,
    remark: FormControl,
    isActive: FormControl,
  } = {
    dailyId: new FormControl(0, Validators.required),
    remark: new FormControl('', Validators.required),
    isActive: new FormControl(true, Validators.required),
  };

  form = new FormGroup({
    ...this.controls
  });

  constructor(
    public appService: AppService,
    private readonly dailyService: DailyService,
    private readonly messageService: MessageService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.appService.setTitle(APP_TITLE, 'Daily - Read');
  }

  ngOnInit(): void {
    this.initialize();
  }

  get daily(): Daily {
    return this.dailyService.daily;
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading data...');

    this.controls.dailyId.setValue(Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0'));
    this.dailyService.getDaily(this.controls.dailyId.value).subscribe({
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
    this.controls.isActive.setValue(false);
  }

  private readonly setForm = (daily: Daily): void => {
    this.controls.dailyId.setValue(daily.dailyId);
    this.controls.remark.setValue(daily.remark);
    this.controls.isActive.setValue(daily.isActive);
  }
}
