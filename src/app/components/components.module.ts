import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { CharacterComponent } from "./character/character.component";
import { CharactersComponent } from "./characters/characters.component";
import { LocationsComponent } from "./locations/locations.component";
import { MapComponent } from "./map/map.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CharacterComponent, CharactersComponent, LocationsComponent, MapComponent],
  imports: [CommonModule, IonicModule],
  exports: [CharacterComponent, CharactersComponent, LocationsComponent, MapComponent],
})
export class ComponentsModule {}