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

  static minLength(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value.length >= min ? null : {
        minLength: {
          requiredLength: min,
          actualLength: control.value ? control.value.length : 0
        }
      };
    };
  }

  static passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('passwordConfirmation')?.value;
    return password === passwordConfirmation ? null : {passwordMatch: true};
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
      return 'Le nom utilisateur est invalide.';
    }
    if (control.hasError('minLength')) {
      const minLengthError = control.getError('minLength');
      return `Le champ doit contenir au moins ${minLengthError.requiredLength} caractères.`;
    }
    return null;
  }
}
