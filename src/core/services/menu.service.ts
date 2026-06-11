import { Injectable } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public menuItems: MenuItem[] = [
    {
      icon: PrimeIcons.BRIEFCASE,
      label: 'Mantenimiento',
      items: [
        {
          icon: PrimeIcons.SITEMAP,
          label: 'Projectos',
          routerLink: '/mantenimiento/'
        },
      ]
    }
  ];
}
