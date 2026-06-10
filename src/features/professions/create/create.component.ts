import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { DailyService } from '../../../core/services/daily.service';

// Interfaces & Models
import { IDaily } from '../../../core/interfaces/idaily';
import { IPhpDateTime } from '../../../core/interfaces/php/iphp-datetime';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { ISELECT_YES_NO } from '../../../core/constants/select';

@Component({
  standalone: true,
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ConfirmationService, MessageService, AppService, DailyService],
  imports: [CoreModule, PrimeNgModule]
})
export class CreateComponent {
  activeOptions = ISELECT_YES_NO;

  controls: {
    remark: FormControl,
    isActive: FormControl,
  } = {
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
    private readonly dailyService: DailyService
  ) {
    this.appService.setTitle(APP_TITLE, 'Daily - Create');
  }

  onClickSave = (): void => {
    this.confirmationService.confirm({
      message: '¿Estás seguro de proceder?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appService.process.start('Creating remark...');

        this.dailyService.createDaily(this.getFormData()).subscribe({
          next: () => {
            if (this.dailyService.sqlResponse.isSuccessfulCreation()) {
              this.resetForm();
              this.messageService.add({ severity: 'success', summary: 'Confirmación', detail: 'Remark saved' });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Confirmación', detail: 'Remark not saved' });
            }

            this.appService.process.stop();
          },
          error: (err: any) => {
            console.log(err);
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

  // Private Methods
  private readonly getFormData = (): IDaily => {
    return {
      dailyId: 0,
      remark: this.controls.remark.value,
      createdAt: {} as IPhpDateTime,
      updatedAt: {} as IPhpDateTime,
      deletedAt: {} as IPhpDateTime,
      isActive: this.controls.isActive.value
    };
  }

  private readonly resetForm = (): void => {
    this.controls.remark.setValue('');
    this.controls.isActive.setValue(true);
  }
}
