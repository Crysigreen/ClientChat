import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SidebarComponent} from "../Moduls/side-bare";
import {AppbarComponent} from "../Moduls/appbar";
import {ChatWindowComponent} from "../Moduls/chatpage";
import {AppMenuComponent} from "../Moduls/menu";
import {ChatInputComponent} from "../Moduls/ChatInput";
import {FormsModule} from "@angular/forms";
import {Routes, RouterModule, RouterOutlet} from "@angular/router";
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import {MessageService} from "./Services/message.service";



const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'auth', component: AuthentificationComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AppbarComponent,
    ChatWindowComponent,
    AppMenuComponent,
    ChatInputComponent,
    AuthentificationComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
