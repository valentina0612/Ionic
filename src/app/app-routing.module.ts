import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [authGuard],
  },
  {
    path: 'page1',
    loadChildren: () => import('./pages/page1/page1.module').then( m => m.Page1PageModule),
    canActivate: [authGuard],
  },
  {
    path: 'page2/:id',
    loadChildren: () => import('./pages/page2/page2.module').then( m => m.Page2PageModule),
    canActivate: [authGuard],
  },
  {
    path: 'page3/:locationName',
    loadChildren: () => import('./pages/page3/page3.module').then( m => m.Page3PageModule),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./pages/create-user/create-user.module').then( m => m.CreateUserPageModule)
  },
  {
    path: 'auction',
    loadChildren: () => import('./pages/auction/auction.module').then( m => m.AuctionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
