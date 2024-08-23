import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import * as signalr from '@microsoft/signalr';

@Component({
  selector: 'app-bonus',
  // standalone: true,
  // imports: [],
  templateUrl: './bonus.component.html',
  styleUrl: './bonus.component.css'
})
export class BonusComponent {
  ListBonus: Bonus[] = [];

  bonusType! : string;
  bonusDescription! : string;
  application! : string;
  granted! : boolean;
  bonus_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit(){
    this.hubConnection = new signalr.HubConnectionBuilder()
      .withUrl("https://localhost:7069/bonus")
      .build();

    this.hubConnection.on("receiveBonus",
      (bonus : Bonus) => {
        this.ListBonus.push(bonus);
      });


    this.hubConnection.start()
      .then(() => console.log("Connected Rigth !!!!"))
      .catch((error) => console.log(error))
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit() {
    const bonus: Bonus = {
      bonusType: this.bonusType,
      bonusDescription: this.bonusDescription,
      application: this.application,
      granted: this.granted,
      bonus_Id: this.bonus_Id
    };
    this.hubConnection.invoke("SubmitBonus", bonus)
      .catch(err => console.error(err));
  }
}

export interface Bonus {
  bonusType : string;
  bonusDescription : string;
  application : string;
  granted : boolean;
  bonus_Id : number;
}