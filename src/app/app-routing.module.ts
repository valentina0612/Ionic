import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'page1',
    loadChildren: () => import('./pages/page1/page1.module').then( m => m.Page1PageModule)
  },
  {
    path: 'page2/:id',
    loadChildren: () => import('./pages/page2/page2.module').then( m => m.Page2PageModule)
  },
  {
    path: 'page3/:locationName',
    loadChildren: () => import('./pages/page3/page3.module').then( m => m.Page3PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
