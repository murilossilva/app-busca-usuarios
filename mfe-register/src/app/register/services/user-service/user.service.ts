import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();

  private readonly API_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  createUser(user: IUser): Observable<IUser> {
    this._isLoading.next(true);

    return this.http
      .post<IUser>(this.API_URL, user)
      .pipe(finalize(() => this._isLoading.next(false)));
  }

  getIUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.API_URL);
  }
}
