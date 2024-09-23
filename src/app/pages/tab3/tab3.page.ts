import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  favoriteCharacters: any[]=[];
  
  constructor( public router:Router, private storageService: StorageService) {}

  async ngOnInit() {
    await this.storageService.init()
    this.loadLikedCharacters();
  }
  
  async loadLikedCharacters(){
      this.favoriteCharacters = this.storageService.localCharacters
  }
}
