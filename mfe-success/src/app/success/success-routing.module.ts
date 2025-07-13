import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MfeWrapperComponent } from '../shared/components/mfe-wrapper/mfe-wrapper.component';
import { SuccessComponent } from './components/success/success.component';

const routes: Routes = [
  {
    path: '',
    component: MfeWrapperComponent,
    children: [
      {
        path: '',
        component: SuccessComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuccessRoutingModule { }
