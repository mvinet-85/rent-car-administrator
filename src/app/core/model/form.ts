import {FormControl} from "@angular/forms";

export interface RegisterFormModel {
  userName: FormControl<string | null>,
  email: FormControl<string | null>,
  phone: FormControl<string | null>,
  password: FormControl<string | null>,
  passwordConfirmation: FormControl<string | null>,
}

export interface LoginFormModel {
  email: FormControl<string | null>,
  password: FormControl<string | null>,
}

export interface CarFormModel {
  brand: FormControl<string | null>,
  model: FormControl<string | null>,
  licensePlate: FormControl<string | null>,
  frontPicture: FormControl<File | null>,
  behindPicture: FormControl<File | null>,
}
