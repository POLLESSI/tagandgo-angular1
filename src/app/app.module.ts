import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { ActivityComponent } from "./components/activity/activity.component";
import { FormsModule } from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
    declarations: [
        AppComponent,
        ActivityComponent,

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
    MatIconModule,
    MatDatepickerModule
],
    providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
