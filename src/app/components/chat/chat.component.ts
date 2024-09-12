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
  ListMessages: ChatModel[] = [];

  newMessage! : string;
  author! : string;
  sendingDate! : string;
  nEvenement_Id! : number;
  activity_Id! : number;

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
      this.ListMessages.push(response);
    } catch (error) {
      console.log("Error creating chat!");
    }
  }
}

