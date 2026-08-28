import { Injectable } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public menuItems: MenuItem[] = [
    {
      icon: PrimeIcons.BOLT,
      label: 'Math',
      items: [
        {
          icon: PrimeIcons.CHART_SCATTER,
          label: 'Graphs',
          routerLink: '/math/graphs'
        },
      ]
    },
    {
      icon: PrimeIcons.MICROCHIP_AI,
      label: 'Machine Learning',
      items: [
        {
          icon: PrimeIcons.CHART_LINE,
          label: 'Polynomial Regression',
          routerLink: '/ml/pr'
        },
      ]
    }
  ];
}
