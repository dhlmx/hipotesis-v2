import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, MenubarModule],
  providers: [MenuService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menuItems: MenuItem[] = [];

  constructor(private readonly menuService: MenuService) {
    this.menuItems = this.menuService.menuItems;
  }
}
