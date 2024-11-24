import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from "../authentication.service";
import {ToastService} from "../../toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly authService: AuthenticationService = inject(AuthenticationService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly router: Router = inject(Router);

  constructor() {
  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.toastService.errorToast("Vous devez être connecté pour accéder à ces pages");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
