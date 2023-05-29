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
import {AuthGuard} from "./guards/auth.guard";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ChatComponent } from './Components/chat/chat.component';



const appRoutes: Routes = [
  {path: '', redirectTo: '/chats', pathMatch: 'full'},
  {path: 'auth', component: AuthentificationComponent},
  {path: 'chats',component:HomepageComponent,
    children:[
      { path: ':userId', component: ChatComponent }
    ]}
  // {path: 'chat', component: HomepageComponent},
  // { path: 'chat/:userId', component: ChatComponent }

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
    ChatComponent,
  ],
  imports: [
    HttpClientModule,
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
