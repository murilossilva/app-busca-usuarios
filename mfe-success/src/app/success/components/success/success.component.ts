import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';
import { faCheckCircle, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SuccessComponent {
  private _user: IUser | undefined;

  xCircleCheck: IconDefinition = faCheckCircle;
  xArrowRight: IconDefinition = faAngleRight;

  get user() {
    return this._user;
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private _store: Store<{ user: IUser }>
  ) {}

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      const id = params['id'];

      if(id){
        this._http
          .get<IUser>(`http://localhost:3000/users/${id}`)
          .subscribe({
            next: (res: IUser) => {
              this._user = res;
            },
            error: (err) => {
              console.error(err);
            }
          });
      }
    })

    this.cleanStore();
  }

  cleanStore() {
    this._store.dispatch({ type: '[User] Clear User' })
  }

  backToRegister() {
    this._router.navigate(['/register'])
  }
}
