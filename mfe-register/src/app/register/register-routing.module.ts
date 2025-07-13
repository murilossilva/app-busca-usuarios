import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MfeWrapperComponent } from '../shared/components/mfe-wrapper/mfe-wrapper.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MfeWrapperComponent,
    children: [
      {
        path: '',
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
