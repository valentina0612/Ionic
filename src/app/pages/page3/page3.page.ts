import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.page.html',
  styleUrls: ['./page3.page.scss'],
})
export class Page3Page implements OnInit {
  locationName!: string
  characters!:any[]
  url_next: string = '';
  show: boolean = false;
  constructor(private activatedRoute:ActivatedRoute, private bd: RickyMortyBdService) { 
    this.activatedRoute.params.subscribe(params => {
      this.locationName = params['locationName'];
      console.log('locationId', this.locationName);
    });
  }

  ngOnInit() {
    this.loadCharacters();
  }

  async loadCharacters() {
    await this.bd
      .getAllCharacters()
      .toPromise()
      .then((resp: any) => {
        //Aqui se realiza la asignacion de los characters de la respuesta
        this.characters = resp.results;
        this.url_next = resp.info.next
        console.log("All_Characters",this.characters);
        console.log("URL_NEXT",this.url_next);
      });
      if(this.url_next){
        this.loadNextCharacters();
      }
  }
  async loadNextCharacters() {
    await this.bd.getMoreCharacters(this.url_next).toPromise().then((resp: any) => {
      let newCharacters = resp.results;
      this.characters.push(...newCharacters);
      this.url_next = resp.info.next;
      console.log("All_Characters",this.characters);
      console.log("URL_NEXT",this.url_next);
      if(this.url_next){
        this.loadNextCharacters();
      }
      else{
        this.loadCharactersLocation();
      }
    }
    );
  }

  async loadCharactersLocation() {
    console.log('locationName', this.locationName);
    this.characters = await this.bd.getCharactersByLocation(this.locationName, this.characters);
    console.log('Characters', this.characters);
    this.show = true;
  }
}
