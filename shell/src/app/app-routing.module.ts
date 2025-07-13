import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loadRemoteModule } from '@angular-architects/module-federation';
import { successGuard } from './shared/guards/success.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './Module',
      }).then(m => m.RegisterModule),
  },
  {
    path: 'success',
    canMatch: [successGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Module',
      }).then(m => m.SuccessModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
