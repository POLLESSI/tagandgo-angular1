import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BonusModel } from 'src/app/models/bonus/bonus.model';
import { BonusCreationModel } from 'src/app/models/bonus/bonusCreation.model';
import { BonusEditionModel } from 'src/app/models/bonus/bonusEdition.model';
import { BonusService } from 'src/app/services/bonus.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrl: './bonus.component.css'
})
export class BonusComponent implements OnInit {

  listBonus: BonusModel[] = [];

  bonusType! : string;
  bonusDescription! : string;
  application! : string;
  granted! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  bonusToEdit: BonusModel;

  displayedColumns: string[] = ['bonusType', 'bonusDescription', 'application', 'granted']

  constructor(private bonusService: BonusService) {}

  public async ngOnInit(): Promise<void>{
    await this.getAllBonuss();
  }
  
  public async getAllBonuss(): Promise<void> {
    try {
      this.listBonus = await this.bonusService.getAllBonuss();

      console.log(this.listBonus);

    } catch (error) {
      console.log("Error list bonus");
    }
  }

  public async submit(bonusForm: NgForm): Promise<void> {
    if (bonusForm.invalid) {
      console.log("Form is invalid");
      return;
    }
    if (this.isFormEdition) {
      const bonusEdited: BonusEditionModel = {
        bonus_Id: this.bonusToEdit.bonus_Id,
        bonusType: this.bonusToEdit.bonusType,
        bonusDescription: this.bonusToEdit.bonusDescription,
        application: this.bonusToEdit.application,
        granted: this.bonusToEdit.granted,
      };
      try {
        const response: BonusModel = await this.bonusService.createBonus(bonusEdited);

        this.listBonus.filter((b:BonusModel) => b.bonus_Id != response.bonus_Id);

        this.listBonus.push(response);
        
      } catch (error) {
        console.log("Error update bonus!");
      }
    }
    else {
      const bonus: BonusCreationModel = {
        bonusType: this.bonusType,
        bonusDescription: this.bonusDescription,
        application: this.application,
        granted: this.granted
      };

      try {
        const response: BonusModel = await this.bonusService.createBonus(bonus);
        this.listBonus.push(response);
      } catch (error) {
        console.log("Error creating bonus");
      }
    }
  }
  public onEdition(bonus_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.bonusToEdit = this.listBonus.find((b: BonusModel) => b.bonus_Id == bonus_Id);

    this.bonusType = this.bonusToEdit.bonusType;
    this.bonusDescription = this.bonusToEdit.bonusDescription;
    this.application = this.bonusToEdit.application;
    this.granted = this.bonusToEdit.granted;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.bonusType = null;
    this.bonusDescription = null;
    this.application = null;
    this.granted = null
  }
}