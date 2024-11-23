import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  favoriteCharacters: any[]=[];

  constructor( public router:Router, private storageService: StorageService, private bd: RickyMortyBdService, private authService: AuthService) {}

  async ngOnInit() {
    await this.loadLikedCharacters();
  }
  
  async loadLikedCharacters(){
      this.favoriteCharacters = this.storageService.localCharacters;
    }

    logOut() {
      this.authService.logout();
    }
  }