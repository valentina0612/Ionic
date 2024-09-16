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
  likedPersonajes: Set<number> = new Set<number>();
  constructor( public router:Router) {}

  ngOnInit() {

  }
  goToCharacterDetail(idPersonaje: number) {
    console.log('idPersonaje', idPersonaje);
    this.router.navigate([`/page2/${idPersonaje}`]);
  }
  // Método para alternar el estado de "like" de un personaje
  toggleLike(id: number) {
    if (this.likedPersonajes.has(id)) {
      this.likedPersonajes.delete(id);
    } else {
      this.likedPersonajes.add(id);
    }
    console.log('IDPERSONAJE:', id);
  }

  // Método para verificar si un personaje está "liked"
  isLiked(id: number): boolean {
    return this.likedPersonajes.has(id);
  }
}
