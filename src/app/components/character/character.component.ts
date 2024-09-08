import { Component, Input, OnInit } from '@angular/core';
import { Character, getCharacters } from 'rickmortyapi';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  @Input() character: any;

  constructor() {}

  ngOnInit() {
  }

}
