import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsdataComponent} from './newsdata.component';


const routes: Routes = [{path: 'news',  component: NewsdataComponent},
                        { path: '*', component: NewsdataComponent },

];


@NgModule({
  imports: [
  RouterModule.forChild(routes)],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [RouterModule]
})
export class NewsdataRoutingModule { }
