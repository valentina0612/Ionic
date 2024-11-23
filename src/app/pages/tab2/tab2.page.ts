import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  locations:any[] = [];
  next_url: string = '';
  constructor(private bd:RickyMortyBdService, private authService: AuthService) {

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

  async loadNextLocations() {
    await this.bd.getMoreLocations(this.next_url).toPromise().then((resp: any) => {
      let newLocations = resp.results;
      this.locations.push(...newLocations);
      this.next_url = resp.info.next;
      console.log("All_Locations",this.locations);
      console.log("URL_NEXT",this.next_url);
      if(this.next_url){
        this.loadNextLocations();
      }
    }
    );
  }

  onIonInfinite(ev: any) {
    this.loadNextLocations();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  logOut() {
    this.authService.logout();
  }


}

