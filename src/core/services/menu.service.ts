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
      icon: PrimeIcons.MICROCHIP,
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
            }
          ]
        },
        {
          icon: PrimeIcons.EYE,
          label: 'Supervised',
          items: [/*
            {
              icon: PrimeIcons.ARROW_DOWN_LEFT_AND_ARROW_UP_RIGHT_TO_CENTER,
              label: 'Association Rules',
              routerLink: '/ml/ar'
            },*/
            {
              icon: PrimeIcons.CHART_SCATTER,
              label: 'k-Nearest Neighbor',
              routerLink: '/ml/knn'
            },
            {
              icon: PrimeIcons.FILTER,
              label: 'Naive Bayes Classifier',
              routerLink: '/ml/nb'
            },
            {
              icon: PrimeIcons.CHART_LINE,
              label: 'Polynomial Regression',
              routerLink: '/ml/pr'
            },
            {
              icon: PrimeIcons.SHARE_ALT,
              label: 'Random Forest',
              routerLink: '/ml/rf'
            },
            {
              icon: PrimeIcons.CHART_SCATTER,
              label: 'Support Vector Machine',
              routerLink: '/ml/svm'
            }
          ]
        }
      ]
    },
    {
      icon: PrimeIcons.COG,
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
