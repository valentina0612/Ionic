import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { StorageService } from 'src/app/services/storage.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  favoriteCharacters: any[] = [];
  private favoritesSubscription!: Subscription;

  constructor( public router:Router, private storageService: StorageService, private bd: RickyMortyBdService, private authService: AuthService) {}
  
  ngOnDestroy() {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.loadLikedCharacters();
  }
  
  loadLikedCharacters(){
    this.favoritesSubscription = this.storageService.getFavorites$().subscribe((data) => {
      this.favoriteCharacters = data;
    });
  }

  logOut() {
    this.authService.logout();
  }
}