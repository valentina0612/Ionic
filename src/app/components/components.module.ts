import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { CharacterComponent } from "./character/character.component";
import { CharactersComponent } from "./characters/characters.component";
import { LocationsComponent } from "./locations/locations.component";

@NgModule({
  declarations: [CharacterComponent, CharactersComponent, LocationsComponent],
  imports: [CommonModule, IonicModule],
  exports: [CharacterComponent, CharactersComponent, LocationsComponent]
})
export class ComponentsModule {}