import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { ActivityComponent } from "./components/activity/activity.component";
import { AvatarComponent } from "./components/avatar/avatar.component";
import { BonusComponent } from "./components/bonus/bonus.component";
// import { ChatActivityComponent } from "./components/chatactivity/chatactivity.component";
// import { ChatEvenementComponent } from "./components/chatevenement/chatevenement.component";
import { MapComponent } from "./components/map/map.component";
import { MediaitemComponent } from "./components/mediaitem/mediaitem.component";
import { NevenementComponent } from "./components/nevenement/nevenement.component";
import { NiconComponent } from "./components/nicon/nicon.component";
import { NpersonComponent } from "./components/nperson/nperson.component";
import { NuserComponent } from "./components/nuser/nuser.component";
import { NvoteComponent } from "./components/nvote/nvote.component";
import { RecompenseComponent } from "./components/recompense/recompense.component";
import { OrganisateurComponent } from "./components/organisateur/organisateur.component";
import { WeatherforecastComponent } from "./components/weatherforecast/weatherforecast.component";
import { FormsModule } from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        AppComponent,
        ActivityComponent,
        AvatarComponent,
        BonusComponent,
        // ChatActivityComponent,
        //ChatEvenementComponent,
        MapComponent,
        MediaitemComponent,
        NevenementComponent,
        NiconComponent,
        NpersonComponent,
        NuserComponent,
        NvoteComponent,
        RecompenseComponent,
        OrganisateurComponent,
        WeatherforecastComponent

    ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // Material Angular
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule
],
    providers: [
    provideAnimationsAsync()
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
