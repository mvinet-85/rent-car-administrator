import {inject, Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastController: ToastController = inject(ToastController);

  constructor() {
  }

  async errorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'danger',

    });

    await toast.present();
  }

  async infoToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'secondary',
    });

    await toast.present();
  }
}
