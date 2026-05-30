import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

// Modules
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { FilesService } from '../../../core/services/files.service';

// Interfaces & Models
import { CoreModule } from '../../../core/modules/core.module';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';

@Component({
  standalone: true,
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  providers: [ConfirmationService,MessageService, AppService, FilesService],
  imports: [CoreModule, PrimeNgModule]
})
export class ReadComponent implements OnInit {

  private fileId = 0;

  constructor(
    public readonly appService: AppService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly filesService: FilesService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.appService.setTitle(APP_TITLE, 'Files - Create');
  }

  ngOnInit(): void {
    this.initialize();
  }

  get file(): Blob {
    return this.filesService.file;
  }

  get isFileOk(): boolean {
    return this.filesService.isFileOk;
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading data...');
    this.fileId = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0');

    this.filesService.postReadFile(this.fileId).subscribe({
      next: () => {
        if (!this.filesService.isFileOk) {
          this.messageService.add({ severity: 'warn', summary: 'Confirmación', detail: 'File not found' });
        }
      },
      complete: () => {
        this.appService.process.stop();
      }
    });
  }
}
