import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { RepositoryService } from '../../../core/services/repository.service';

// Interfaces & Models
import { HttpResponse } from '../../../core/models/http/http-response';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { ISELECT_YES_NO } from '../../../core/constants/select';

@Component({
  standalone: true,
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ConfirmationService, MessageService, RepositoryService],
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
    private readonly repositoryService: RepositoryService
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

        this.repositoryService.postExecuteSqlQuery({
          query: this.prepareQueryToInsert(),
          entityName: 'SqlResponse'
        }).subscribe({
          next: (response: HttpResponse) => {
            if (response.isOK) {
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

  private readonly prepareQueryToInsert = (): string => {
    let query = `CALL up_create_daily('${this.controls.remark.value}', ${this.controls.isActive.value ? 1 : 0});`;
    return query;
  }

  resetForm = (): void => {
    this.controls.remark.setValue('');
    this.controls.isActive.setValue(true);
  }
}
