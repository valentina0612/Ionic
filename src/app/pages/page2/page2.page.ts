import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.page.html',
  styleUrls: ['./page2.page.scss'],
})
export class Page2Page implements OnInit {

  characterId!:number;
  character:any;
  constructor(private activatedRoute:ActivatedRoute, private bd: RickyMortyBdService, private authService: AuthService, private storageService: StorageService) { 
    this.activatedRoute.params.subscribe(params => {
      this.characterId = params['id'];
      console.log('characterId', this.characterId);
    });
  }

  ngOnInit() {
    this.loadCharacter();
  }

  async loadCharacter() {
    await this.bd.getCharacter(this.characterId).toPromise().then((resp: any) => {
      this.character = resp;
    });
  }

  logOut() {
    this.authService.logout();
  }
}
