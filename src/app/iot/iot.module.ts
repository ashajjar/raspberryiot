import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { IotComponent } from './iot.component';
import { routing } from './iot.router';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    IotComponent
  ],
  bootstrap: [
    IotComponent
  ]
})
export class IotModule {}
