import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private alertController: AlertController) { }

  ngOnInit() {
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Your username or password is incorrect',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async login() {
    const user = await this.userService.login(this.username, this.password);
    if (user) {
      this.authService.login(user._id);
      this.router.navigate(['/tabs']);
    }
    else{
      console.log('Invalid username or password');
      this.showAlert();
    }
  }

  createAccount() {
    this.router.navigate(['/create-user']);
  }

}
