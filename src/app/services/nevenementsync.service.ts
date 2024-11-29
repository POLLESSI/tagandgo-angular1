import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NEvenementModel } from '../models/nevenement/nevenement.model';

@Injectable({
    providedIn: 'root',
})
export class NEvenementSyncService {
    private nEvenementsSubject = new BehaviorSubject<NEvenementModel[]>([]);
    //nEvenements$ = this.nEvenementsSubject.asObservable();

    constructor() {}

    get nEvenements$(): Observable<NEvenementModel[]> {
        return this.nEvenementsSubject.asObservable();
    }
    //Mise à jour de la liste des éléments
    setNEvenements(nEvenements: NEvenementModel[]): void {
        this.nEvenementsSubject.next(nEvenements);
    }
    //Ajout ou mise à jou des événements spécifiques
    addOrUpdateNEvenement(nEvenement: NEvenementModel): void {
        const currentList = this.nEvenementsSubject.getValue();
        const index = currentList.findIndex(e => e.nEvenement_Id === nEvenement.nEvenement_Id);
        if (index !== -1) {
            currentList[index] = nEvenement;
        } else {
            currentList.push(nEvenement);
        }
        this.nEvenementsSubject.next([...currentList]);
    }

    //Suppretion d'un événement
    removeNEvenement(nEvenementId: number): void {
        const updateList = this.nEvenementsSubject
            .getValue()
            .filter(e => e.nEvenement_Id !== nEvenementId);
        this.nEvenementsSubject.next(updateList);
    }
}