import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeAuctionsPageRoutingModule } from './see-auctions-routing.module';

import { SeeAuctionsPage } from './see-auctions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeAuctionsPageRoutingModule
  ],
  declarations: [SeeAuctionsPage]
})
export class SeeAuctionsPageModule {}
