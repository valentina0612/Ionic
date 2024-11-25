import { Component, Input, OnInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: any;
  @Input() markers: any[] = [];

   ngOnDestroy() {
    this.map.remove();
  }

  IonViewWillLeave() {
    this.map.remove();
  }

  async ngOnInit() {
    await this.initializeMap();
  }

async initializeMap() {
  this.map = await GoogleMap.create({
    id: 'my-map', // ID del mapa
    element: document.getElementById('map') as HTMLElement, // Referencia al elemento HTML donde se renderiza el mapa
    apiKey: 'AIzaSyBcMpK8lzktz7_LtsldytZEVH9uhBPSnBg', // Tu clave de API de Google Maps
    config: {
      center: {
        lat: 3.4514,
        lng: -76.5320,
      },
      zoom: 10,
    },
  });
  await this.loadMarkers();
}
  async addMarker(position: { lat: number; lng: number }, title?: string, snippet?: string) {
    const marker = await this.map.addMarker({
      coordinate: position,
      title: title,
      snippet: snippet,
    });
  }
  async loadMarkers() {
    this.markers.forEach(async (marker) => {
      await this.addMarker(marker.coordinate, marker.title, marker.snippet);
    });
}

}


