import { ApiClient, ActivityDto, UserDto, ActivityCreationDto, ActivityEditionDto } from './../../../api-client';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
import { ComponentPortal } from '@angular/cdk/portal';
import { OrganizersListComponent } from './organizers-list/organizers-list.component';
import {
  Overlay,
  OverlayRef,
  OverlayConfig,
  PositionStrategy
} from '@angular/cdk/overlay';
import { UserModel } from 'src/app/models/user/user.model';
import { firstValueFrom } from 'rxjs';



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

  dataSource = new MatTableDataSource<ActivityDto>();

  //listActivities: ActivityDto[] = [];
  listActivities: ActivityDto[] = [];

  id! : number;
  name! : string;
  address! : string;
  startDate!: Date;
  endDate!: Date;
  description! : string;
  additionalInformation! : string;
  location! : string;
  active!: boolean;

  //organisateur_Id! : number;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  activityToEdit: ActivityDto | null = null;

  displayedColumns: string[] = ['name', 'address',  'startDate',  'endDate', 'description', 'additionalInformation', 'location', 'id'];

  isAnAdmin: boolean;
  isAnModerator: boolean;
  isAnLanbdaUser: boolean;
  isAnEnterprise: boolean;

  listActivitiesBelongsCurrentUser: number[] = [];

  private overlayRef: OverlayRef | null = null;

  constructor(
    private activityService: ActivityService,
    private tokenService: TokenService,
    private overlay: Overlay,
    private apiClient: ApiClient,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.initRoles();
    await this.getAllActivities();
  }

  public initRoles(): void {
    const role: Roles = this.tokenService.getTokenDecrypted().role;
    const userId: number = parseInt(this.tokenService.getTokenDecrypted().userId);

    this.isAnAdmin = role === Roles.ADMIN;
    this.isAnModerator = role === Roles.MODERATOR;
    this.isAnEnterprise = role === Roles.USER_ENTERPRISE;
    this.isAnLanbdaUser = role === Roles.USER_LAMBDA;
  }

  public async getAllActivities(): Promise<void> {
    try {
      //this.listActivities = await this.activityService.GetAllActivitiesNoneArchived();
      this.listActivities = await firstValueFrom(this.apiClient.activityActive());

      this.dataSource.data = this.listActivities;

      this.listActivitiesBelongsCurrentUser = this.getActivityIdsWhereUserIsOrganizer(this.listActivities);

      console.log(this.listActivitiesBelongsCurrentUser);


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

    // EDITION
    if (this.isFormEdition) {
      const activityEdited: ActivityEditionDto = ActivityEditionDto.fromJS({
        id: this.activityToEdit.id,
        name: this.name,
        address: this.address,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,
        additionalInformation: this.additionalInformation,
        location: this.location
      });


      try {
        await firstValueFrom(this.apiClient.activityPUT(activityEdited.id, activityEdited));
        // this.listActivities = this.listActivities.filter((a: ActivityDto) => a.id != activityEdited.id);

        let activityToEdit = this.listActivities.find((a: ActivityDto) => a.id == activityEdited.id);
        activityToEdit.name = activityEdited.name;
        activityToEdit.address = activityEdited.address;
        activityToEdit.startDate = activityEdited.startDate;
        activityToEdit.endDate = activityEdited.endDate;
        activityToEdit.description = activityEdited.description;
        activityToEdit.additionalInformation = activityEdited.additionalInformation;
        activityToEdit.location = activityEdited.location;

        // this.listActivities.push(activityEdited);
        this.dataSource.data = this.listActivities;

        activityForm.resetForm();

        this.cancelForm();

      } catch (error) {
        console.log("Error update activity!");
      }
    }
    // CREATION
    else {
      const activity: ActivityCreationDto = ActivityCreationDto.fromJS({
        name: this.name,
        address: this.address,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,
        additionalInformation: this.additionalInformation,
        location: this.location
      });

      try {
        const response: ActivityDto = await firstValueFrom(this.apiClient.activityPOST(activity));
        this.listActivities.push(response);
        this.dataSource.data = this.listActivities;

        this.listActivitiesBelongsCurrentUser = this.getActivityIdsWhereUserIsOrganizer(this.listActivities);

        console.log(this.dataSource.data);


        activityForm.resetForm();

        this.cancelForm();

      } catch (error) {
        console.log("Error creating activity!");
      }
    }
  }

  private getActivityIdsWhereUserIsOrganizer(listActivities: ActivityDto[]): number[] {
    return listActivities
      .filter((a: ActivityDto) => {
        return a.organizers
          .some((o: UserDto) => o.id == parseInt(this.tokenService.getTokenDecrypted().userId));
      })
      .map((a: ActivityDto) => a.id);
  }

  public onIdition(activityToEdit: ActivityDto): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.activityToEdit = activityToEdit;

    this.name = this.activityToEdit.name;
    this.address = this.activityToEdit.address;
    this.description = this.activityToEdit.description;
    this.startDate = this.activityToEdit.startDate;
    this.endDate = this.activityToEdit.endDate;
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

      this.listActivities = this.listActivities.filter((a: ActivityDto) => a.id != activityId);
      this.dataSource.data = this.listActivities;
    } catch (error) {
      alert("La suppresion n'a pas fonctionnée !")
    }
  }

  public async onArchive(activityId: number): Promise<void> {
    try {
      //const response: ActivityDto =  await this.activityService.patchActivity(activityId);

      await firstValueFrom(this.apiClient.activityArchive(activityId));

      this.listActivities = this.listActivities.filter((a: ActivityDto) => a.id != activityId);
      //this.listActivities.push(response);
      this.dataSource.data = this.listActivities;

    } catch (error) {
      alert("L'archivage n'a pas fonctionnée !")
    }
  }

  public openOverlayOrganizer(activityId: number): void {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    const portal = new ComponentPortal(OrganizersListComponent);
    const componentRef = this.overlayRef.attach(portal);

    // ✅ Transmet les données via l’Input
    componentRef.instance.organizers = this.listActivities
      .find((a: ActivityDto) => a.id == activityId).organizers;

    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
    componentRef.instance.close.subscribe(() => this.closeOverlay());
  }

  public closeOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

}




