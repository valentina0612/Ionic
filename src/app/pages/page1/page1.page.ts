import { Component, OnInit } from '@angular/core';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Geolocation } from '@capacitor/geolocation';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs'

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
  private scanned!: Subscription;
  private exchanged!: Subscription;
  
  constructor(private bd: RickyMortyBdService, private alertController: AlertController, private storageService: StorageService, private cdr: ChangeDetectorRef, private authService: AuthService) { }

  ngOnDestroy() {
    if (this.scanned) {
      this.scanned.unsubscribe();
    }
    if (this.exchanged) {
      this.exchanged.unsubscribe();
    }
  }

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
    try {
      // Suscripción al observable para obtener personajes escaneados
      this.scanned = this.storageService.getScannedCharacters$().subscribe((data: any[]) => {
        this.characters = data; 
      });
  
      // Obtén los personajes almacenados directamente
      this.characters = this.storageService.scannedCharacters;
  
      // Itera sobre los personajes y obtén su información
      for (let character of this.characters) {
        await this.updateCharacterData(character);
      }
  
      console.log('Markers', this.markers);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error fetching scanned characters:', error);
    }
  }
  
  private async updateCharacterData(character: any) {
    try {
      const res: any = await this.bd.getCharacter(character.characterId).toPromise();
  
      character.character = res;
      character.date = new Date(character.date).toISOString().split('T')[0];
  
      this.markers.push({
        coordinate: character.location,
        title: res.name,
        snippet: character.date,
      });
    } catch (error) {
      console.error(`Error updating character data for ID ${character.characterId}:`, error);
    }
  }
  

  async getExchangedCharacters() {
    try {
      // Suscripción al observable para obtener personajes intercambiados
      this.storageService.getExchangedCharacters$().subscribe((data) => {
        this.exchangeCharacters = data;
        this.processExchangedCharacters(); // Procesa los datos recibidos
        this.cdr.detectChanges();
      });
    } catch (error) {
      console.error('Error fetching exchanged characters:', error);
    }
  }
  
  private async processExchangedCharacters() {
    try {
      for (let character of this.exchangeCharacters) {
        await this.updateExchangedCharacterData(character);
      }
    } catch (error) {
      console.error('Error processing exchanged characters:', error);
    }
  }
  
  private async updateExchangedCharacterData(character: any) {
    try {
      const res: any = await this.bd.getCharacter(character.characterId).toPromise();
  
      character.character = res;
      character.date = new Date(character.date).toISOString().split('T')[0];
    } catch (error) {
      console.error(`Error updating exchanged character data for ID ${character.characterId}:`, error);
    }
  }
  

  logOut() {
    this.authService.logout();
  }
  


}
