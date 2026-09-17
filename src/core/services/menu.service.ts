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
          icon: PrimeIcons.BOX,
          label: 'Combinatory Analysis',
          routerLink: '/math/graphs'
        },
        {
          icon: PrimeIcons.CHART_SCATTER,
          label: 'Graphs',
          routerLink: '/math/graphs'
        },
      ]
    },
    {
      icon: PrimeIcons.MICROCHIP_AI,
      label: 'Preprocessing',
      items: [
        {
          icon: PrimeIcons.CHART_LINE,
          label: 'Polynomial Regression',
          routerLink: '/ml/pr'
        },
      ]
    },
    {
      icon: PrimeIcons.MICROCHIP_AI,
      label: 'Machine Learning',
      items: [
        {
          icon: PrimeIcons.EYE_SLASH,
          label: 'Unsupervised',
          items: [
            {
              icon: PrimeIcons.CHART_SCATTER,
              label: 'K-Means',
              routerLink: '/ml/km'
            },
            {
              icon: PrimeIcons.CHART_LINE,
              label: 'Polynomial Regression',
              routerLink: '/ml/pr'
            }
          ]
        },
        {
          icon: PrimeIcons.EYE,
          label: 'Supervised',
          items: [
            {
              icon: PrimeIcons.CHART_LINE,
              label: 'Polynomial Regression',
              routerLink: '/ml/pr'
            }
          ]
        }
      ]
    },
    {
      icon: PrimeIcons.HAMMER,
      label: 'Miscelánea',
      items: [
        {
          icon: PrimeIcons.GAUGE,
          label: 'Verificador de Consumo de Agua (México, CdMx)',
          routerLink: '/misc/wc'
        },
      ]
    }
  ];
}
