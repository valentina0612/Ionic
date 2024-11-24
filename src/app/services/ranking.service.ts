import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/url.servicios';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient, private userService: UserService) { }
  apiURLRanking = `${URL_SERVICIOS}/Obtained`;
  capturedCharacters: any[] = [];
  exchangedCharacters: any[] = [];

  async getCapturedCharacters() {
    try {
      // Inicializar las listas antes de llenarlas
      this.capturedCharacters = [];

      // Obtener todos los usuarios
      const users = await this.userService.getUsers();

      // Obtener todos los personajes obtenidos de todos los usuarios y guardarlos según el método
      for (const user of users) {
        const captured = await this.http.get<any>(`${this.apiURLRanking}/user/${user._id}/method/Captured`).toPromise();
        console.log('Obtained characters', captured);
        if (captured) {
          this.capturedCharacters.push({userId: user._id, username: user.username, captured: captured.obtained.length, allObtaineds: captured.obtained});
        }
      }
      this.capturedCharacters.sort((a, b) => b.captured - a.captured);
      return this.capturedCharacters;
      
  } catch (error) {
    console.error('Error loading obtained characters', error);
    return [];
  }
}

async getExchangedCharacters() {
  try {
    // Inicializar las listas antes de llenarlas
    this.exchangedCharacters = [];

    // Obtener todos los usuarios
    const users = await this.userService.getUsers();

    // Obtener todos los personajes obtenidos de todos los usuarios y guardarlos según el método
    for (const user of users) {
      const exchanged = await this.http.get<any>(`${this.apiURLRanking}/user/${user._id}/method/Exchanged`).toPromise();
      console.log('Obtained characters', exchanged);
      if (exchanged) {
        this.exchangedCharacters.push({userId: user._id, username: user.username, exchanged: exchanged.obtained.length, allObtaineds: exchanged.obtained});
      }
    }
    this.exchangedCharacters.sort((a, b) => b.exchanged - a.exchanged);
    return this.exchangedCharacters;
    
} catch (error) {
  console.error('Error loading obtained characters', error);
  return [];
}
}
  
}
