import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' }) export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this.authService.isAdmin()) { return true; }
    this.router.navigate(['/home']);
    return false;
  }
}
