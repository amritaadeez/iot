import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    MainDashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule
  ]
})
export class HomeModule { }
