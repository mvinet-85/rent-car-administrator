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
import {FormValidator} from "../../core/utils/form-validator";
import {Router} from "@angular/router";
import {CarService} from "../../core/service/car/car.service";
import {Car} from "../../core/model/car";
import {CarFormModel} from "../../core/model/form";

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
    licensePlate: new FormControl('', [
      FormValidator.required,
      FormValidator.minLength(5),
    ]),
    frontPicture: new FormControl(null, [FormValidator.required]),
    behindPicture: new FormControl(null, [FormValidator.required]),
  });

  private allLicencesPlate: string[] = [];
  private readonly carService: CarService = inject(CarService);
  private readonly router: Router = inject(Router);

  constructor() {
  }

  ngOnInit() {
    this.carService.getAllLicensePlate()
      .then((licencesPlateArray: string[]) => {
        this.allLicencesPlate = licencesPlateArray;
        this.carForm.controls.licensePlate.setValidators([
          FormValidator.required,
          FormValidator.minLength(5),
          FormValidator.isLicensePlateExists(this.allLicencesPlate)
        ]);
        this.carForm.controls.licensePlate.updateValueAndValidity();
        console.log('allLicencesPlate', this.allLicencesPlate);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.carForm.get(controlName);
    if (control) {
      return FormValidator.getErrorMessage(control);
    }
    return null;
  }

  public onCreate(): void {
    if (this.carForm.valid) {
      this.carService.saveCar(this.carForm.value as unknown as Car)
        .then(() => {
          this.onNavigateToCarListPage();
        }).catch((error: any) => {
        console.error(error);
      });
    }
  }

  onNavigateToCarListPage(): void {
    this.router.navigate(['/car']);
  }

  upload($event: Event, formControlName: string): void {
    const input = $event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.carForm.get(formControlName)?.setValue(formControlName);
    }
  }
}
