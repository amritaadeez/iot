import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './dashboard/profile/profile.component';

const routes: Routes = [
 
  { 
    path: 'dashboard', 
    loadChildren: () => import(`./dashboard/dashboard.module`).then(
      module => module.DashboardModule
    )
  },
  { 
    path: '', 
    loadChildren: () => import(`./auth/auth.module`).then(
      module => module.AuthModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
