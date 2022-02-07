import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { ProfileComponent } from '../profile/profile.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const routes: Routes = [
  {
    path: "main",
    canActivate: [AuthGuard],
    component: MainDashboardComponent,
  },

  {
    path: "profile",
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
