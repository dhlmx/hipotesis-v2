import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

// Modules
import { MaintenanceRoutingModule } from './maintenance-routing.module';

// Components
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
    CreateComponent,
    DeleteComponent,
    ListComponent,
    ReadComponent,
    UpdateComponent,
    MaintenanceRoutingModule,
    NgOptimizedImage
  ],
  providers: [
    // NgxImageCompressService
  ]
})
export class MaintenanceModule { }
