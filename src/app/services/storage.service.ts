import { Injectable } from '@angular/core';
import { FavoriteDto } from '../model/favorite.dto';
import { ObtainedDto } from '../model/obtained.dto';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiURLBack = 'https://backendrickymorty.onrender.com/api';
  private _localCharacters: FavoriteDto[] = [];
  private _scannedCharacters: ObtainedDto[] = [];

  constructor(private http: HttpClient) {
    
  }

  get localCharacters(): FavoriteDto[] {
    return this._localCharacters;
    
  }

  get scannedCharacters(): ObtainedDto[] {
    return this._scannedCharacters;
  }

  async loadFavoriteCharacters(userId: string) {
    try{
      const response = await this.http.get<any>(`${this.apiURLBack}/Favorite/user/${userId}`).toPromise();
      this._localCharacters = response.favorite || [];
      console.log( "Fetched characters from backend:", this._localCharacters)
    } catch (error) {
      console.error('Error loading characters from backend', error);
    }
    return this._localCharacters;
  }

  async loadScannedCharacters(userId: string) {
    try{
      const response = await this.http.get<any>(`${this.apiURLBack}/Obtained/${userId}`).toPromise();
      this._scannedCharacters = response.map((obtained: any) => ({
        id: obtained._id,
        characterId: obtained.characterId,
        location: obtained.location,
        date: new Date(obtained.date),
        method: obtained.method,
        user: obtained.user
      }));
      console.log( "local", this._localCharacters)
    } catch (error) {
      console.error('Error loading characters', error);
    }
  }

  async addOrRemoveScannedCharacter(characterId: number, userId: string, coords?: { lat: number, lng: number }) {
    try {
      const exists = this.characterScanned(characterId);
  
      if (exists) {
        await this.http.delete(`${this.apiURLBack}/Obtained/${characterId}`).toPromise();
        this._scannedCharacters = this._scannedCharacters.filter(char => char.characterId !== characterId);
        console.log('Character removed from scanned list:', characterId);
      } else {
        if (!coords) {
          throw new Error('Coordinates are required to add a scanned character.');
        }
  
        const obtained = {
          characterId: characterId,
          date: new Date().toISOString(),
          location: coords,
          method: 'scan',
          user: { _id: userId, id: userId, username: '', firstName: '', lastName: '', email: '' },
        };
  
        const response = await this.http.post(`${this.apiURLBack}/Obtained`, obtained).toPromise();
        this._scannedCharacters = [
          {
            id: response._id,
            characterId: characterId,
            location: coords,
            date: new Date(obtained.date),
            method: obtained.method,
            user: obtained.user,
          },
          ...this._scannedCharacters,
        ];
        console.log('Character added to scanned list:', response);
      }
  
      console.log('Updated scanned characters:', this._scannedCharacters)
    } catch (error) {
      console.error('Error in addOrRemoveScannedCharacter:', error);
    }
  }
  
  characterScanned(characterId: number) : ObtainedDto | undefined {
    return this._scannedCharacters.find((localChar: any) => localChar.character.id === characterId) as ObtainedDto | undefined;
  }
  
  characterInFavorites(characterId: number) : FavoriteDto | undefined {
    return this._localCharacters.find((localChar: any) => localChar.id === characterId);
  }

  async addOrRemoveCharacter(characterId: number, userId: string) {
    try{
      const exists = this.characterInFavorites(characterId);
      if (exists) {
        await this.http.delete(`${this.apiURLBack}/Favorite/${userId}`).toPromise();
        this._localCharacters = this._localCharacters.filter((char) => char.characterId != characterId);
      } else {
        const newFavorite = await this.http
          .post<FavoriteDto>(`${this.apiURLBack}/Favorite`, { characterId, user: { _id: userId }})
          .toPromise();
        if (newFavorite) {
          this._localCharacters = [newFavorite, ...this._localCharacters];
        } else {
          throw new Error('Failed to add new favorite');
        }
        this._localCharacters = [newFavorite, ...this._localCharacters];
      }
      console.log('Updated favorites:', this._localCharacters);
    }catch(error){
      console.error('Error adding or removing character', error);
    }
  }
}