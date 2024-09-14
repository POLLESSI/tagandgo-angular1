import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecompenseModel } from 'src/app/models/recompense/recompense.model';
import { RecompenseCreationModel } from 'src/app/models/recompense/recompenseCreation.model';
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
  displayedColums: string[] = ['definition', 'point', 'implication', 'granted']
displayedColumns: any;

  constructor(private recompenseService: RecompenseService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllRecompenses();

    this.listRecompenses = [
      // "recompense_Id": 1,
      // "definition": "1000 points de bonus en plus",
      // "implication": "+1000",
      // "granted": "true"
    ]
  }

  public async getAllRecompenses(): Promise<void> {
    try {
      this.listRecompenses = await this.recompenseService.getAllRecompenses();
    } catch (error) {
      console.log("Error list Recompenses");
    }
  }

  public async submit(recompenseForm: NgForm): Promise<void> {
    if (recompenseForm.invalid) {
      console.log("Form is invalid");
      return;
    }
    const recompense: RecompenseCreationModel = {
      definition: this.definition,
      point: this.point,
      implication: this.implication,
      granted: this.granted
    };

    console.log(recompense);

    try {
      const response: RecompenseModel = await this.recompenseService.createRecompense(recompense);
      this.listRecompenses.push(response);
    } catch (error) {
      console.log("Error creating recompense!");
    }
  }
}

