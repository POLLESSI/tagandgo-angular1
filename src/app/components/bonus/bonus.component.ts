import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
//import * as signalr from '@microsoft/signalr';
import { BonusModel } from 'src/app/models/bonus.model';
import { BonusService } from 'src/app/services/bonus.service';

@Component({
  selector: 'app-bonus',
  // standalone: true,
  // imports: [],
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

  //hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private bonusService: BonusService) {}

  async ngOnInit(): Promise<void>{
    try {
      this.ListBonus = await this.bonusService['getAllBonus']();
    } catch (error) {
      console.log("Error list Bonus");
    }
    // this.hubConnection = new signalr.HubConnectionBuilder()
    //   .withUrl("https://localhost:7069/bonus")
    //   .build();

    // this.hubConnection.on("receiveBonus",
    //   (bonus : BonusModel) => {
    //     this.ListBonus.push(bonus);
    //   });


    // this.hubConnection.start()
    //   .then(() => console.log("Connected Rigth !!!!"))
    //   .catch((error) => console.log(error))
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit(): void {
    const bonus: BonusModel = {
      bonusType: this.bonusType,
      bonusDescription: this.bonusDescription,
      application: this.application,
      granted: this.granted,
      bonus_Id: this.bonus_Id
    };
    // this.hubConnection.invoke("SubmitBonus", bonus)
    //   .catch(err => console.error(err));
  }
}

