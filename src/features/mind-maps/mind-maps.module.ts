import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';

// Components
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { MindMapsRoutingModule } from './mind-maps-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
    ListComponent,
    NgOptimizedImage,
    MindMapsRoutingModule,
  ],providers: [
    NgxImageCompressService
  ]
})
export class MindMapsModule { }
