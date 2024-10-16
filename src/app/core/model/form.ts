import {FormControl} from "@angular/forms";

export interface RegisterFormModel {
  userName: FormControl<string | null>,
  email: FormControl<string | null>,
  phone: FormControl<string | null>,
  password: FormControl<string | null>,
  passwordConfirmation: FormControl<string | null>,
}
