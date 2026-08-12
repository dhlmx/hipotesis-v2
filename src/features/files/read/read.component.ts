import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as mobilenet from '@tensorflow-models/mobilenet';

// Modules
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { FilesService } from '../../../core/services/files.service';

// Interfaces & Models
import { CoreModule } from '../../../core/modules/core.module';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  providers: [ConfirmationService,MessageService, AppService, FilesService],
  imports: [CoreModule, PrimeNgModule]
})
export class ReadComponent implements OnInit {

  public fileId = 0;
  public predictions: { className: string, probability: number }[] = [];

  constructor(
    public readonly appService: AppService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly filesService: FilesService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.appService.setTitle(APP_TITLE, 'Files - Read');
  }

  ngOnInit(): void {
    this.initialize();
  }

  get image(): SafeUrl|null {
    return this.filesService.imageUrl;
  }

  get imageSize(): string {
    return this.filesService.blobSize;
  }

  get imageType(): string {
    return this.filesService.blobType;  }

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
        } else {
          const imageElement = document.getElementById('image') as HTMLImageElement;

          if (imageElement) {
            mobilenet.load().then(model => {
              model.classify(imageElement).then(predictions => {
                this.predictions = predictions;
              });
            });
          }
        }
      },
      complete: () => {
        this.appService.process.stop();
      }
    });
  }
}
