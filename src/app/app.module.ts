import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SidebarComponent} from "../Moduls/side-bare";
import {ChatWindowComponent} from "./Components/chatpagecomp/chatpage";
import {AppMenuComponent} from "../Moduls/menu";
import {ChatInputComponent} from "../Moduls/ChatInput";
import {FormsModule} from "@angular/forms";
import {Routes, RouterModule, RouterOutlet} from "@angular/router";
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import {MessageService} from "./Services/message.service";
import { ChatListComponent } from './Components/chat-list/chat-list.component';



const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'auth', component: AuthentificationComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChatWindowComponent,
    AppMenuComponent,
    ChatInputComponent,
    AuthentificationComponent,
    HomepageComponent,
    ChatListComponent,
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
