import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-organizers-list',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './organizers-list.component.html',
  styleUrl: './organizers-list.component.scss'
})
export class OrganizersListComponent implements OnInit {

  organizers: Array<UserModel> = [];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
