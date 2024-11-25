import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RankingService } from 'src/app/services/ranking.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  rankingExchanged: any[] = [];
  rankingCaptured: any[] = [];
  constructor(private authService: AuthService, private rankingService: RankingService, private storageService: StorageService) { }

  ngOnInit() {
    this.getRanking();
  }

  logOut() {
    this.authService.logout();
  }

  async getRanking() {
   // Suscribirse a los cambios en los rankings
   this.rankingService.capturedCharacters$.subscribe((data) => {
    this.rankingCaptured = data;
    console.log('Updated captured ranking:', this.rankingCaptured);
  });

  this.rankingService.exchangedCharacters$.subscribe((data) => {
    this.rankingExchanged = data;
    console.log('Updated exchanged ranking:', this.rankingExchanged);
  });

  // Inicializar la actualización de los datos
  this.rankingService.getCapturedCharacters();
  this.rankingService.getExchangedCharacters();
  }

}
