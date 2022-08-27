import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransakcijaDetailsPage } from './transakcija-details.page';

const routes: Routes = [
  {
    path: '',
    component: TransakcijaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransakcijaDetailsPageRoutingModule {}
