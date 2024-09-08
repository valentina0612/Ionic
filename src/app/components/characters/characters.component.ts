import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent  implements OnInit {

  @Input() characters: any[] = [];
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  constructor( public router:Router) {}

  ngOnInit() {

  }
  goToCharacterDetail(idPersonaje: number) {
    console.log('idPersonaje', idPersonaje);
    this.router.navigate([`/page2/${idPersonaje}`]);
  }
}
