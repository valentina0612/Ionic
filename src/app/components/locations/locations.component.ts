import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent  implements OnInit {
  @Input() locations:any[]=[]

  constructor(public router:Router) { }

  ngOnInit() {}

  charactersLocationOirigin(locationName:string){
    this.router.navigate([`/page3/${locationName}`]);
  }
}
