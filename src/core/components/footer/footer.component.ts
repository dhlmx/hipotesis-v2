import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [PanelModule],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {}
