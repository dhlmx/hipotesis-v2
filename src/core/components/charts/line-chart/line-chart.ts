import { Component, inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PrimeNgModule } from '../../../modules/prime-ng.module';
import { IData } from '../../../interfaces/charts/idata';
import { IOptions } from '../../../interfaces/charts/ioptions';

// Interfaces & Models

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.html',
  styleUrls: ['./line-chart.scss'],
  imports: [PrimeNgModule],
  standalone: true
})
export class LineChart implements OnChanges, OnInit {
  platformId = inject(PLATFORM_ID);
  documentStyle = getComputedStyle(document.documentElement);
  textColor = '';
  textColorSecondary = '';
  surfaceBorder = '';

  @Input()data: IData = {} as IData;
  public options: IOptions = {} as IOptions;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.textColor = this.documentStyle.getPropertyValue('--p-text-color');
      this.textColorSecondary = this.documentStyle.getPropertyValue('--p-text-muted-color');
      this.surfaceBorder = this.documentStyle.getPropertyValue('--p-content-border-color');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.data = changes['data'].currentValue;
      this.initChart();
    }
  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    /*
    if (isPlatformBrowser(this.platformId)) {
      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: this.textColor
            }
          }
        },
        scales: {
          x: {
              ticks: {
                color: this.textColorSecondary,

              },
              grid: {
                color: this.surfaceBorder,
                drawBorder: false
              }
            },
            y: {
              ticks: {
                color: this.textColorSecondary
              },
              grid: {
                color: this.surfaceBorder,
                drawBorder: false
              }
            }
        }
      };
    }
      */
  }
}
