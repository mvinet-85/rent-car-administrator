import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItemSliding,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Car} from "../../core/model/car";
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../../core/service/car/car.service";
import {addIcons} from "ionicons";
import {arrowBack} from "ionicons/icons";
import {HeaderComponent} from "../../component/header/header.component";
import {ToastService} from "../../core/service/toast/toast.service";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  styleUrls: ['./car-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonItemSliding, IonButton, IonIcon, HeaderComponent]
})
export class CarDetailPage implements OnInit {

  public car: Car | undefined;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly carService: CarService = inject(CarService);
  private readonly toastService: ToastService = inject(ToastService);

  constructor() {
    addIcons({arrowBack});
  }

  ngOnInit() {
    const licensePlate = this.route.snapshot.paramMap.get('id');

    if (licensePlate) {
      this.carService.getCarById(licensePlate)
        .then((car: Car) => {
          this.car = car;
        })
        .catch((error) => {
          this.toastService.errorToast(error.message);
          console.error(error);
        });
    }
  }

  onNavigateToCarListPage(): void {
    this.router.navigate(['/car']);
  }
}
