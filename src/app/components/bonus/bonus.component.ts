import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BonusModel } from 'src/app/models/bonus/bonus.model';
import { BonusCreationModel } from 'src/app/models/bonus/bonusCreation.model';
import { BonusService } from 'src/app/services/bonus.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrl: './bonus.component.css'
})
export class BonusComponent implements OnInit {

  ListBonus: BonusModel[] = [];

  bonusType! : string;
  bonusDescription! : string;
  application! : string;
  granted! : boolean;

  disable! : boolean;

  constructor(private bonusService: BonusService) {}

  public async ngOnInit(): Promise<void>{
    await this.getAllBonuss();
  }
  
  public async getAllBonuss(): Promise<void> {
    try {
      this.ListBonus = await this.bonusService.getAllBonuss();
    } catch (error) {
      console.log("Error list bonus");
    }
  }

  public async submit(bonusForm: NgForm): Promise<void> {
    if (bonusForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    const bonus: BonusCreationModel = {
      bonusType: this.bonusType,
      bonusDescription: this.bonusDescription,
      application: this.application,
      granted: this.granted
    };

    console.log(bonus);

    try {
      const response: BonusModel = await this.bonusService.createBonus(bonus);
      this.ListBonus.push(response);
    } catch (error) {
      console.log("Error creating bonus!");
    }
  }
}