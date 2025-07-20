import { Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { ActivityDto } from 'src/app/api-client';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnChanges {

  @Input() activity: ActivityDto;

  private map: L.Map;
  private markerLayer: L.FeatureGroup = L.featureGroup();

  ngOnInit(): void {
    if (this.map) this.map.remove()

    this.map = L.map('map', {
      center: [50.85, 4.35],
      zoom: 12
    });

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; OpenMapTiles &copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['activity']) {
      this.activity = changes['activity'].currentValue;
      if (this.map) this.updateMarkers();
      console.log(this.activity);

    }
  }

  private updateMarkers(): void {
    this.markerLayer.clearLayers();

    const coords: any[] = this.activity.location.split(' '); // ["50.1441414", "4.24353453"]

    const coord_x: number = parseFloat(coords[0]); // 50.1441414
    const coord_y: number = parseFloat(coords[1]); // 4.24353453

    const marker = L.marker([coord_x, coord_y])
      .bindPopup(this.activity.name);

    this.markerLayer.addLayer(marker);
  }
}
