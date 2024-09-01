import { Component } from '@angular/core';
import { RecompenseModel } from 'src/app/models/recompense.model';
import { RecompenseService } from 'src/app/services/recompense.service';
@Component({
  selector: 'app-recompense',
  templateUrl: './recompense.component.html',
  styleUrl: './recompense.component.css'
})
export class RecompenseComponent {
  ListRecompenses: RecompenseModel[] = [];

  definition! : string;
  point! : string;
  implication! : string;
  granted! : boolean;
  recompense_Id! : number;

  disable! : boolean;

  constructor(private recompenseService: RecompenseService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllRecompenses();
  }

  async getAllRecompenses(): Promise<void> {
    try {
      this.ListRecompenses = await this.recompenseService.getAllRecompenses();
    } catch (error) {
      console.log("Error list Recompenses");
    }
  }

  submit(): void {
    const recompense: RecompenseModel = {
      definition: this.definition,
      point: this.point,
      implication: this.implication,
      granted: this.granted,
      recompense_Id: this.recompense_Id
    };
  }
}

