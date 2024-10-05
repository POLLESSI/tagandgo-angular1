// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ChatActivityModel } from 'src/app/models/chatActivity/chatActivity.model';
// import { ChatActivityCreationModel } from 'src/app/models/chatActivity/chatActivityCreation.model';
// import { ChatActivityEditionModel } from 'src/app/models/chatActivity/chatActivityEdition.model';
// import { ChatActivityService } from 'src/app/services/chatactivity.service';

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
//   activity_Id! : number;

//   disable! : boolean;

//   showForm: boolean;
//   isFormEdition: boolean;
//   chatActivityToEdit: ChatActivityModel;
//   displayedColumns: string[] = ['newMessage', 'author', 'sendingDate', 'activity_id']

//   constructor(private chatActivityService: ChatActivityService) {}

//   public async ngOnInit(): Promise<void> {
//     await this.getAllMessagesActivities();
//   }
//   public async getAllMessagesActivities(): Promise<void> {
//     try {
//       this.listMessagesActivity = await this.chatActivityService.getAllMessagesActivities();

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
//         chatActivity_Id: this.chatActivityToEdit.chatActivity_Id,
//         newMessage: this.chatActivityToEdit.newMessage,
//         author: this.chatActivityToEdit.author,
//         sendingDate: this.chatActivityToEdit.sendingDate,
//         activity_Id: this.chatActivityToEdit.activity_Id,
//       };

//       try {
//         const response: ChatActivityModel = await this.chatActivityService.createChatActivity(chatActivityEdited);

//         this.listMessagesActivity.filter((c: ChatActivityModel) => c.chatActivity_Id != response.chatActivity_Id);

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
//         activity_Id: this.activity_Id
//       };

//       try {
//         const response: ChatActivityModel = await this.chatActivityService.createChatActivity(chat);
//         this.listMessagesActivity.push(response);

//       } catch (error) {
//         console.log("Error creating chat");
//       }
//     }
//   }

//   public onEdition(chatActivity_Id: number): void {
//     this.showForm = true;
//     this.isFormEdition = true;

//     this.chatActivityToEdit = this.listMessagesActivity.find((c: ChatActivityModel) => c.chatActivity_Id == chatActivity_Id);

//     this.newMessage = this.chatActivityToEdit.newMessage;
//     this.author = this.chatActivityToEdit.author;
//     this.sendingDate = this.chatActivityToEdit.sendingDate;
//     this.activity_Id = this.chatActivityToEdit.activity_Id;
//   }

//   public onCancelForm(): void {
//     this.showForm = false;
//     this.isFormEdition = false;

//     this.newMessage = null;
//     this.author = null;
//     this.sendingDate = null;
//     this.activity_Id = null;
//   }
// }

