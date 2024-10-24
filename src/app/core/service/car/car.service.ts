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
        return set(ref(getDatabase(), 'cars/' + car.licensePlate), {
            brand: car.brand,
            model: car.model,
            licensePlate: car.licensePlate,
            frontPicture: car.frontPicture,
            behindPicture: car.behindPicture,
        });
    }

    public getAllLicensePlate(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const carsRef = ref(getDatabase(), 'cars/');
            onValue(carsRef, (snapshot) => {
                const data = snapshot.val();
                const licensePlateArray: string[] = [];
                if (data) {
                    Object.entries(data).forEach(value => {
                        const car: Car = value[1] as Car;
                        licensePlateArray.push(car.licensePlate);
                    });
                }
                resolve(licensePlateArray);
            });
        });
    }

    public getAllCar(): Promise<Car[]> {
        return new Promise((resolve, reject) => {
            const contactsRef = ref(getDatabase(), 'cars/');
            onValue(contactsRef, (snapshot) => {
                const data = snapshot.val();
                const contacts: Car[] = [];
                if (data) {
                    Object.entries(data).forEach(value => {
                        contacts.push(value[1] as Car);
                    });
                }
                resolve(contacts);
            });
        });
    }

    public getCarById(licensePlate: string): Promise<Car> {
        return new Promise((resolve, reject) => {
            const carRef = ref(getDatabase(), 'cars/' + licensePlate);
            onValue(carRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    resolve(data as Car);
                } else {
                    reject('La voiture avec la plaque d\'immatriculation est introuvable');
                }
            });
        });
    }
}
