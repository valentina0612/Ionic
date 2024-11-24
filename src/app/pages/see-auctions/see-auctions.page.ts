import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuctionService } from 'src/app/services/auction.service';
import { AuthService } from 'src/app/services/auth.service';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-see-auctions',
  templateUrl: './see-auctions.page.html',
  styleUrls: ['./see-auctions.page.scss'],
})
export class SeeAuctionsPage implements OnInit {
  avaliableAuctions: any[] = [];
  loggedUserId: string = this.authService.idUserLogged();
  constructor(private authService: AuthService, private auctionService: AuctionService, private storage: StorageService, private bd: RickyMortyBdService, private alertControler: AlertController) { }

  ngOnInit() {
    this.loadAuction();
  }

  async showAlert(error: string) {
    const alert = await this.alertControler.create({
      header: 'Error',
      subHeader: error,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async loadAuction() {
    try {
      let auctions = await this.auctionService.getAvailableAuctions();
      
      // Convertir un objeto en un array si no es ya un array
      this.avaliableAuctions = Array.isArray(auctions) ? auctions : [auctions];
  
      // Procesar los datos de los personajes
      for (let i = 0; i < this.avaliableAuctions.length; i++) {
        this.avaliableAuctions[i].auction.startDate = new Date(this.avaliableAuctions[i].auction.startDate);
        this.avaliableAuctions[i].character1 = await this.bd.getCharacter(this.avaliableAuctions[i].auction.character1Id).toPromise();
        this.avaliableAuctions[i].character2 = await this.bd.getCharacter(this.avaliableAuctions[i].auction.character2Id).toPromise();
      }
    } catch (error) {
      console.error('Error loading auctions', error);
    }
  }

  async exchange(auction: any){
    console.log('exchange', auction);
    try{
      await this.auctionService.exchangeCharacters(auction, this.authService.idUserLogged());
    }catch (error){
      this.showAlert('Error exchanging characters.');
    }
  }

}
