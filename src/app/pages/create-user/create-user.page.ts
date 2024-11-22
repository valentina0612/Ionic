import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router, private userService:UserService) { }

  ngOnInit() {
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
      const user = {
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
      };
      const response = await this.userService.createUser(user);
      if (response) {
        this.login();
      }
      else{
        console.log('Error creating user');
      }
    }
  }

  login(): void {
    this.authService.login();
    this.router.navigate(['/tabs']);
  }
}
