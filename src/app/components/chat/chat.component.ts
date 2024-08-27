import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
//import * as signalr from '@microsoft/signalr';
import { ChatModel } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  // standalone: true,
  // imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  ListMessages: ChatModel[] = [];

  newMessage! : string;
  SendingDate! : string;
  nEvenement_Id! : number;
  activity_Id! : number;
  chat_Id! : number;

  //hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private chatService: ChatService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllChats();
    // this.hubConnection = new signalr.HubConnectionBuilder()
    //     .withUrl("https://localhost:7069/chat")
    //     .build();

    // this.hubConnection.on("receiveChat",
    //   (chat : ChatModel) => {
    //     this.ListMessage.push(chat);
    //   });

    // this.hubConnection.start()
    //   .then(() => console.log("Connected Rigth !!!!!"))
    //   .catch((error) => console.log(error))
  }
  async getAllChats(): Promise<void> {
    try {
      this.ListMessages = await this.chatService['getAllChats']();
    } catch (error) {
      console.log("Error list Messages");
    }
  }
  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit(): void {
    const chat: ChatModel = {
      newMessage: this.newMessage,
      SendingDate: this.SendingDate,
      nEvenement_Id: this.nEvenement_Id,
      activity_Id: this.activity_Id,
      chat_Id: this.chat_Id
    };
  }
}

