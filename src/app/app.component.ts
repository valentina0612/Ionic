import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.checkLogin();
  }

  async checkLogin() {
    if (await this.authService.isLoggedIn()) {
      this.router.navigate(['/tabs']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
