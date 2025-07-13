import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterFormDataService } from '../register-form-data/register-form-data.service';

@Injectable({
    providedIn: 'root'
})
export class RegisterFormService {
    constructor(
        private _registerFormDataService: RegisterFormDataService
    ) {}

    get currentRegisterFieldForm(): FormGroup {
        return this._registerFormDataService.getCurrentFormGroupRegisterProfile;
    }
    
    public validateField() {
        if (
            this.currentRegisterFieldForm.controls['registerEmailForm'].value === null ||
            this.currentRegisterFieldForm.controls['registerEmailForm'].value === '' ||
            this.currentRegisterFieldForm.controls['registerEmailForm'].value === undefined ||
            this.currentRegisterFieldForm.controls['registerEmailForm'].value.length > 100
        ) {
            return false
        }
        return true
    }
}