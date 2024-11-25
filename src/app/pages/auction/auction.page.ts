import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuctionService } from 'src/app/services/auction.service';
import { StorageService } from 'src/app/services/storage.service';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { range } from 'rxjs';
import { AlertController } from '@ionic/angular';


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
  auctions: any[] = [];

  constructor(private authService: AuthService, private auctionService: AuctionService, private storage: StorageService, private bd: RickyMortyBdService, private alertController: AlertController) { }

  async ngOnInit() {
    await this.storage.init();
    // Suscribir a las actualizaciones de las subastas
    this.auctionService.auctions$.subscribe((auctions) => {
      this.auctions = auctions;
      console.log('Updated auctions:', this.auctions);
    });
    await this.auctionService.getAuctions();
    await this.loadAuction();
    this.loadDesiredCharacter();
    console.log('Desired Characters:', this.desiredCharacters);
    console.log('Scanned Characters:', this.scannedCharacters);
  }

  async showAlert(error: string, header = 'Error') {
    const alert = await this.alertController.create({
      header: header,
      subHeader: error,
      buttons: ['OK'],
    });
    await alert.present();
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
    }catch (error){
      console.error('Error loading auctions', error);
    }
  }

  async saveAuction(){
    if(this.selectedScannedCharacter && this.selectedDesiredCharacter){
      const userId = this.authService.idUserLogged();
      try{
        const auctionData = {
          character1Id : this.selectedScannedCharacter.id,
          character2Id : this.selectedDesiredCharacter.id,
          auctionCreator : {_id: userId},
          creatorId: userId
        };
        const response = await this.auctionService.createAuction(auctionData); 
        await this.auctionService.getAuctions();
        if(response){
          this.showAlert('Exchange proposed successfully', 'Success');
        }
        else{
          this.showAlert('Error proposing exchange. It is possible you have an active auction');
        }
      }catch (error) {
        this.showAlert(error as string);
      }
    } else{
      this.showAlert('You must select a character to exchange and a desired character');
    }
  }

  logOut() {
    this.authService.logout();
  }

}
