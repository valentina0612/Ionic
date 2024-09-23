import { Component, OnInit } from '@angular/core';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit {
  characters: any[] = []
  search: any;
  
  constructor(private bd: RickyMortyBdService) { }

  ngOnInit() {
    this.getCharacters()
  }

  async getCharacters(){
    await this.bd.getAllCharacters().toPromise().then((res: any) => {
      this.characters = res.results
    })
  }

  onSearchInput(event: any) {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue === '') {
      this.getCharacters();
      return;
    }
    this.characters = this.characters.filter(character =>
      character.name.toLowerCase().includes(searchValue)
    );
  }

}
