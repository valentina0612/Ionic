import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuctionService } from 'src/app/services/auction.service';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.page.html',
  styleUrls: ['./auction.page.scss'],
})
export class AuctionPage implements OnInit {

  scannedCharacters: any[] = [];
  desiredCharacters: any[] = [];
  selectedScannedCharacter : any;
  selectedDesiredCharacter : any;

  constructor(private authService: AuthService, private auctionService: AuctionService) { }

  ngOnInit() {
  }

  async loadAuction(){
    try{
      this.scannedCharacters = await this.auctionService.getAuctionsByCreator(this.authService.idUserLogged());
      this.desiredCharacters = await this.auctionService.getAvailableAuctions();
    }catch (error){
      console.error('Error loading auctions', error);
    }
  }

  async proposeExchange(){
    if(this.selectedScannedCharacter && this.selectedDesiredCharacter){
      try{
        const auctionData = {
          character1Id : this.selectedScannedCharacter.id,
          character2Id : this.selectedDesiredCharacter.id,
          auctionCreator : this.authService.idUserLogged()
        };
        const response = await this.auctionService.exchangeCharacters(auctionData,this.authService.idUserLogged() ); 
        console.log('Exchange proposed successfully:', response);
        await this.loadAuction();
      }catch (error) {
        console.error('Error proposing exchange', error);
      }
    } else{
      alert('Selecciona ambos personajes para el intercambio.');
    }
  }

  logOut() {
    this.authService.logout();
  }

}
