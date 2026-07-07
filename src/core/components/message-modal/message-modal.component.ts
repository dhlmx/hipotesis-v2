import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './message-modal.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {
  @Input() visible = false;
  @Input() message = '';
}
