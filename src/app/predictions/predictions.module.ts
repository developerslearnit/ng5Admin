import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//import {  ModalBackdropComponent } from 'ngx-bootstrap';
import {
  DataTableModule, SharedModule, DialogModule,
  DropdownModule, CheckboxModule, TabViewModule, CalendarModule, AccordionModule
} from 'primeng/primeng';
import { PredictionComponent } from './predictions.component';
import { PredictionRoutingModule } from './predictions-routing.module';

@NgModule({
  imports: [
    PredictionRoutingModule,
    CommonModule ,
    FormsModule,
    DataTableModule,
    DialogModule,
    CalendarModule
  ],
  declarations: [ PredictionComponent ]
})
export class PredictionModule { }
