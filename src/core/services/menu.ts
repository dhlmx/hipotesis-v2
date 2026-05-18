import { Injectable } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class Menu {
  public menuItems: MenuItem[] = [
    {
      icon: PrimeIcons.WAVE_PULSE,
      label: 'Análisis',
      items: [
        {
          icon: PrimeIcons.SITEMAP,
          label: 'Mapas Mentales',
          routerLink: '/mind-maps/'
        },
      ]
    },
    {
      icon: PrimeIcons.CALENDAR,
      label: 'Diario',
      items: [
        {
          icon: PrimeIcons.LIST_CHECK,
          label: 'Listado',
          routerLink: '/daily/'
        },
      ]
    }
  ];
}
