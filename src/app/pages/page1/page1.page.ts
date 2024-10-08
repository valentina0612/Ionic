import { Component, OnInit } from '@angular/core';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit {
  characters: { character: any, coords: any, timestamp: any }[] = [];
  isSupported = false;
  barcodes: Barcode[] = [];
  coordinates: any;
  
  constructor(private bd: RickyMortyBdService, private alertController: AlertController, private storageService: StorageService) { }

  async ngOnInit() {
    await this.getScannedCharacters();
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
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
      const coords = await this.locate();
      const scannedCharacter = { character: res, coords: coords.coords, timestamp: coords.timestamp };
      this.characters.push(scannedCharacter);
      this.storageService.addOrRemoveScannedCharacter(scannedCharacter);
    });
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
  }

}
