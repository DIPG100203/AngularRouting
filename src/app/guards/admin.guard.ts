/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const auth = inject(AuthService)
  

  return auth.user$.pipe(
    map(
      user => {
        if (user?.role==='admin') {
          return true
        }
        else {
          router.navigate(['/home'])
          return false
        }
      }
    )
  )
};
