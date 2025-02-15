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
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {Car} from "../../core/model/car";
import {CarService} from "../../core/service/car/car.service";
import {addIcons} from "ionicons";
import {addCircleOutline} from "ionicons/icons";
import {HeaderComponent} from "../../component/header/header.component";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonIcon, HeaderComponent, IonFooter]
})
export class CarListPage implements OnInit {

  public cars: Car[] = [];

  private readonly router: Router = inject(Router);
  private readonly carService: CarService = inject(CarService);

  constructor() {
    addIcons({addCircleOutline});
  }

  ngOnInit() {
    this.loadCars();
  }

  ionViewWillEnter() {
    this.loadCars();
  }

  onNavigateToCreationPage() {
    this.router.navigate(['car/new']);
  }

  onCarSelect(licensePlate: string) {
    this.router.navigate([`/car/${licensePlate}`]);
  }

  private loadCars() {
    this.carService.getAllCar()
      .then((cars: Car[]) => {
        this.cars = cars;
      });
  }
}
