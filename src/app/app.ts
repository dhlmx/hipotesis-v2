import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoreModule } from '../core/modules/core.module';
import { APP_TITLE } from '../core/constants/general';
import { AppService } from '../core/services/app.service';
import { PdfService } from '../core/services/pdf.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule],
  providers: [AppService, ConfirmationService, MessageService, PdfService, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal(APP_TITLE);
}
