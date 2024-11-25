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
  avaliableAuctions: any[] = [] ;
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
      // Obtener las subastas disponibles
      const response = await this.auctionService.getAvailableAuctions();
      
      // Verifica si la propiedad 'auction' existe y es un arreglo
      this.avaliableAuctions = Array.isArray(response.auction) ? response.auction : [];
      
      if (this.avaliableAuctions.length === 0) {
        this.showAlert('There are no available auctions.');
        return;
      }
  
      // Procesar los datos de los personajes
      this.avaliableAuctions = await Promise.all(
        this.avaliableAuctions.map(async (auction) => {
          const [character1, character2] = await Promise.all([
            this.bd.getCharacter(auction.character1Id).toPromise(),
            this.bd.getCharacter(auction.character2Id).toPromise(),
          ]);
          return { ...auction, character1, character2 };
        })
      );
  
    
    } catch (error) {
      console.error('Error loading auctions', error);
      this.showAlert('An error occurred while loading auctions.');
    }
  }
  

  async exchange(auction: any){
    console.log('exchange', auction);
    try{
      const response = await this.auctionService.exchangeCharacters(auction, this.authService.idUserLogged());
      if (response){
        this.showAlert('Characters exchanged successfully.');
        this.loadAuction();
      }
      else{
        this.showAlert('Error exchanging characters.');
      }
    }catch (error){
      this.showAlert('Error exchanging characters.');
    }
  }

}
