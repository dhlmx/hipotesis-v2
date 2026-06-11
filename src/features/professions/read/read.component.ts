import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';

// Interfaces & Models
import { ISELECT_YES_NO } from '../../../core/constants/select';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';

@Component({
  standalone: true,
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  providers: [ConfirmationService, MessageService, AppService],
  imports: [CoreModule, PrimeNgModule]
})
export class ReadComponent implements OnInit {
  public activeOptions = ISELECT_YES_NO;

  controls: {
    categoryId: FormControl,
    subCategoryId: FormControl,
    projectId: FormControl,
  } = {
    categoryId: new FormControl(0, Validators.required),
    subCategoryId: new FormControl(0, Validators.required),
    projectId: new FormControl(0, Validators.required),
  };

  form = new FormGroup({
    ...this.controls
  });

  constructor(
    public appService: AppService,
    private readonly messageService: MessageService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.appService.setTitle(APP_TITLE, 'Professions - Read');
  }

  ngOnInit(): void {
    this.initialize();
  }

  private readonly initialize = (): void => {
    this.appService.process.start('Loading data...');

  }
}
