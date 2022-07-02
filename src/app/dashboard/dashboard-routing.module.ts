import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';



const routes: Routes = [{
  path: "",
  component: LayoutComponent,
  children: [

  
    {
      path: 'home',
      loadChildren: () => import(`./home/home.module`).then(
        module => module.HomeModule
      )
    },


    {
      path: "**",
      component: PageNotFoundComponent,
    },
  ],
}, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
