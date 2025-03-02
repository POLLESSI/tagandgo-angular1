import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DateTime } from 'luxon';
import { ActivityModel } from 'src/app/models/activity/activity.model'
import { ActivityCreationModel } from 'src/app/models/activity/activityCreation.model';
import { ActivityEditionModel } from 'src/app/models/activity/activityEdition.model';
import { ActivityService } from 'src/app/services/api/activity.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { TokenService } from 'src/app/services/util/token.service';
import { Roles } from 'src/app/constants/roles-constants';

export type MarkerFactory = { values: any[], markerFn: Function, popupFn?: Function }

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    FormsModule
  ]
})
export class ActivityComponent implements OnInit {

  dataSource = new MatTableDataSource<ActivityModel>();

  listActivities: ActivityModel[] = [];

  id! : number;
  name! : string;
  address! : string;
  startDate!: DateTime;
  endDate!: DateTime;
  description! : string;
  additionalInformation! : string;
  location! : string;
  active!: boolean;

  //organisateur_Id! : number;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  activityToEdit: ActivityModel | null = null;

  displayedColumns: string[] = ['name', 'address',  'startDate',  'endDate', 'description', 'additionalInformation', 'location', 'id'];

  isAnAdmin: boolean;
  isAnModerator: boolean;
  isAnDefaultUser: boolean;

  constructor(
    private activityService: ActivityService,
    private tokenService: TokenService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.initRoles();
    await this.getAllActivities();
  }

  public initRoles(): void {
    const role: Roles = this.tokenService.getTokenDecrypted().role;

    this.isAnAdmin = role === Roles.ADMIN;
    this.isAnModerator = role === Roles.MODERATOR;
    this.isAnDefaultUser = role === Roles.DEFAULT;
  }

  public async getAllActivities(): Promise<void> {
    try {
      this.listActivities = await this.activityService.GetAllActivitiesNoneArchived();
      this.dataSource.data = this.listActivities;

    } catch (error) {
      console.error('Error fetching activities:', error);
      alert('Unable to load activities. Check your internet connection or try again later.');
    }
  }

  public async submit(activityForm: NgForm): Promise<void> {
    // Validation via le formulaire
    if (activityForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (this.isFormEdition) {
      const activityEdited: ActivityEditionModel = {
        id: this.activityToEdit.id,
        name: this.name,
        address: this.address,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,
        additionalInformation: this.additionalInformation,
        location: this.location
      };


      try {
        const response: ActivityModel = await this.activityService.createActivity(activityEdited);
        this.listActivities.filter((a: ActivityModel) => a.id != response.id);
        this.listActivities.push(response);
        this.dataSource.data = this.listActivities;

        activityForm.resetForm();

        this.cancelForm();

      } catch (error) {
        console.log("Error update activity!");
      }
    }
    else {
      const activity: ActivityCreationModel = {
        name: this.name,
        address: this.address,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,
        additionalInformation: this.additionalInformation,
        location: this.location
      };

      try {
        const response: ActivityModel = await this.activityService.createActivity(activity);
        this.listActivities.push(response);
        this.dataSource.data = this.listActivities;

        activityForm.resetForm();

        this.cancelForm();

      } catch (error) {
        console.log("Error creating activity!");
      }
    }
  }

  public onIdition(activityToEdit: ActivityModel): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.activityToEdit = activityToEdit;

    this.name = this.activityToEdit.name;
    this.address = this.activityToEdit.address;
    this.description = this.activityToEdit.description;
    this.startDate = this.activityToEdit.startDate;
    this.endDate =  this.activityToEdit.endDate;
    this.additionalInformation = this.activityToEdit.additionalInformation;
    this.location = this.activityToEdit.location;

    //this.organisateur_Id = this.activityToEdit.organisateur_Id;
  }

  public onCancelForm(): void {
    this.cancelForm();
  }

  public cancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.name = null;
    this.address = null;
    this.description = null;
    this.additionalInformation = null;
    this.location = null;
    //this.organisateur_Id = null;
  }

  public async deleteActivity(activityId: number): Promise<void> {
    try {
      await this.activityService.deleteActivity(activityId);

      this.listActivities = this.listActivities.filter((a: ActivityModel) => a.id != activityId);
      this.dataSource.data = this.listActivities;
    } catch (error) {
      alert("La suppresion n'a pas fonctionnée !")
    }
  }

  public async onArchive(activityId: number): Promise<void> {
    try {
      const response: ActivityModel = await this.activityService.patchActivity(activityId);

      this.listActivities = this.listActivities.filter((a: ActivityModel) => a.id != response.id);
      this.listActivities.push(response);
      this.dataSource.data = this.listActivities;

    } catch (error) {
      alert("L'archivage n'a pas fonctionnée !")
    }
  }
}




