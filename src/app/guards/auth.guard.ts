/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token/token.service';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenSer = inject(TokenService);
  const router = inject(Router)
  const auth = inject(AuthService)
  /* const token = tokenSer.getToken();

  if (!tokenSer) {
    router.navigate(['/home'])
    return false
  }

  //return !!token;
  return true; */

  return auth.user$.pipe(
    map(
      user => {
        if (!user) {
          router.navigate(['/home'])
          return false
        }
        return true
      }
    )
  )
};
