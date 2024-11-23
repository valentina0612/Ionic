import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private idUser = '';
  
  constructor(private storage: Storage, private router: Router) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.idUser = await this.storage.get('idUser');
    }

  async isLoggedIn(): Promise<boolean> {
    this.idUser = await  this.storage.get('idUser')
    this.loggedIn = this.idUser ? true : false;
    return this.loggedIn;
  }

    idUserLogged(): string {
    return this.idUser;
  }
  
  async login(idUser:string){
    this.loggedIn = true;
    this.idUser = idUser;
    await this.storage.set('idUser', idUser);
    console.log('User logged in', this.idUser);
  }

  logout(): void {
    this.loggedIn = false;
    this.idUser = '';
    this.storage.remove('idUser');
    this.router.navigate(['/login']);
  }
}
