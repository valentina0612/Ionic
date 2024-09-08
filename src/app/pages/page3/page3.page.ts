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
  constructor(private activatedRoute:ActivatedRoute, private bd: RickyMortyBdService) { 
    this.activatedRoute.params.subscribe(params => {
      this.locationName = params['locationName'];
      console.log('locationId', this.locationName);
    });
  }

  ngOnInit() {
    this.loadCharactersLocation();
  }

  async loadCharactersLocation() {
    console.log('locationName', this.locationName);
    this.characters = await this.bd.getCharactersByLocation(this.locationName)
    console.log('Characters', this.characters);
  }
}
