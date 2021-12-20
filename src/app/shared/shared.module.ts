// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class SharedModule { }




import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import {
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  ApiserviceService
} from '../apiservice.service';
import {
  AuthGuard
} from '../auth.guard';
import {
  AuthService
} from '../auth.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSlideToggleModule

  ],
  providers: [
    ApiserviceService,
    AuthService,
    AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: Interceptor,
    //   multi: true,
    // },
  ],
})
export class SharedModule {}
