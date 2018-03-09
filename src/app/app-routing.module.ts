import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocatorComponent } from './locator/locator.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LocatorComponent
  },
  {
    path: 'dashboard/:basecity',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
