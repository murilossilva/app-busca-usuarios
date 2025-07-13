import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';
import { RegisterFormService } from '../../services/register-form/register-form.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ui-main-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RegisterComponent implements OnInit {
  searchIcon = faSearch;

  registerForm: FormGroup = this._registerFormService.currentRegisterFieldForm;
  isFormValid: boolean = false;
  retrySendRequest: boolean = false;
  tooltipEnable: boolean = false;

  emailDuplicated: boolean = false;
  connectionError: boolean = false;
  unknownError: boolean = false;
  alertTrigger: boolean = false;

  isLoading$ = this._userService.isLoading$;

  constructor(
    private _registerFormService: RegisterFormService,
    private _userService: UserService,
    private store: Store<{user: IUser}>,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onEmailInputChange() {
    if (this.emailDuplicated) this.emailDuplicated = false;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: IUser = {
        name: this.registerForm.get('registerNameForm')?.value,
        email: this.registerForm.get('registerEmailForm')?.value
      };

      this._userService.createUser(newUser).subscribe({
        next: (res: IUser) => {
          this.registerForm.reset();
          this.cleanErrorMessages();
          this.store.dispatch({ type: '[User] Set User', user: res });

          this.store.select('user').subscribe((store) => {
          })
          this._router.navigate(['/success'], {
            queryParams: { id: res.id }
          })
        },
        error: (err) => {
          console.error('Erro ao salvar usuário: ', err);
          if (err.status === 409) {
            this.emailDuplicated = true;
          } else if (err.status === 0 || err.status === 500) {
            this.alertTrigger = !this.alertTrigger;
            this.connectionError = true;
          } else {
            this.alertTrigger = !this.alertTrigger;
            this.unknownError = true;
          }
        },
      });
    }
  }

  cleanErrorMessages() {
    this.emailDuplicated = false;
    this.connectionError = false;
    this.unknownError = false;
  }
}
