import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StyleInjectorComponent } from './styles/style-injector/style-injector.component';
import { MfeWrapperComponent } from './components/mfe-wrapper/mfe-wrapper.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const baseModules = [
  ReactiveFormsModule,
  HttpClientModule,
  CommonModule,
  RouterModule,
  FontAwesomeModule
]

@NgModule({
  imports: [
    ...baseModules
  ],
  exports: [
    ...baseModules,
    MfeWrapperComponent,
    StyleInjectorComponent
  ],
  declarations: [
    StyleInjectorComponent,
    MfeWrapperComponent,
  ]
})
export class SharedModule { }
