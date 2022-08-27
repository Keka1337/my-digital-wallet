import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IstraziPage } from './istrazi.page';

const routes: Routes = [
  {
    path: '',
    component: IstraziPage,
  },
  {
    path: ':transakcijaID',
    loadChildren: () =>
      import('./transakcija-details/transakcija-details.module').then(
        (m) => m.TransakcijaDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IstraziPageRoutingModule {}
