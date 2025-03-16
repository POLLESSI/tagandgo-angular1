import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRService } from 'src/app/services/signalr.service';
import { NgForm, FormsModule } from '@angular/forms';
import { RecompenseModel } from 'src/app/models/recompense/recompense.model';
import { RecompenseCreationModel } from 'src/app/models/recompense/recompenseCreation.model';
import { RecompenseEditionModel } from 'src/app/models/recompense/recompenseEdition.model';
import { RecompenseService } from 'src/app/services/recompense.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-recompense',
  templateUrl: './recompense.component.html',
  styleUrls: ['./recompense.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule, 
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class RecompenseComponent implements OnInit {
  isLoading = false;
  listRecompenses: RecompenseModel[] = [];
  definition!: string;
  point!: string;
  implication!: string;
  granted!: boolean;
  showForm = false;
  isFormEdition = false;
  recompenseToEdit!: RecompenseModel;
  displayedColumns: string[] = ['definition', 'point', 'implication', 'granted', 'recompense_Id'];

  constructor(
    private signalRService: SignalRService,
    private recompenseService: RecompenseService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;

    console.log('Recompense component initialized');

    // Démarrer la connexion SignalR
    this.signalRService.startConnection();

    // Ajouter un écouteur pour les événements SignalR
    this.signalRService.addRecompenseListener((recompenses: RecompenseModel[]) => {
      console.log('Event received', recompenses);
      this.listRecompenses = recompenses;
      this.isLoading = false;
    });

    // S'assurer que les appels API sont effectués
    try {
      const recompenses = await this.recompenseService.getAllRecompenses();
      console.log('Recompenses fetched from API', recompenses);
      this.listRecompenses = recompenses;
    } catch (error) {
      console.error('Error fetching recompenses', error);
    } finally {
      this.isLoading = false;
    }
  }

  public async submit(recompenseForm: NgForm): Promise<void> {
    if (recompenseForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (this.isFormEdition) {
      const recompenseEdited: RecompenseEditionModel = {
        recompense_Id: this.recompenseToEdit.recompense_Id,
        definition: this.recompenseToEdit.definition,
        point: this.recompenseToEdit.point,
        implication: this.recompenseToEdit.implication,
        granted: this.recompenseToEdit.granted,
      };
      try {
        const response: RecompenseModel = await this.recompenseService.updateRecompense(recompenseEdited);
        const index = this.listRecompenses.findIndex(r => r.recompense_Id === response.recompense_Id);
        this.listRecompenses[index] = response;
        this.onCancelForm();
      } catch (error) {
        console.log("Error updating recompense!");
      }
    } else {
      const recompense: RecompenseCreationModel = {
        definition: this.definition,
        point: this.point,
        implication: this.implication,
        granted: this.granted
      };
      try {
        const response: RecompenseModel = await this.recompenseService.createRecompense(recompense);
        this.listRecompenses.push(response);
        this.onCancelForm();
      } catch (error) {
        console.log("Error creating Recompense");
      }
    }
  }

  public onEdition(recompense_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;
    this.recompenseToEdit = this.listRecompenses.find(r => r.recompense_Id === recompense_Id)!;
    this.definition = this.recompenseToEdit.definition;
    this.point = this.recompenseToEdit.point;
    this.implication = this.recompenseToEdit.implication;
    this.granted = this.recompenseToEdit.granted;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;
    this.definition = '';
    this.point = '';
    this.implication = '';
    this.granted = false;
  }

  public deleteRecompense(recompense_Id: number): void {
    this.recompenseService.deleteRecompense(recompense_Id).then(
      () => {
        this.listRecompenses = this.listRecompenses.filter(r => r.recompense_Id !== recompense_Id);
      },
      (error) => {
        console.error('Error deleting recompense', error);
      }
    );
  }
}