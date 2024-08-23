import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import * as signalr from '@microsoft/signalr';

@Component({
  selector: 'app-chat',
  // standalone: true,
  // imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  ListMessage: Chat[] = [];

  newMessage! : string;
  SendingDate! : string;
  nEvenement_Id! : number;
  activity_Id! : number;
  chat_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/chat")
        .build();

    this.hubConnection.on("receiveChat",
      (chat : Chat) => {
        this.ListMessage.push(chat);
      });

    this.hubConnection.start()
      .then(() => console.log("Connected Rigth !!!!!"))
      .catch((error) => console.log(error))
  }
  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit() {
    const chat: Chat = {
      newMessage: this.newMessage,
      SendingDate: this.SendingDate,
      nEvenement_Id: this.nEvenement_Id,
      activity_Id: this.activity_Id,
      chat_Id: this.chat_Id
    }
  }
}

export interface Chat {
  newMessage : string;
  SendingDate : string;
  nEvenement_Id : number;
  activity_Id : number;
  chat_Id : number;
}