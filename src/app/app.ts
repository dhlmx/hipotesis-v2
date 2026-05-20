import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from '../core/modules/core.module';
import { DailyModule } from '../features/daily/daily.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule, DailyModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Hipótesis v2');
}
