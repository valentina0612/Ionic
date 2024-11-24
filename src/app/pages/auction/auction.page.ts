import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuctionService } from 'src/app/services/auction.service';
import { StorageService } from 'src/app/services/storage.service';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { range } from 'rxjs';


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
  avaliableAuctions: any[] = [];

  constructor(private authService: AuthService, private auctionService: AuctionService, private storage: StorageService, private bd: RickyMortyBdService) { }

  async ngOnInit() {
    await this.storage.init();
    await this.loadAuction();
    this.loadDesiredCharacter();
    console.log('Auctions:', this.avaliableAuctions);
    console.log('Desired Characters:', this.desiredCharacters);
    console.log('Scanned Characters:', this.scannedCharacters);
  }

  loadDesiredCharacter(){
    this.desiredCharacters = this.storage.localCharacters;
    this.desiredCharacters = this.desiredCharacters.filter(character => {
      return !this.scannedCharacters.find(scannedCharacter => scannedCharacter.characterId === character.id);
    });
  }


  async loadAuction(){
    try{
      this.scannedCharacters = this.storage.scannedCharacters;
      for (let i = 0; i < this.scannedCharacters.length; i++) {
        this.scannedCharacters[i] = await this.bd.getCharacter(this.scannedCharacters[i].characterId).toPromise();
      }
      this.avaliableAuctions = await this.auctionService.getAuctions();
    }catch (error){
      console.error('Error loading auctions', error);
    }
  }

  async exchange(auction: any){
    try{
      await this.auctionService.exchangeCharacters(auction, this.authService.idUserLogged());
      await this.loadAuction();
    }catch (error){
      console.error('Error saving auction', error);
    }
  }

  async saveAuction(){
    if(this.selectedScannedCharacter && this.selectedDesiredCharacter){
      const userId = this.authService.idUserLogged();
      try{
        const auctionData = {
          character1Id : this.selectedScannedCharacter.id,
          character2Id : this.selectedDesiredCharacter.id,
          auctionCreator : {_id: userId}
        };
        console.log('Auction data:', auctionData);
        const response = await this.auctionService.createAuction(auctionData); 
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
