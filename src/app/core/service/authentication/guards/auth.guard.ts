import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from "../authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly authService: AuthenticationService = inject(AuthenticationService)
  private readonly router: Router = inject(Router)

  constructor() {
  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log("connecté");
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
