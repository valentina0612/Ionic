import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  email = '';
  username = '';
  firstName = '';
  lastName = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private userService:UserService, private alertController: AlertController) { }

  ngOnInit() {
  }

  async showAlert(error: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: error,
      buttons: ['OK'],
    });
    await alert.present();
  }

  isFormValid(): boolean {
    return (
      this.email.trim() !== '' &&
      this.username.trim() !== '' &&
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.password.trim() !== ''
    );
  }

  async createUser(): Promise<void> {
    if (this.isFormValid()) {
      const nameRegex = /^[A-Za-z]+$/;

  if (!nameRegex.test(this.firstName)) {
    this.showAlert("First name can only contain letters.");
    return;
  }

  if (!nameRegex.test(this.lastName)) {
    this.showAlert("Last name can only contain letters.");
    return;
  }
      const user = {
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
      };
      const response = await this.userService.createUser(user);
      if (response) {
        this.login(response._id);
      }
      else{
        this.showAlert('Error creating user. Try a different email or username');
      }
    }
    else {
      this.showAlert('Please fill all the fields with valid information');
    }
  }

  login(idUser:string): void {
    this.authService.login(idUser);
    this.router.navigate(['/tabs']);
  }
}
