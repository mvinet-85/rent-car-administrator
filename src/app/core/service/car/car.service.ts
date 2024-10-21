import {Injectable} from '@angular/core';
import {getDatabase, onValue, ref, set} from "firebase/database";
import {Car} from "../../model/car";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() {
  }

  public saveCar(car: Car): Promise<void> {
    return set(ref(getDatabase(), 'car/' + car.licensePlate), {
      brand: car.brand,
      model: car.model,
      licensePlate: car.licensePlate,
      frontPicture: car.frontPicture,
      behindPicture: car.behindPicture,
    });
  }

  public getAllLicensePlate(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const contactsRef = ref(getDatabase(), 'car/');
      onValue(contactsRef, (snapshot) => {
        const data = snapshot.val();
        const licencesPlateArray: string[] = [];
        if (data) {
          Object.entries(data).forEach(value => {
            const car: Car = value[1] as Car;
            licencesPlateArray.push(car.licensePlate);
          });
        }
        resolve(licencesPlateArray);
      });
    });
  }
}
