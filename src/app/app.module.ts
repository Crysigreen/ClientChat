import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SidebarComponent} from "../Moduls/side-bare";
import {AppbarComponent} from "../Moduls/appbar";
import {ChatPageComponent} from "../Moduls/chatpage";
import {AppMenuComponent} from "../Moduls/menu";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AppbarComponent,
    ChatPageComponent,
    AppMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
