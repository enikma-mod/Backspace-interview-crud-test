import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Customer } from '../../../Models/customer.model';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    router.navigate(['/login']);
    return false;
  }

  const user: Customer = JSON.parse(storedUser);

  // Check if user is admin
  if (user.admin) {
    return true;
  }

  router.navigate(['/customer-dashboard']); // redirect non-admin users
  return false;
};
