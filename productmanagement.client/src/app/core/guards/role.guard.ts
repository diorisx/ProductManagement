import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.userdata?.role == "admin"){
    return true
  } else {
    router.navigate(["/dashboard/"]);
    return false;
  }
};
