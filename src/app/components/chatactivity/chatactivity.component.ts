// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ChatActivityModel } from 'src/app/models/chatActivity/chatActivity.model';
// import { ChatActivityCreationModel } from 'src/app/models/chatActivity/chatActivityCreation.model';
// import { ChatActivityEditionModel } from 'src/app/models/chatActivity/chatActivityEdition.model';
// import { ChatActivityService, ChatActivityService } from 'src/app/services/chatactivity.service';

// @Component({
//   selector: 'app-chatactivity',
//   templateUrl: './chatactivity.component.html',
//   styleUrl: './chatactivity.component.css'
// })
// export class ChatActivityComponent implements OnInit {
//   listMessagesActivity: ChatActivityModel[] = [];

//   newMessage! : string;
//   author! : string;
//   sendingDate! : string;
//   // nEvenement_Id! : number;
//   activity_Id! : number;

//   disable! : boolean;

//   showForm: boolean;
//   isFormEdition: boolean;
//   chatActivityToEdit: ChatActivityModel;
//   displayedColumns: string[] = ['newMessage', 'author', 'sendingDate', 'activity_id']

//   constructor(private chatActivityService: ChatActivityService) {}

//   public async ngOnInit(): Promise<void> {
//     await this.getAllChats();
//   }
//   public async getAllChats(): Promise<void> {
//     try {
//       this.listMessagesActivity = await this.chatActivityService.getAllChats();

//       console.log(this.listMessagesActivity);
      
//     } catch (error) {
//       console.log("Error list Messages");
//     }
//   }
//   public async submit(chatActivityForm: NgForm): Promise<void> {
//     if (chatActivityForm.invalid) {
//       console.log("Form is invalid");
//       return;
//     }

//     if (this.isFormEdition) {
//       const chatActivityEdited: ChatActivityEditionModel = {
//         chat_Id: this.chatActivityToEdit.chat_Id,
//         newMessage: this.chatActivityToEdit.newMessage,
//         author: this.chatActivityToEdit.author,
//         sendingDate: this.chatActivityToEdit.sendingDate,
//         activity_Id: this.chatActivityToEdit.activity_Id,
//       };

//       try {
//         const response: ChatActivityModel = await this.chatActivityService.createChat(chatActivityEdited);

//         this.listMessagesActivity.filter((c: ChatActivityModel) => c.chat_Id != response.chat_Id);

//         this.listMessagesActivity.push(response);
        
//       } catch (error) {
//         console.log("Error creating chat!");
//       }
//     }
//     else {
//       const chat: ChatActivityCreationModel = {
//         newMessage: this.newMessage,
//         author: this.author,
//         sendingDate: this.sendingDate,
//         // nEvenement_Id: this.nEvenement_Id,
//         activity_Id: this.activity_Id
//       };

//       try {
//         const response: ChatActivityModel = await this.chatActivityService.createChat(chat);
//         this.listMessagesActivity.push(response);

//       } catch (error) {
//         console.log("Error creating chat");
//       }
//     }
//   }

//   public onEdition(chat_Id: number): void {
//     this.showForm = true;
//     this.isFormEdition = true;

//     this.chatActivityToEdit = this.listMessagesActivity.find((c: ChatActivityModel) => c.chat_Id == chat_Id);

//     this.newMessage = this.chatActivityToEdit.newMessage;
//     this.author = this.chatActivityToEdit.author;
//     this.sendingDate = this.chatActivityToEdit.sendingDate;
//     // this.nEvenement_Id = this.chatActivityToEdit.nEvenement_Id;
//     this.activity_Id = this.chatActivityToEdit.activity_Id;
//   }

//   public onCancelForm(): void {
//     this.showForm = false;
//     this.isFormEdition = false;

//     this.newMessage = null;
//     this.author = null;
//     this.sendingDate = null;
//     // this.nEvenement_Id = null;
//     this.activity_Id = null;
//   }
// }

