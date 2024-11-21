import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //Variable donde vamos a colocar los characters.
  characters:any[] = [];
  url_next: string = '';  

  //La injeccion del servicio para traer los datos
  constructor(private bd: RickyMortyBdService) {


  }

  ngOnInit() {
     //Aqui realizo la carga real de los characters, despues que toda la pagina
     //ha sido cargada
     this.loadCharacters();  
  }


  //El metodo que va a cargar los characters
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
  }
  async loadNextCharacters() {
    await this.bd.getMoreCharacters(this.url_next).toPromise().then((resp: any) => {
      let newCharacters = resp.results;
      this.characters.push(...newCharacters);
      this.url_next = resp.info.next;
      console.log("All_Characters",this.characters);
      console.log("URL_NEXT",this.url_next);
    }
    );
  }

  onSearchInput(event: any) {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue === '') {
      this.loadCharacters();
      return;
    }
    this.characters = this.characters.filter(character =>
      character.name.toLowerCase().includes(searchValue)
    );
    return;
  }

  onIonInfinite(ev: any) {
    this.loadNextCharacters();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
