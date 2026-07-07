import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

// Modules
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { FilesService } from '../../../core/services/files.service';

// Interfaces & Models
import { CoreModule } from '../../../core/modules/core.module';
import { SqlResponse } from '../../../core/models/http/sql-response';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { ISELECT_YES_NO } from '../../../core/constants/select';

@Component({
  standalone: true,
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ConfirmationService, MessageService, AppService, FilesService],
  imports: [CoreModule, PrimeNgModule]
})
export class CreateComponent implements OnInit {

  activeOptions = ISELECT_YES_NO;
  file = new File([], '');
  totalSize: number = 0;
  totalSizePercent: number = 0;

  controls: {
    isActive: FormControl
  } = {
    isActive: new FormControl(true, Validators.required)
  };

  form = new FormGroup({
    ...this.controls
  });

  constructor(
    public readonly appService: AppService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly filesService: FilesService
  ) {
    this.appService.setTitle(APP_TITLE, 'Files - Create');
  }

  ngOnInit(): void {
    this.initialize();
  }

  get fileName(): string {
    if (!this.file.name) {
      return 'File not selected';
    }

    return `${this.file.name} (${this.file.size} bytes)`;
  }

  get sqlResponse(): SqlResponse {
    return this.filesService.sqlResponse;
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading data...');
    this.appService.process.stop();
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedFile = input.files?.item(0);
    this.file = selectedFile ?? new File([], '');
  }

  public onSave(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de proceder?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appService.process.start('Upload SQL File');

        this.filesService.postCreateFile(this.file, this.controls.isActive.value).subscribe({
          next: () => {
            if (this.filesService.httpResponse.isOK) {
              this.messageService.add({ severity: 'success', summary: 'Confirmación', detail: 'SQL File saved' });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Confirmación', detail: 'SQL File not saved' });
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
}
