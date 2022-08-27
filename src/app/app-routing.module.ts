import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full',
  },
  {
    path: 'transakcije',
    loadChildren: () =>
      import('./transakcije/transakcije.module').then(
        (m) => m.TransakcijePageModule
      ),
    // canLoad: [AuthGuard],
  },
  {
    path: 'log-in',
    loadChildren: () =>
      import('./auth/log-in/log-in.module').then((m) => m.LogInPageModule),
    // canLoad: [AuthGuard],
  },
  {
    path: 'registracija',
    loadChildren: () =>
      import('./auth/registracija/registracija.module').then(
        (m) => m.RegistracijaPageModule
      ),
    // canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
