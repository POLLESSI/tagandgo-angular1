import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecompenseModel } from 'src/app/models/recompense/recompense.model';
import { RecompenseCreationModel } from 'src/app/models/recompense/recompenseCreation.model';
import { RecompenseEditionModel } from 'src/app/models/recompense/recompenseEdition.model';
import { RecompenseService } from 'src/app/services/recompense.service';
@Component({
  selector: 'app-recompense',
  templateUrl: './recompense.component.html',
  styleUrl: './recompense.component.css'
})
export class RecompenseComponent {
  listRecompenses: RecompenseModel[] = [];

  definition! : string;
  point! : string;
  implication! : string;
  granted! : boolean;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  recompenseToEdit: RecompenseModel;

  displayedColumns: string[] = ['definition', 'point', 'implication', 'granted'];

  constructor(private recompenseService: RecompenseService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllRecompenses();
  }

  public async getAllRecompenses(): Promise<void> {
    try {
      this.listRecompenses = await this.recompenseService.getAllRecompenses();

      console.log(this.listRecompenses);

    } catch (error) {
      console.log("Error list Recompenses");
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
        const response: RecompenseModel = await this.recompenseService.createRecompense(recompenseEdited);

        this.listRecompenses.filter((r: RecompenseModel) => r.recompense_Id != response.recompense_Id);

        this.listRecompenses.push(response);

      } catch (error) {
        console.log("Error creating recompense!");
      }
    }
    else {
      const recompense: RecompenseCreationModel = {
        definition: this.definition,
        point: this.point,
        implication: this.implication,
        granted: this.granted
      };

      try {
        const response: RecompenseModel = await this.recompenseService.createRecompense(recompense);
        this.listRecompenses.push(response);

      } catch (error) {
        console.log("Error creating Recompense");
      }
    }
  }

  public onEdition(recompense_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.recompenseToEdit = this.listRecompenses.find((r: RecompenseModel) => r.recompense_Id == recompense_Id);

    this.definition = this.recompenseToEdit.definition;
    this.point = this.recompenseToEdit.point;
    this.implication = this.recompenseToEdit.implication;
    this.granted = this.recompenseToEdit.granted;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.definition = null;
    this.point = null;
    this.implication = null;
    this.granted = null;
  }
}

