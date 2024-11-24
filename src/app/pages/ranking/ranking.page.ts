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
    this.rankingCaptured= await this.rankingService.getCapturedCharacters();
    this.rankingExchanged = await this.rankingService.getExchangedCharacters();
    console.log('Ranking exchanged', this.rankingExchanged);
    console.log('Ranking captured', this.rankingCaptured);
  }

}
