import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MiscellanyRoutingModule } from './miscellany-routing.module';

// Components
import { WaterConsumption } from './water-consumption/water-consumption';

@NgModule({
  declarations: [
  ],
  imports: [
    WaterConsumption,
    NgOptimizedImage,
    MiscellanyRoutingModule,
  ],providers: [
    NgxImageCompressService
  ]
})
export class MiscellanyModule { }
