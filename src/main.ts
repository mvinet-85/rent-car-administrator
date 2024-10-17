import {bootstrapApplication} from '@angular/platform-browser';
import {PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading} from '@angular/router';
import {IonicRouteStrategy, provideIonicAngular} from '@ionic/angular/standalone';

import {routes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAtTadiTbfsVqRAK1fxolhABxc4gAJHKAI",
  authDomain: "rent-car-administrator.firebaseapp.com",
  projectId: "rent-car-administrator",
  databaseURL: "https://rent-car-administrator-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "rent-car-administrator.appspot.com",
  messagingSenderId: "943999344997",
  appId: "1:943999344997:web:15ff3ff6f0dc0e5a9a018c"
};

const app = initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
