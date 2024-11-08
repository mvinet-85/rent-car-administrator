import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import {logOutOutline} from "ionicons/icons";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class HeaderComponent {

  private readonly router: Router = inject(Router);

  constructor() {
    addIcons({logOutOutline});
  }

  onNavigateToLoginPage() {
    this.router.navigate(['login']);
  }

}
