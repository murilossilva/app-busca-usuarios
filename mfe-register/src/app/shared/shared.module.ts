import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StyleInjectorComponent } from './styles/style-injector/style-injector.component';
import { MfeWrapperComponent } from './components/mfe-wrapper/mfe-wrapper.component';
import { RouterModule } from '@angular/router';
import { UiErrorAlertComponent } from './components/error-alert/error-alert.component';

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
    UiErrorAlertComponent,
    StyleInjectorComponent
  ],
  declarations: [
    StyleInjectorComponent,
    MfeWrapperComponent,
    UiErrorAlertComponent
  ]
})
export class SharedModule { }
