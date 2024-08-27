import { Component } from '@angular/core';
import { Form, NgForm} from '@angular/forms';
//import * as signalr from '@microsoft/signalr';
import { RecompenseModel } from 'src/app/models/recompense.model';
import { RecompenseService } from 'src/app/services/recompense.service';
//import { error } from 'console';

@Component({
  selector: 'app-recompense',
  // standalone: true,
  // imports: [],
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

  //hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private recompenseService: RecompenseService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllRecompenses();
    // this.hubConnection = new signalr.HubConnectionBuilder()
    //     .withUrl("https://localhost:7069/recompense")
    //     .build();

    // this.hubConnection.on("receiveRecompense",
    //   (recompense : RecompenseModel) => {
    //     this.ListRecompense.push(recompense);
    //   });

    // this.hubConnection.start()
    //   .then(() => console.log("Connected Rigth !!!!!!"))
    //   .catch((error) => console.log(error))
  }

  async getAllRecompenses(): Promise<void> {
    try {
      this.ListRecompenses = await this.recompenseService['getAllRecompenses']();
    } catch (error) {
      console.log("Error list Recompenses");
    }
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit(): void {
    const recompense: RecompenseModel = {
      definition: this.definition,
      point: this.point,
      implication: this.implication,
      granted: this.granted,
      recompense_Id: this.recompense_Id
    };
    // this.hubConnection.invoke("SubmitRecompense", recompense)
    //   .catch(err => console.error(err));
  }
}

