import { Injectable } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public menuItems: MenuItem[] = [
    {
      icon: PrimeIcons.FILE,
      label: 'Files',
      items: [
        {
          icon: PrimeIcons.EYE,
          label: 'See',
          routerLink: '/files/'
        },
      ]
    }
  ];
}
