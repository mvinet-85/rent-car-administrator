import {AbstractControl, ValidationErrors} from "@angular/forms";

export class FormValidator {

  static required(control: AbstractControl): ValidationErrors | null {
    return control.value ? null : {required: true};
  }

  static email(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(control.value) ? null : {email: true};
  }

  static phone(control: AbstractControl): ValidationErrors | null {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(control.value) ? null : {phone: true};
  }

  static userName(control: AbstractControl): ValidationErrors | null {
    const namePattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    return namePattern.test(control.value) ? null : {name: true};
  }

  static getErrorMessage(control: AbstractControl): string | null {
    if (control.hasError('required')) {
      return 'Le champ est obligatoire.';
    }
    if (control.hasError('email')) {
      return 'L\'adresse email invalide.';
    }
    if (control.hasError('phone')) {
      return 'Le numéro de téléphone invalide. Il doit comporter 10 chiffres.';
    }
    if (control.hasError('name')) {
      return 'Le nom utilisateur. est invalide';
    }
    return null;
  }
}
