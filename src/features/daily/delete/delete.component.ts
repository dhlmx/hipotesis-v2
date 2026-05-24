import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { DailyService } from '../../../core/services/daily.service';
import { RepositoryService } from '../../../core/services/repository.service';

// Interfaces & Models
import { Daily } from '../../../core/models/daily';
import { HttpResponse } from '../../../core/models/http/http-response';
import { ISqlQuery } from '../../../core/interfaces/sql/isql-query';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { ISELECT_YES_NO } from '../../../core/constants/select';

@Component({
  standalone: true,
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  providers: [ConfirmationService, MessageService, DailyService, RepositoryService],
  imports: [CoreModule, PrimeNgModule]
})
export class DeleteComponent implements OnInit {
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
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly dailyService: DailyService,
    private readonly repositoryService: RepositoryService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.appService.setTitle(APP_TITLE, 'Daily - Update');
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

  onClickSave = (): void => {
    this.confirmationService.confirm({
      message: '¿Estás seguro de proceder?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appService.process.start('Updating remark...');
        this.repositoryService.postExecuteSqlQuery(this.prepareQueryToDelete()).subscribe({
          next: (response: HttpResponse) => {
            if (response.isOK) {
              this.messageService.add({ severity: 'success', summary: 'Confirmación', detail: 'Remark saved' });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Confirmación', detail: 'Remark not saved' });
            }
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {
            this.appService.process.stop();
          }
        });
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

  private readonly prepareQueryToDelete = (): ISqlQuery => {
    return {
      query: `CALL up_delete_daily(${this.controls.dailyId.value});`,
      entityName: 'SqlResponse'
    };
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
