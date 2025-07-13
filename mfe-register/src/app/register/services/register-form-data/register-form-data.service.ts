import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { validateCustomName } from '../../../shared/validators/name-format.validator';
import { strictEmailValidator } from '../../../shared/validators/strict-email.validator';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormDataService {
  private _registerProfileForm: FormGroup = new FormGroup({
    registerNameForm: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      validateCustomName()
    ]),
    registerEmailForm: new FormControl(null, [
      Validators.required, 
      strictEmailValidator()
    ]),
  });

  checkIfUsernameIsStandardized(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value;

        const hasSpecialCharacters = /[^a-zA-Z0-9-]/g.test(value);
        const checkHiphenPosition = /(-)$|^(-)|--/.test(value);

        const isValid = hasSpecialCharacters || checkHiphenPosition;

        return isValid ? { validate: true } : null;
    }
  }

  public get getCurrentFormGroupRegisterProfile(): FormGroup {
    return this._registerProfileForm;
  }
}
