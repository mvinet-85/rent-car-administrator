import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {eyeOffOutline, eyeOutline} from "ionicons/icons";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../core/service/authentication/authentication.service";
import {Utils} from "../core/utils/utils";
import {FormValidator} from "../core/utils/form-validator";
import {LoginFormModel} from "../core/model/form";
import {User} from "../core/model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonItem, IonIcon, IonButton, ReactiveFormsModule, RouterLink]
})
export class LoginPage {

  public loginForm: FormGroup<LoginFormModel> = new FormGroup<LoginFormModel>({
    email: new FormControl('', [FormValidator.required, FormValidator.email]),
    password: new FormControl('', [FormValidator.required, FormValidator.minLength(8)]),
  });

  public passwordType = 'password';
  public passwordIcon = 'eye-outline';

  private router: Router = inject(Router);
  private authenticationService: AuthenticationService = inject(AuthenticationService);

  constructor() {
    addIcons({eyeOutline, eyeOffOutline});
  }

  public onToggleShowPassword(): void {
    const result = Utils.togglePasswordVisibility(this.passwordType);
    this.passwordType = result.type;
    this.passwordIcon = result.icon;
  }

  public onSignIn(): void {
    this.authenticationService.signInWithEmailAndPassword(this.loginForm.value as unknown as Partial<User>)
      .then(() => {
        this.router.navigate(['car']);
      }).catch((error) => {
      console.error(error);
    });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    if (control) {
      return FormValidator.getErrorMessage(control);
    }
    return null;
  }

}
