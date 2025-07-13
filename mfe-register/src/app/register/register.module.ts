import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    RegisterRoutingModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: RegisterComponent }
    ]),
  ],
})
export class RegisterModule {}
