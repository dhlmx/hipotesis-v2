import { PercentPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  providers: [PercentPipe],
  imports: [DialogModule],
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {
  @Input() visible = false;
  @Input() message = '';
  @Input() steps = '';
  @Input() advance = '';
}
