import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';

// Interfaces & Models

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { ISELECT_YES_NO } from '../../../core/constants/select';
import { IPhpDateTime } from '../../../core/interfaces/php/iphp-datetime';

@Component({
  standalone: true,
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [ConfirmationService, MessageService],
  imports: [CoreModule, PrimeNgModule]
})
export class UpdateComponent implements OnInit {
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
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.appService.setTitle(APP_TITLE, 'Profession - Update');
  }

  ngOnInit(): void {
    this.initialize();
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading data...');

    this.controls.dailyId.setValue(Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0'));
  }

  onClickSave = (): void => {
    this.confirmationService.confirm({
      message: '¿Estás seguro de proceder?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appService.process.start('Updating remark...');
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

  // Private methods

  private readonly resetForm = (): void => {
    this.controls.dailyId.setValue(0);
    this.controls.remark.setValue('');
    this.controls.isActive.setValue(false);
  }
}
