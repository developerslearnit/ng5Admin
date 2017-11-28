import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {
  DataTableModule, SharedModule, DialogModule,
  DropdownModule, CheckboxModule, TabViewModule, CalendarModule, AccordionModule
} from 'primeng/primeng';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    CommonModule ,
    FormsModule,
    DataTableModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
