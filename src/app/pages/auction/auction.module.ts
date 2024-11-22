import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuctionPageRoutingModule } from './auction-routing.module';

import { AuctionPage } from './auction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionPageRoutingModule
  ],
  declarations: [AuctionPage]
})
export class AuctionPageModule {}
