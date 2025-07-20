import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserDto } from 'src/app/api-client';

@Component({
  selector: 'app-organizers-list',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './organizers-list.component.html',
  styleUrl: './organizers-list.component.scss'
})
export class OrganizersListComponent {

  organizers: Array<UserDto> = [];

  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
     this.close.emit();
  }
}
