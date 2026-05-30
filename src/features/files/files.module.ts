import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FilesRoutingModule } from './files-routing.module';

// Components
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CreateComponent,
    ReadComponent,
    NgOptimizedImage,
    FilesRoutingModule,
  ],providers: [
    NgxImageCompressService
  ]
})
export class FilesModule { }
