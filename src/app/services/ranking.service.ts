import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient) { }
  apiURLRanking = `${URL_SERVICIOS}/Obtained`;
  allObtainedCharacters: any[] = [];
  capturedCharacters: any[] = [];
  exchangedCharacters: any[] = [];

  async getAllObtainedCharacters() {
    try {
      const response = await this.http.get<any>(`${this.apiURLRanking}`).toPromise();
      this.allObtainedCharacters = response.obtained;
      for (let i = 0; i < this.allObtainedCharacters.length; i++) {
        const obtained = this.allObtainedCharacters[i];
        if (obtained.method === 'Captured') {
          this.capturedCharacters.push(obtained);
        }
        if (obtained.method === 'Exchanged') {
          this.exchangedCharacters.push(obtained);
        }
      }
      return this.allObtainedCharacters
    } catch (error) {
      console.error('Error loading obtained characters', error);
      return [];
    }
  }

  RankingByCapturedCharacters() {
    // Contar cuantas veces aparece el usuario en la lista de capturados
    const count: { [key: string]: number } = {};
    this.capturedCharacters.forEach(function (i: { userId: string }) { count[i.userId] = (count[i.userId] || 0) + 1; });
    // Ordenar el objeto de mayor a menor
    const sortable = Object.entries(count).sort(([, a], [, b]) => b - a);
    return sortable;
  }

  RankingByExchangedCharacters() {
    // Contar cuantas veces aparece el usuario en la lista de intercambiados
    const count: { [key: string]: number } = {};
    this.exchangedCharacters.forEach(function (i: { userId: string }) { count[i.userId] = (count[i.userId] || 0) + 1; });
    // Ordenar el objeto de mayor a menor
    const sortable = Object.entries(count).sort(([, a], [, b]) => b - a);
    return sortable;
  }
}
