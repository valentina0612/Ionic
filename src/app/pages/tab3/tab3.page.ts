import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userFavoriteCharacters: any[] = [];
  favoriteCharacters: any[]=[];

  constructor( public router:Router, private storageService: StorageService, private bd: RickyMortyBdService) {}

  async ngOnInit() {
    await this.storageService.init()
    await this.loadLikedCharacters();
  }
  
  async loadLikedCharacters(){
      this.userFavoriteCharacters = await this.storageService.loadFavoriteCharacters('6738d71defc164b18d39b28d')
        for (let character of this.userFavoriteCharacters) {
          console.log('character', character);
          let characterId = character.characterId;
          try {
            let characterInfo = await this.bd.getCharacter(characterId).toPromise();
            this.favoriteCharacters.push(characterInfo);
          } catch (error) {
            console.error('Error al obtener la información del personaje', characterId, error);
          }
        }
      } 
    }