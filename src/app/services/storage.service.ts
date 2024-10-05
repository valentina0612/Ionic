import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localCharacters: any[] = [];
  private _scannedCharacters: {character: any, coords:any, timestamp:any }[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadFavoriteCharacters();
    await this.loadScannedCharacters();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  get localCharacters(): any[] {
    return this._localCharacters;
    
  }

  get scannedCharacters(): any[] {
    return this._scannedCharacters;
  }

  async loadFavoriteCharacters() {
    try{
      const characters = await this._storage?.get('favoriteCharacters');
      this._localCharacters = characters || [];
      console.log( "local", this._localCharacters)
    } catch (error) {
      console.error('Error loading characters', error);
    }
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
  
  characterInFavorites(character: any) {
    return this._localCharacters.find((localChar: any) => localChar.id === character.id);
  }

  addOrRemoveCharacter(character: any) {
    const exits = this._localCharacters.find((localChar: any) => localChar.id === character.id);
    if (exits) {
      this._localCharacters = this._localCharacters.filter((localChar: any) => localChar.id !== character.id);
    } else {
      this._localCharacters = [character, ...this._localCharacters];
    }
    this._storage?.set('favoriteCharacters', this._localCharacters);
  }
}