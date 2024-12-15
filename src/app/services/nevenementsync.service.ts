import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NEvenementModel } from '../models/nevenement/nevenement.model';
import { CONST_API } from '../constants/api-constants';

@Injectable({
    providedIn: 'root',
})
export class NEvenementSyncService {
    private nEvenementsSubject = new BehaviorSubject<NEvenementModel[]>([]);
    //nEvenements$ = this.nEvenementsSubject.asObservable();

    constructor(private http: HttpClient) {}

    // public getAllNEvenements(): Promise<NEvenementModel[]> {
    //     return this.http.get<NEvenementModel[]>(`${this.baseUrl}/evenements`).toPromise();
    // }

    get nEvenements$(): Observable<NEvenementModel[]> {
        return this.nEvenementsSubject.asObservable();
    }

    // public saveNEvenement(evenement: NEvenementModel): Promise<NEvenementModel> {
    //     return this.http.post<NEvenementModel>(`${this.baseUrl}/evenements`, evenement).toPromise();
    // }
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