import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeAuctionsPage } from './see-auctions.page';

const routes: Routes = [
  {
    path: '',
    component: SeeAuctionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeAuctionsPageRoutingModule {}
