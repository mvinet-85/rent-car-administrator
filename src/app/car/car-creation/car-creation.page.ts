import {Component, inject, OnInit} from '@angular/core';
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
import {CarFormModel} from "../../core/model/form";
import {FormValidator} from "../../core/utils/form-validator";
import {Router} from "@angular/router";
import {CarService} from "../../core/service/car/car.service";
import {Car} from "../../core/model/car";

@Component({
  selector: 'app-car-creation',
  templateUrl: './car-creation.page.html',
  styleUrls: ['./car-creation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonInput, IonItem, ReactiveFormsModule]
})
export class CarCreationPage implements OnInit {

  public carForm: FormGroup<CarFormModel> = new FormGroup<CarFormModel>({
    brand: new FormControl('', [FormValidator.required, FormValidator.minLength(2)]),
    model: new FormControl('', [FormValidator.required, FormValidator.minLength(2)]),
    licensePlate: new FormControl('', [FormValidator.required, FormValidator.licensePlate]),
    frontPicture: new FormControl(null, [FormValidator.required]),
    behindPicture: new FormControl(null, [FormValidator.required]),
  });

  private router: Router = inject(Router);
  private carService: CarService = inject(CarService);

  constructor() {
  }

  ngOnInit() {
    console.log("CarCreationPage");
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.carForm.get(controlName);
    if (control) {
      return FormValidator.getErrorMessage(control);
    }
    return null;
  }

  onCreate() {
    if (this.carForm.valid) {
      this.carService.createCar(this.carForm.value as unknown as Car)
        .then((userCreated: boolean | unknown) => {
          if (userCreated) {
            this.onNavigateToCarListePage();
          }
        }).catch((error: any) => {
        console.error(error);
      })
    }
  }

  onNavigateToCarListePage() {
    this.router.navigate(['/car']);
  }

  upload($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (input.files?.[0]) {
      const file: File = input.files?.[0];
      const controlName = input.getAttribute('formControlName');
      this.carForm.controls.frontPicture.setValue(file);
    }
  }
}
