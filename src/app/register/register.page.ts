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
  IonNavLink,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {eyeOffOutline, eyeOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {Router, RouterLink} from "@angular/router";
import {RegisterFormModel} from "../core/model/form";
import {FormValidator} from "../core/utils/form-validator";
import {AuthenticationService} from "../core/service/authentication/authentication.service";
import {Utils} from "../core/utils/utils";
import {User} from "../core/model/user";
import {ToastService} from "../core/service/toast/toast.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonItem, IonInput, ReactiveFormsModule, IonButton, IonNavLink, RouterLink]
})
export class RegisterPage {

  public registerForm: FormGroup<RegisterFormModel> = new FormGroup<RegisterFormModel>({
    userName: new FormControl('', [FormValidator.required, FormValidator.userName, FormValidator.minLength(2)]),
    email: new FormControl('', [FormValidator.required, FormValidator.email]),
    phone: new FormControl('', [FormValidator.required, FormValidator.phone]),
    password: new FormControl('', [FormValidator.required, FormValidator.minLength(8)]),
    passwordConfirmation: new FormControl('', [FormValidator.required]),
  }, {validators: FormValidator.passwordMatch});

  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-outline';
  public passwordConfirmationType: string = 'password';
  public passwordConfirmationIcon: string = 'eye-outline';
  private readonly router: Router = inject(Router);
  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);
  private readonly toastService: ToastService = inject(ToastService);

  constructor() {
    addIcons({eyeOutline, eyeOffOutline});
  }

  public onToggleShowPassword(): void {
    const result = Utils.togglePasswordVisibility(this.passwordType);
    this.passwordType = result.type;
    this.passwordIcon = result.icon;
  }

  public onToggleShowPasswordConfirmation(): void {
    const result = Utils.togglePasswordVisibility(this.passwordConfirmationType);
    this.passwordConfirmationType = result.type;
    this.passwordConfirmationIcon = result.icon;
  }

  public onSignUp(): void {
    if (this.registerForm.valid) {
      this.authenticationService.signUpWithEmailAndPassword(this.registerForm.value as unknown as User)
        .then((userCreated: boolean | unknown) => {
          if (userCreated) {
            this.registerForm.reset();
            this.toastService.infoToast("Vous êtes inscrit");
            this.router.navigate(['car']);
          }
        }).catch((error: any) => {
        this.toastService.errorToast(error.message);
        console.error(error);
      })
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
    if (control) {
      return FormValidator.getErrorMessage(control);
    }
    return null;
  }
}
