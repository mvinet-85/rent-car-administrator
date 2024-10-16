import {Component, OnInit} from '@angular/core';
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
import {eyeOffOutline, eyeOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {Router} from "@angular/router";
import {RegisterFormModel} from "../core/model/form";
import {FormValidator} from "../utils/form-validator";
import {AuthenticationService} from "../core/service/authentication/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonItem, IonInput, ReactiveFormsModule, IonButton]
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup<RegisterFormModel> = new FormGroup<RegisterFormModel>({
    userName: new FormControl('', [FormValidator.required, FormValidator.userName, FormValidator.minLength(2)]),
    email: new FormControl('', [FormValidator.required, FormValidator.email]),
    phone: new FormControl('', [FormValidator.required, FormValidator.phone]),
    password: new FormControl('', [FormValidator.required, FormValidator.minLength(8)]),
    passwordConfirmation: new FormControl('', [FormValidator.required]),
  }, {validators: FormValidator.passwordMatch});

  public passwordType = 'password';
  public passwordIcon = 'eye-outline';

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    addIcons({eyeOutline, eyeOffOutline});
  }

  ngOnInit() {
    console.log("RegisterPage");
  }

  public onToggleShowPassword(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-off-outline';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-outline';
    }
  }

  public onSignUp(): void {
    if (this.registerForm.valid) {
      console.log('Form Submitted!', this.registerForm.value);
      // this.authenticationService.signUpWithEmailAndPassword(this.registerForm.value as unknown as User)
      //   .then((userCreated: boolean | unknown) => {
      //     console.log(userCreated);
      //     if (userCreated) {
      //       this.router.navigate(['car']);
      //     }
      //   }).catch((error: any) => {
      //     console.log(error);
      //   })
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
