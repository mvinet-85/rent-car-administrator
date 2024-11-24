import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonImg, IonInput, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {FormValidator} from "../../core/utils/form-validator";
import {Router} from "@angular/router";
import {CarService} from "../../core/service/car/car.service";
import {Car} from "../../core/model/car";
import {CarFormModel} from "../../core/model/form";
import {HeaderComponent} from "../../component/header/header.component";
import {ToastService} from "../../core/service/toast/toast.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

@Component({
  selector: 'app-car-creation',
  templateUrl: './car-creation.page.html',
  styleUrls: ['./car-creation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonImg, ReactiveFormsModule, HeaderComponent, IonInput]
})
export class CarCreationPage implements OnInit {

  public carForm: FormGroup<CarFormModel> = new FormGroup<CarFormModel>({
    brand: new FormControl('', [FormValidator.required, FormValidator.minLength(2)]),
    model: new FormControl('', [FormValidator.required, FormValidator.minLength(2)]),
    licensePlate: new FormControl('', [
      FormValidator.required,
      FormValidator.minLength(5),
      FormValidator.licensePlate,
    ]),
    frontPicture: new FormControl(null, [FormValidator.required]),
    behindPicture: new FormControl(null, [FormValidator.required]),
  });

  public frontPicturePreview: string | ArrayBuffer | null = null;
  public behindPicturePreview: string | ArrayBuffer | null = null;
  private allLicencesPlate: string[] = [];
  private readonly carService: CarService = inject(CarService);
  private readonly router: Router = inject(Router);
  private readonly toastService: ToastService = inject(ToastService);

  constructor() {
  }

  ngOnInit() {
    this.carService.getAllLicensePlate()
      .then((licencesPlateArray: string[]) => {
        this.allLicencesPlate = licencesPlateArray;
        this.carForm.controls.licensePlate.setValidators([
          FormValidator.required,
          FormValidator.minLength(5),
          FormValidator.licensePlate,
          FormValidator.isLicensePlateExists(this.allLicencesPlate)
        ]);
        this.carForm.controls.licensePlate.updateValueAndValidity();
      })
      .catch((error: any) => {
        this.toastService.errorToast(error.message);
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
          this.toastService.infoToast("Voiture ajoutée")
          this.onNavigateToCarListPage();
        }).catch((error: any) => {
        this.toastService.errorToast(error.message);
        console.error(error);
      });
    }
  }

  onNavigateToCarListPage(): void {
    this.onResetForm();
    this.router.navigate(['/car']);
  }

  onResetForm(): void {
    this.behindPicturePreview = null;
    this.frontPicturePreview = null;
    this.carForm.reset();
  }

  async takePicture(formControlName: string) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    if (image?.dataUrl) {
      this.carForm.get(formControlName)?.setValue(image.dataUrl);
      if (formControlName === 'frontPicture') {
        this.frontPicturePreview = image.dataUrl;
      } else if (formControlName === 'behindPicture') {
        this.behindPicturePreview = image.dataUrl;
      }
    }
  };
}
