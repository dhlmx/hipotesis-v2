import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

// Modules
import { DailyRoutingModule } from './daily-routing.module';

// Components
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
    ListComponent,
    NgOptimizedImage,
    DailyRoutingModule
  ],
  providers: [
    // NgxImageCompressService
  ]
})
export class DailyModule { }
