import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent  implements OnInit {

  @Input() characters: any[] = [];
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';

  constructor( public router:Router, private storageService: StorageService) {}

  ngOnInit() {
  }


  goToCharacterDetail(idPersonaje: number) {
    console.log('idPersonaje', idPersonaje);
    this.router.navigate([`/page2/${idPersonaje}`]);
  }

  // Método para verificar si un personaje está "liked"
  isLiked(character:any): boolean {
    if (this.storageService.characterInFavorites(character)) {
      return true;
    }else{
      return false;
    }
  }

  addFavorite(character: any) {
    console.log('addFavorite', character);
    this.storageService.addOrRemoveCharacter(character, "6738d70fefc164b18d39b28b");
  }

}
