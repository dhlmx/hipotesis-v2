import { Component } from '@angular/core';
import { CoreModule } from '../../../core/modules/core.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

@Component({
  standalone: true,
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  providers: [ConfirmationService, MessageService],
  imports: [CoreModule, PrimeNgModule]
})
export class DeleteComponent {

}
