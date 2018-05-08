import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { NewsdataRoutingModule } from './newsdata-routing.module';

import { NewsdataComponent } from './newsdata.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NewsdataRoutingModule
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [NewsdataComponent]
})
export class NewsdataModule { }
