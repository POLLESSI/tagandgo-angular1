import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { AvatarComponent } from "./components/avatar/avatar.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        AvatarComponent
    ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AvatarComponent
],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }