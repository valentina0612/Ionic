import { Injectable } from '@angular/core';
import { FavoriteDto } from '../model/favorite.dto';
import { ObtainedDto } from '../model/obtained.dto';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { URL_SERVICIOS } from '../config/url.servicios';
import { AuthService } from './auth.service';
import { RickyMortyBdService } from './ricky-morty-bd.service';
import { UserService } from './user.service';
import { UserDto } from '../model/user.dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiURLBack = URL_SERVICIOS;
  private _localCharacters: FavoriteDto[] = [];
  private _scannedCharacters: ObtainedDto[] = [];
  private _storage: Storage | null = null;
  private favoriteSubject: BehaviorSubject<FavoriteDto[]> = new BehaviorSubject<FavoriteDto[]>([]);

  constructor(private http: HttpClient, private storage: Storage, private authService: AuthService, private bd: RickyMortyBdService, private userService: UserService) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = this.storage;
    await this.loadFavoriteCharacters(this.authService.idUserLogged());
    await this.loadScannedCharacters(this.authService.idUserLogged());
  }


  get localCharacters(): FavoriteDto[] {
    return this._localCharacters;
    
  }

  get scannedCharacters(): ObtainedDto[] {
    return this._scannedCharacters;
  }

  getFavorites$(): Observable<FavoriteDto[]> {
    return this.favoriteSubject.asObservable();
  }

  private updateFavoritesSubject() {
    this.favoriteSubject.next(this._localCharacters);
  }

  async loadFavoriteCharacters(userId: string) {
    try{
      const response = await this.http.get<any>(`${this.apiURLBack}/Favorite/user/${userId}`).toPromise();
      this._localCharacters = response.favorite || [];
      for (let i = 0; i < this._localCharacters.length; i++) {
          const favorite = this._localCharacters[i];
          const character = await this.bd.getCharacter(favorite.characterId).toPromise();
          this._localCharacters[i]= character;
      }
      console.log( "Fetched characters from backend:", this._localCharacters)
      this.updateFavoritesSubject();
    } catch (error) {
      console.error('Error loading characters from backend', error);
    }
    return this._localCharacters;
  }

  async loadScannedCharacters(userId: string) {
    try{
      const response = await this.http.get<any>(`${this.apiURLBack}/Obtained/${userId}`).toPromise();
      console.log('Response from backend:', response);
      this._scannedCharacters = response.obtained.map((obtained: any) => ({
        id: obtained._id,
        characterId: obtained.characterId,
        location: obtained.location,
        date: new Date(obtained.date),
        method: obtained.method,
        user: obtained.user
      }));
      console.log( "Obtained characters", this._scannedCharacters)
    } catch (error) {
      console.error('Error loading characters', error);
    }
  }


  async addScannedCharacter(characterId: number, userId: string, coords?: { lat: number, lng: number }) {
    console.log('Adding scanned character:', characterId);
    try {
      const exists = this.characterScanned(characterId);
      if (exists) {
        console.log('You alredy have this character:', characterId);
      } else {
        if (!coords) {
          throw new Error('Coordinates are required to add a scanned character.');
        }
  
        const obtained = {
          characterId: characterId,
          location: coords,
          method: 'captured',
          user: { _id: userId },
        };
        console.log('Adding new character:', obtained);
        const response = await this.http.post<any>(`${this.apiURLBack}/Obtained`, obtained).toPromise();
        const user = await this.http.get<UserDto>(`${this.apiURLBack}/User/find/${userId}`).toPromise();
        if (user) {
          this._scannedCharacters = [
            {
              id: response._id,
              characterId: characterId,
              location: coords,
              method: obtained.method,
              user: user,
            },
            ...this._scannedCharacters,
          ];
        } else {
          throw new Error('User not found');
        }
        console.log('Character added to scanned list:', response);
      }
  
      console.log('Updated scanned characters:', this._scannedCharacters)
    } catch (error) {
      console.error('Error in addOrRemoveScannedCharacter:', error);
    }
  }
  
  characterScanned(characterId: number){
    return this._scannedCharacters.find((localChar: any) => localChar.characterId === characterId) as ObtainedDto | undefined;
  }
  
  characterInFavorites(characterId: number) : FavoriteDto | undefined {
    return this._localCharacters.find((localChar: any) => localChar.id === characterId);
  }

  async addOrRemoveCharacter(characterId: number, userId: string) {
    try{
      const exists = this.characterInFavorites(characterId);
      if (exists) {
        await this.http.delete(`${this.apiURLBack}/Favorite/${characterId}/${userId}`).toPromise();
      } else {
        const newFavorite = await this.http
          .post<FavoriteDto>(`${this.apiURLBack}/Favorite`, { characterId, user: { _id: userId }})
          .toPromise();
        if (newFavorite) {
          this._localCharacters = await this.loadFavoriteCharacters(userId);
        } else {
          throw new Error('Failed to add new favorite');
        }
      }
      console.log('Updated favorites:', this._localCharacters);
      this._localCharacters = await this.loadFavoriteCharacters(userId);
      this.updateFavoritesSubject();
    }catch(error){
      console.error('Error adding or removing character', error);
    }
  }
}