// filepath: c:\Users\Pol PC\Downloads\TagAndGo\TagAndGoUI\tagandgo_angular\src\app\app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from "ngx-toastr";
import { NotificationBarComponent } from "./components/notification-bar.component";
import { NotificationService } from "./services/notification.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { ActivityComponent } from "./components/dashboard/activity/activity.component";
import { AvatarComponent } from "./components/dashboard/avatar/avatar.component";
import { BonusComponent } from "./components/dashboard/bonus/bonus.component";
//import { ChatActivityComponent } from "./components/chatactivity/chatactivity.component";
//import { ChatEvenementComponent } from "./components/chatevenement/chatevenement.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";    
import { MapComponent } from "./components/dashboard/map/map.component";
import { MediaitemComponent } from "./components/dashboard/mediaitem/mediaitem.component";
import { NevenementComponent } from "./components/dashboard/nevenement/nevenement.component";
import { NiconComponent } from "./components/dashboard/nicon/nicon.component";
import { NpersonComponent } from "./components/dashboard/nperson/nperson.component";
import { NuserComponent } from "./components/dashboard/nuser/nuser.component";
import { NvoteComponent } from "./components/dashboard/nvote/nvote.component";
import { RecompenseComponent } from "./components/dashboard/recompense/recompense.component";
import { OrganisateurComponent } from "./components/dashboard/organisateur/organisateur.component";
// import { WeatherforecastComponent } from "./components/dashboard/weatherforecast/weatherforecast.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';

// Miscellaneous
import { NavigationComponent } from "./components/dashboard/navigation/navigation.component";
import { WelcomeComponent } from "./components/dashboard/welcome/welcome.component";
import { ForbiddenComponent } from "./components/dashboard/forbidden/forbidden.components";
import { ProfileComponent } from "./components/dashboard/profile/profile.component";

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    RouterModule.forRoot(routes),
    // Angular Material Modules
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatDividerModule,
    MatRippleModule,
    MatTreeModule,
    MatBottomSheetModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    AppComponent,
    NotificationBarComponent,
    ActivityComponent,
    AvatarComponent,
    BonusComponent,
    //ChatActivityComponent,
    //ChatEvenementComponent,
    DashboardComponent,
    MapComponent,
    MediaitemComponent,
    NevenementComponent,
    NiconComponent,
    NpersonComponent,
    NuserComponent,
    NvoteComponent,
    RecompenseComponent,
    OrganisateurComponent,
    // WeatherforecastComponent,
    NavigationComponent,
    WelcomeComponent,
    ForbiddenComponent,
    ProfileComponent,
    NavigationComponent
  ],
  exports: [
    NotificationBarComponent
  ],
  providers: [
    NotificationService, 
    provideHttpClient(withInterceptorsFromDi())
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }