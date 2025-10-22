import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Customer } from '../../../Models/customer.model';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    router.navigate(['/login']);
    return false;
  }

  const user: Customer = JSON.parse(storedUser);

  // If we have a valid user object, allow access
  return !!user.customerId;
};
