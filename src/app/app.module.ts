import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SidebarComponent} from "../Moduls/side-bare";
import {ChatWindowComponent} from "./Components/chatpagecomp/chatpage";
import {AppMenuComponent} from "../Moduls/menu";
import {ChatInputComponent} from "../Moduls/ChatInput";
import {FormsModule} from "@angular/forms";
import {Routes, RouterModule, RouterOutlet, RouteReuseStrategy} from "@angular/router";
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import {MessageService} from "./Services/message.service";
import { ChatListComponent } from './Components/chat-list/chat-list.component';
import {AuthGuard} from "./guards/auth.guard";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { ChatComponent } from './Components/chat/chat.component';
import {AuthInterceptor} from "./Interceptor/auth.interceptor";
import {CustomReuseStrategy} from "../Moduls/custom-reuse-strategy";
import { VideoCallComponent } from './Components/video-call/video-call.component';



const appRoutes: Routes = [
  {path: '', redirectTo: '/chats', pathMatch: 'full'},
  {path: 'auth', component: AuthentificationComponent},
  {path: 'call',component: VideoCallComponent, canActivate: [AuthGuard]},
  {path: 'chats',component:HomepageComponent,canActivate: [AuthGuard] ,
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
    VideoCallComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterOutlet,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
