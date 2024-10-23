import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {initializeApp} from "firebase/app";

describe('AuthentificationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyAtTadiTbfsVqRAK1fxolhABxc4gAJHKAI',
      authDomain: 'rent-car-administrator.firebaseapp.com',
      projectId: 'rent-car-administrator',
      databaseURL: 'https://rent-car-administrator-default-rtdb.europe-west1.firebasedatabase.app/',
      storageBucket: 'rent-car-administrator.appspot.com',
      messagingSenderId: '943999344997',
      appId: '1:943999344997:web:15ff3ff6f0dc0e5a9a018c'
    };

    initializeApp(firebaseConfig);
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
