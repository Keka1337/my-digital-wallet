import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransakcijePage } from './transakcije.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TransakcijePage,
    children: [
      {
        path: 'sacuvano',
        loadChildren: () =>
          import('./sacuvano/sacuvano.module').then(
            (m) => m.SacuvanoPageModule
          ),
      },
      {
        path: 'istrazi',
        loadChildren: () =>
          import('./istrazi/istrazi.module').then((m) => m.IstraziPageModule),
      },
      {
        path: '',
        redirectTo: '/transakcije/tabs/istrazi',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/transakcije/tabs/istrazi',
    pathMatch: 'full',
  },
];

// {
//   path: 'sacuvano',
//   loadChildren: () => import('./sacuvano/sacuvano.module').then( m => m.SacuvanoPageModule)
// },
// {
//   path: 'istrazi',
//   loadChildren: () => import('./istrazi/istrazi.module').then( m => m.IstraziPageModule)
// }

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransakcijePageRoutingModule {}
