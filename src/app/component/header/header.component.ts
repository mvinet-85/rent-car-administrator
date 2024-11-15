import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import {logOutOutline} from "ionicons/icons";
import {IonicModule} from "@ionic/angular";
import {AuthenticationService} from "../../core/service/authentication/authentication.service";

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
  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);

  constructor() {
    addIcons({logOutOutline});
  }

  onNavigateToLoginPage() {
    this.authenticationService.signOut();
  }
}
