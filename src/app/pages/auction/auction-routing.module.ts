import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionPage } from './auction.page';

const routes: Routes = [
  {
    path: '',
    component: AuctionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuctionPageRoutingModule {}
