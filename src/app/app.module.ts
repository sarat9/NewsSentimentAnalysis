import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { NewsdataComponent } from './newsdata/newsdata.component';

@NgModule({
  declarations: [
    AppComponent,NewsdataComponent
  ],
  imports: [
    BrowserModule,HttpClientModule
  ],
  providers: [HttpClient,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
