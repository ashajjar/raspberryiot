import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { IotComponent } from './iot.component';
import { routing } from './iot.router';
import {ChartModule} from "angular2-highcharts";

export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/highcharts-more');
  dd(hc);

  return hc;
}
// const config: SocketIoConfig = { url: 'http://localhost:3000/api/awsiot/ping', options: {} };

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing,
    ChartModule.forRoot(
        require('highcharts'),
        require('highcharts/highcharts-more'),
        require('highcharts/modules/solid-gauge'))
  ],
  declarations: [
    IotComponent
  ],
  bootstrap: [
    IotComponent
  ]
})
export class IotModule {}
