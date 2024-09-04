import { Component, OnInit } from '@angular/core';
import { ChatModel } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  ListMessages: ChatModel[] = [];

  newMessage! : string;
  author! : string;
  SendingDate! : string;
  nEvenement_Id! : number;
  activity_Id! : number;
  chat_Id! : number;

  disable! : boolean;

  constructor(private chatService: ChatService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllChats();
    
  }
  async getAllChats(): Promise<void> {
    try {
      this.ListMessages = await this.chatService.getAllChats();
    } catch (error) {
      console.log("Error list Messages");
    }
  }
  
  submit(): void {
    const chat: ChatModel = {
      newMessage: this.newMessage,
      author: this.author,
      SendingDate: this.SendingDate,
      nEvenement_Id: this.nEvenement_Id,
      activity_Id: this.activity_Id,
      chat_Id: this.chat_Id
    };
  }
}

