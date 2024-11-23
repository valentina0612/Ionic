import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.page.html',
  styleUrls: ['./auction.page.scss'],
})
export class AuctionPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logout();
  }

}
