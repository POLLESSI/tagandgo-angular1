import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatModel } from 'src/app/models/chat/chat.model';
import { ChatCreationModel } from 'src/app/models/chat/chatCreation.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  listMessages: ChatModel[] = [];

  newMessage! : string;
  author! : string;
  sendingDate! : string;
  nEvenement_Id! : number;
  activity_Id! : number;

  disable! : boolean;

  showForm: boolean;
  displayedColums: string[] = ['newMessage', 'author', 'sendingDate', 'nEvenement_Id', 'activity_id']
displayedColumns: any;

  constructor(private chatService: ChatService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllChats();

    this.listMessages = [
      // "chat_Id": 1,
      // "newMessage": "Bof bof bof bof bof",
      // "author": "Youry les grands pieds"
      // "sendingDate": 13-09-2024,
      // "nEvenement_Id": 1,
      // "activity_Id": 1
    ]
    
  }
  async getAllChats(): Promise<void> {
    try {
      this.listMessages = await this.chatService.getAllChats();
    } catch (error) {
      console.log("Error list Messages");
    }
  }
  public async submit(chatForm: NgForm): Promise<void> {
    if (chatForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    const chat: ChatCreationModel = {
      newMessage: this.newMessage,
      author: this.author,
      sendingDate: this.sendingDate,
      nEvenement_Id: this.nEvenement_Id,
      activity_Id: this.activity_Id
    };

    console.log(chat);

    try {
      const response: ChatModel = await this.chatService.createChat(chat);
      this.listMessages.push(response);
    } catch (error) {
      console.log("Error creating chat!");
    }
  }
}

