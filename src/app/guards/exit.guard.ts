/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { OnExit } from '../models/on-exit';

export const exitGuard: CanDeactivateFn<OnExit> = (component) => {
  return component.OnExit ? component.OnExit() : true;
};
