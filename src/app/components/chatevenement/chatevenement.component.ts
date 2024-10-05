// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ChatEvenementModel } from 'src/app/models/chatEvenement/chatEvenement.model';
// import { ChatEvenementCreationModel } from 'src/app/models/chatEvenement/chatEvenementCreation.model';
// import { ChatEvenementEditionModel } from 'src/app/models/chatEvenement/chatEvenementEdition.model';
// import { ChatEvenementService } from 'src/app/services/chatevenement.service';

// @Component({
//   selector: 'app-chatevenement',
//   templateUrl: './chatevenement.component.html',
//   styleUrl: './chatevenement.component.css'
// })
// export class ChatEvenementComponent implements OnInit {
//   listMessagesEvenement: ChatEvenementModel[] = [];

//   newMessage! : string;
//   author! : string;
//   sendingDate! : string;
//   nEvenement_Id! : number;

//   disable! : boolean;

//   showForm: boolean;
//   isFormEdition: boolean;
//   chatEvenementToEdit: ChatEvenementModel;
//   displayedColumns: string[] = ['newMessage', 'author', 'sendingDate', 'nEvenement_id']

//   constructor(private chatEvenementService: ChatEvenementService) {}

//   public async ngOnInit(): Promise<void> {
//     await this.getAllMessagesEvenements();
//   }
//   public async getAllMessagesEvenements(): Promise<void> {
//     try {
//       this.listMessagesEvenement = await this.chatEvenementService.getAllMessageEvenements();

//       console.log(this.listMessagesEvenement);
      
//     } catch (error) {
//       console.log("Error list Messages Event");
//     }
//   }
//   public async submit(chatEvenementForm: NgForm): Promise<void> {
//     if (chatEvenementForm.invalid) {
//       console.log("Form is invalid");
//       return;
//     }

//     if (this.isFormEdition) {
//       const chatEvenementEdited: ChatEvenementEditionModel = {
//         chatEvenement_Id: this.chatEvenementToEdit.chatEvenement_Id,
//         newMessage: this.chatEvenementToEdit.newMessage,
//         author: this.chatEvenementToEdit.author,
//         sendingDate: this.chatEvenementToEdit.sendingDate,
//         nEvenement_Id: this.chatEvenementToEdit.nEvenement_Id,
//       };

//       try {
//         const response: ChatEvenementModel = await this.chatEvenementService.createChatEvenement(chatEvenementEdited);

//         this.listMessagesEvenement.filter((c: ChatEvenementModel) => c.chatEvenement_Id != response.chatEvenement_Id);

//         this.listMessagesEvenement.push(response);
        
//       } catch (error) {
//         console.log("Error creating chat event!");
//       }
//     }
//     else {
//       const chat: ChatEvenementCreationModel = {
//         newMessage: this.newMessage,
//         author: this.author,
//         sendingDate: this.sendingDate,
//         nEvenement_Id: this.nEvenement_Id,
//       };

//       try {
//         const response: ChatEvenementModel = await this.chatEvenementService.createChatEvenement(chat);
//         this.listMessagesEvenement.push(response);

//       } catch (error) {
//         console.log("Error creating chat event");
//       }
//     }
//   }

//   public onEdition(chatEvenement_Id: number): void {
//     this.showForm = true;
//     this.isFormEdition = true;

//     this.chatEvenementToEdit = this.listMessagesEvenement.find((c: ChatEvenementModel) => c.chatEvenement_Id == chatEvenement_Id);

//     this.newMessage = this.chatEvenementToEdit.newMessage;
//     this.author = this.chatEvenementToEdit.author;
//     this.sendingDate = this.chatEvenementToEdit.sendingDate;
//     this.nEvenement_Id = this.chatEvenementToEdit.nEvenement_Id;
//   }

//   public onCancelForm(): void {
//     this.showForm = false;
//     this.isFormEdition = false;

//     this.newMessage = null;
//     this.author = null;
//     this.sendingDate = null;
//     this.nEvenement_Id = null;

//   }
// }

