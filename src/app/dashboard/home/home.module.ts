import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  declarations: [
    MainDashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSlideToggleModule,
    NgxChartsModule
  ]
})
export class HomeModule { }
