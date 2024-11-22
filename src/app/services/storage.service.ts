import { Injectable } from '@angular/core';
import { FavoriteDto } from '../model/favorite.dto';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiURLBack = 'https://backendrickymorty.onrender.com/api';
  private _localCharacters: FavoriteDto[] = [];
  private _storage: Storage | null = null;
  private _scannedCharacters: {character: any, coords:{lat:any,lng:any}, date: any, time:any}[] = [];

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = this.storage;
    await this.loadScannedCharacters();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  get localCharacters(): FavoriteDto[] {
    return this._localCharacters;
    
  }

  get scannedCharacters(): any[] {
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

  async loadScannedCharacters() {
    try{
      const characters = await this._storage?.get('scannedCharacters');
      this._scannedCharacters = characters || [];
      console.log( "local", this._localCharacters)
    } catch (error) {
      console.error('Error loading characters', error);
    }
  }

  addOrRemoveScannedCharacter(character: any) {
    const exits = this._scannedCharacters.find((localChar: any) => localChar.id === character.id);
    if (!exits) {
      this._scannedCharacters = [character, ...this._scannedCharacters];
    }
    this._storage?.set('scannedCharacters', this._scannedCharacters);
  }

  characterScanned(character: any) {
    return this._scannedCharacters.find((localChar: any) => localChar.id === character.id);
  }
  
  characterInFavorites(characterId: number) : FavoriteDto | undefined {
    return this._localCharacters.find((localChar: any) => localChar.id === characterId);
  }

  async addOrRemoveCharacter(characterId: number, userId: string) {
    try{
      const exists = this.characterInFavorites(characterId);
      if (exists) {
        // Eliminar el favorito
        await this.http.delete(`${this.apiURLBack}/Favorite/${userId}`).toPromise();
        this._localCharacters = this._localCharacters.filter((char) => char.characterId != characterId);
      } else {
        // Agregar el favorito
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