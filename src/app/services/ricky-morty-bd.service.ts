import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_RM } from '../config/url.servicios';
import { map} from 'rxjs';
import { getCharacter } from 'rickmortyapi';
@Injectable({
  providedIn: 'root'
})
export class RickyMortyBdService {

  constructor(private http: HttpClient) { }

  getAllCharacters():any{
    let url = `${URL_RM}/character`;
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('Characters',res);
        return res;
      })
    );
  }

  getMoreCharacters(next_url: string):any{
  let url = `${URL_RM}/character`;
  if (next_url.length > 0){
    url = `${next_url}`
  }
  return this.http.get(url, {}).pipe(
    map((res: any) => {
      console.log('PERSONAJES_RK',res);
      return res;
    })
  );
}

  getAllLocations():any{
    let url = `${URL_RM}/location`;
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('LOCATIONS_RK',res);
        return res;
      })
    );
  }
  
  getCharacter(id: any):any{
    let url = `${URL_RM}/character/${id}`;
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('Character',res);
        return res;
      })
    );
  }

  async getCharactersByLocation(name:any, allCharacters:any){
    let charactersOrigin: any[] = []
    await this.getAllCharacters().toPromise().then((res: any) => {
      allCharacters = res.results
    })
    for (let character of allCharacters) {
      if(character.origin.name === name){
        charactersOrigin.push(character)
      }
    }
    return charactersOrigin
  }

  getMoreLocations(next_url: string){
    let url = `${URL_RM}/location`;
    if (next_url.length > 0){
      url = `${next_url}`
    }
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('LOCATIONS_RK',res);
        return res;
      })
    );
  }


}
