import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/url.servicios';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient, private storage: StorageService) { }
  apiURLAuctions = `${URL_SERVICIOS}/Auction`;
  apiObtainedCharacters = `${URL_SERVICIOS}/Obtained`;
  apiURLUsers = `${URL_SERVICIOS}/User`;

  private auctionsSubject = new BehaviorSubject<any[]>([]);
  auctions$ = this.auctionsSubject.asObservable();

  async getAuction(auctionId: string) {
    try {
      const response = await this.http.get<any>(`${this.apiURLAuctions}/${auctionId}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error loading auction', error);
    }
  }

  async updateAuction(auction: any) {
    try {
      const response = await this.http.put<any>(`${this.apiURLAuctions}`, auction).toPromise();
      return response;
    } catch (error) {
      console.error('Error updating auction', error);
    }
  }

  async deleteAuction(auctionId: string) {
    try {
      const response = await this.http.delete<any>(`${this.apiURLAuctions}/${auctionId}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error deleting auction', error);
    }
  }

  async getAuctions() {
    try {
      const response = await this.http.get<any>(`${this.apiURLAuctions}`).toPromise();
      this.auctionsSubject.next(response);
      return response;
    } catch (error) {
      console.error('Error loading auctions', error);
    }
  }

  async createAuction(auction: any) {
    try {
      const response = await this.http.post<any>(`${this.apiURLAuctions}`, auction).toPromise();
      return response;
    } catch (error) {
      console.error('Error creating auction', error);
    }
  }

  async getAuctionsByAcquirer(userId: string) {
    try {
      const response = await this.http.get<any>(`${this.apiURLAuctions}/acquirer/${userId}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error loading auctions by user', error);
    }
  }

  async getAuctionsByCreator(userId: string) {
    try {
      const response = await this.http.get<any>(`${this.apiURLAuctions}/creator/${userId}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error loading auctions by user', error);
    }
  }

  async getAvailableAuctions() {
    try {
      const response = await this.http.get<any>(`${this.apiURLAuctions}/completed/false`).toPromise();
      return response;
    } catch (error) {
      console.error('Error loading available auctions', error);
    }
  }

  async getCompletedAuctions() {
    try {
      const response = await this.http.get<any>(`${this.apiURLAuctions}/completed/true`).toPromise();
      return response;
    } catch (error) {
      console.error('Error loading completed auctions', error);
    }
  }

  async exchangeCharacters(auction: any, acquirerId: string) {
    console.log('exchangeCharacters', auction._id);
    try {
      let updateAuction = {
        _id: auction._id,
        character1Id: auction.character1Id,
        character2Id: auction.character2Id,
        acquirer: {_id: acquirerId},
        creatorId : auction.creatorId,
      };
      
      await this.updateAuction(updateAuction);
      console.log('updateAuction', updateAuction);
      const response = await this.http.post<any>(`https://backendrickymorty.onrender.com/api/Auction/exchange`, updateAuction).toPromise();
      this.storage.init();
      // Recargar las subastas después de un intercambio exitoso
      this.getAuctions();
      return response;
    } catch (error) {
      console.error('Error exchanging characters', error);
    }
  }

}
