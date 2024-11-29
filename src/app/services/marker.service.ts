import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
//import { L } from 'leaflet';

@Injectable({
    providedIn:'root',
})
export class MarkerService {
    private markerUpdatesSubject = new BehaviorSubject<any>(null); // Remplacer `any` par le type attendu si possible
    markerUpdates$ = this.markerUpdatesSubject.asObservable();

    updateMarker(data: any) {
        this.markerUpdatesSubject.next(data); //Emet une mise à jour
    }
}