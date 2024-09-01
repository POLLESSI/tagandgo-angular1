import { Component, OnInit } from '@angular/core';
import { BonusModel } from 'src/app/models/bonus.model';
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
  bonus_Id! : number;

  disable! : boolean;

  constructor(private bonusService: BonusService) {}

  async ngOnInit(): Promise<void>{
    await this.getAllBonuss();
  }
  
  async getAllBonuss(): Promise<void> {
    try {
      this.ListBonus = await this.bonusService.getAllBonuss();
    } catch (error) {
      console.log("Error list bonus");
    }
  }

  submit(): void {
    const bonus: BonusModel = {
      bonusType: this.bonusType,
      bonusDescription: this.bonusDescription,
      application: this.application,
      granted: this.granted,
      bonus_Id: this.bonus_Id
    };
  }

}