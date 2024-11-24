import { Component, OnInit } from '@angular/core';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Geolocation } from '@capacitor/geolocation';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit {
  characters: any[] = [];
  exchangeCharacters: any[] = [];
  isSupported = false;
  barcodes: Barcode[] = [];
  coordinates: any;
  markers: any[] = [];
  coords: any;
  
  constructor(private bd: RickyMortyBdService, private alertController: AlertController, private storageService: StorageService, private cdr: ChangeDetectorRef, private authService: AuthService) { }

  async ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    await this.getScannedCharacters();
    await this.getExchangedCharacters();
    this.coords = await this.locate();
  }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
    
}


  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    this.convertBarcodeToCharacter(this.barcodes[this.barcodes.length - 1]);
  }

  async convertBarcodeToCharacter(barcode: Barcode) {
    this.bd.findCharacterByURL(barcode.displayValue).toPromise().then(async (res: any) => {
      console.log('Character',res);
      await this.saveCharacter(res);
    });
  }

  async saveCharacter(character: any) {
    const coords = {lat: this.coords.coords.latitude, lng:this.coords.coords.longitude};
    await this.storageService.addScannedCharacter(character.id, this.authService.idUserLogged(), coords);
    this.getScannedCharacters();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async getScannedCharacters() {
    this.characters = this.storageService.scannedCharacters;
    for (let i = 0; i < this.characters.length; i++) {
      const character = this.characters[i];
      this.bd.getCharacter(character.characterId).toPromise().then((res: any) => {
        this.characters[i].character = res;
        this.characters[i].date = this.characters[i].date.toISOString().split('T')[0];
        this.markers.push({coordinate: character.location, title: res.name, snippet: this.characters[i].date});
      }
      );
    }
    console.log('Markers', this.markers);
  }

  async getExchangedCharacters() {
    this.exchangeCharacters = this.storageService.exchangedCharacters;
    for (let i = 0; i < this.exchangeCharacters.length; i++) {
      const character = this.exchangeCharacters[i];
      this.bd.getCharacter(character.characterId).toPromise().then((res: any) => {
        this.exchangeCharacters[i].character = res;
        this.exchangeCharacters[i].date = this.exchangeCharacters[i].date.toISOString().split('T')[0];
      }
      );
    }
  }

  logOut() {
    this.authService.logout();
  }
  


}
