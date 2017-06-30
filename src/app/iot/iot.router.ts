import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IotComponent } from './iot.component';

const routes: Route[] = [
  {
    path: '',
    component: IotComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
