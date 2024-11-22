import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private idUser = '';
  constructor() {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  idUserLogged(): string {
    return this.idUser;
  }
  
  login(idUser:string): void {
    this.loggedIn = true;
    this.idUser = idUser;
    console.log('User logged in', this.idUser);
  }

  logout(): void {
    this.loggedIn = false;
    this.idUser = '';
  }
}
