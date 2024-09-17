import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BonusModel } from 'src/app/models/bonus/bonus.model';
import { ChatModel } from 'src/app/models/chat/chat.model';
import { ChatCreationModel } from 'src/app/models/chat/chatCreation.model';
import { ChatEditionModel } from 'src/app/models/chat/chatEdition.model';
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
  isFormEdition: boolean;
  chatToEdit: ChatModel;
  displayedColumns: string[] = ['newMessage', 'author', 'sendingDate', 'nEvenement_Id', 'activity_id']

  constructor(private chatService: ChatService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllChats();
  }
  public async getAllChats(): Promise<void> {
    try {
      this.listMessages = await this.chatService.getAllChats();

      console.log(this.listMessages);
      
    } catch (error) {
      console.log("Error list Messages");
    }
  }
  public async submit(chatForm: NgForm): Promise<void> {
    if (chatForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (this.isFormEdition) {
      const chatEdited: ChatEditionModel = {
        chat_Id: this.chatToEdit.chat_Id,
        newMessage: this.chatToEdit.newMessage,
        author: this.chatToEdit.author,
        sendingDate: this.chatToEdit.sendingDate,
        nEvenement_Id: this.chatToEdit.nEvenement_Id,
        activity_Id: this.chatToEdit.activity_Id,
      };

      try {
        const response: ChatModel = await this.chatService.createChat(chatEdited);

        this.listMessages.filter((c: ChatModel) => c.chat_Id != response.chat_Id);

        this.listMessages.push(response);
        
      } catch (error) {
        console.log("Error creating chat!");
      }
    }
    else {
      const chat: ChatCreationModel = {
        newMessage: this.newMessage,
        author: this.author,
        sendingDate: this.sendingDate,
        nEvenement_Id: this.nEvenement_Id,
        activity_Id: this.activity_Id
      };

      try {
        const response: ChatModel = await this.chatService.createChat(chat);
        this.listMessages.push(response);

      } catch (error) {
        console.log("Error creating chat");
      }
    }
  }

  public onEdition(chat_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.chatToEdit = this.listMessages.find((c: ChatModel) => c.chat_Id == chat_Id);

    this.newMessage = this.chatToEdit.newMessage;
    this.author = this.chatToEdit.author;
    this.sendingDate = this.chatToEdit.sendingDate;
    this.nEvenement_Id = this.chatToEdit.nEvenement_Id;
    this.activity_Id = this.chatToEdit.activity_Id;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.newMessage = null;
    this.author = null;
    this.sendingDate = null;
    this.nEvenement_Id = null;
    this.activity_Id = null;
  }
}

