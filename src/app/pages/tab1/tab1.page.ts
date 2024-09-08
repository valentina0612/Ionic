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


  //La injeccion del servicio para traer los datos
  constructor(private bd: RickyMortyBdService) {


  }

  ngOnInit() {
     //Aqui realizo la carga real de los characters, despues que toda la pagina
     //ha sido cargada
     this.cargarPersonajes();  
  }


  //El metodo que va a cargar los characters
  async cargarPersonajes() {
    //this.cargando = true;
    await this.bd
      .getAllCharacters()
      .toPromise()
      .then((resp: any) => {
        //Aqui se realiza la asignacion de los characters de la respuesta
        this.characters = resp.results;
        console.log("All_Characters",this.characters);

      });
  }

}
