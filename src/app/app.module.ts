import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SidebarComponent} from "../Moduls/side-bare";
import {AppbarComponent} from "../Moduls/appbar";
import {ChatWindowComponent} from "../Moduls/chatpage";
import {AppMenuComponent} from "../Moduls/menu";
import {ChatInputComponent} from "../Moduls/ChatInput";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AppbarComponent,
    ChatWindowComponent,
    AppMenuComponent,
    ChatInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
