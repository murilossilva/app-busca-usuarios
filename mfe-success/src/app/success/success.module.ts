import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SuccessComponent } from './components/success/success.component';
import { SuccessRoutingModule } from './success-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SuccessComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    SuccessRoutingModule,
    RouterModule.forChild([
      { path: '', component: SuccessComponent }
    ]),
  ],
})
export class SuccessModule {}
