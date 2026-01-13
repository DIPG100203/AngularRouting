/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../../models/auth';
import { User } from '../../models/user';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = `${environment.APIURL}/api/v1/auth`;
  private user = new BehaviorSubject<User | null>(null)
  user$ = this.user.asObservable()

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private http: HttpClient,
    private tokenSe: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.API_URL}/login`, {email, password})
    .pipe(
      tap(response => this.tokenSe.saveToken(response.access_token))
    )
  }

  profile(token: string) {
    /* const headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${token}`) */
    return this.http.get<User>(`${this.API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        
      }
    })
    .pipe(
      tap(user => this.user.next(user))
    )
/*     .pipe(
      tap(user => this.user.next(user))
    ); */
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(rta => this.profile(rta.access_token))
    )
  }

  logOut() {
    this.tokenSe.removeToken()
  }

}
