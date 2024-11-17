import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Page1PageRoutingModule } from './page1-routing.module';
import { Page1Page } from './page1.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Page1PageRoutingModule,
    ComponentsModule
],
  declarations: [Page1Page],
})
export class Page1PageModule {}
