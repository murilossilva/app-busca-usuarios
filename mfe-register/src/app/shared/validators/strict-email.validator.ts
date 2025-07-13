import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strictEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email) return null;

    const emailRegex = /^[a-z][a-z0-9._-]*@[a-z]{2,}\.[a-z]{2,}(\.[a-z]{2,})?$/i;
    return emailRegex.test(email) ? null : { invalidEmailStrict: true };
  };
}