import { Component } from '@angular/core';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  locations:any[] = [];

  constructor(private bd:RickyMortyBdService) {

  }
  ngOnInit() {
    this.cargarLocations();
  }
  
  async cargarLocations() {
    await this.bd
      .getAllLocations()
      .toPromise()
      .then((resp: any) => {
        this.locations = resp.results;
        console.log("MISLOCATIONS",this.locations);
      });
  }
}


