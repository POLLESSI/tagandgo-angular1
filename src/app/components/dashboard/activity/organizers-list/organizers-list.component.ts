import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/api-client';
import { UserModel } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-organizers-list',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './organizers-list.component.html',
  styleUrl: './organizers-list.component.scss'
})
export class OrganizersListComponent implements OnInit {

  organizers: Array<UserDto> = [];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
