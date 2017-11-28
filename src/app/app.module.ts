import { Broadcatser } from './shared/broadcaster';
import { UtilService } from './shared/Utils.service';

import { LoadingService } from './shared/loading-service';
import { LeagueService } from './services/league.service';
import { CountriesService } from './services/countries.service';

import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './shared/auth.guard';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import * as firebase from 'firebase/app';
import { config } from './fb.config';
// Routing Module
import { AppRoutingModule } from './app.routing';


// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

firebase.initializeApp(config);

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    
  ],
  providers: [
    AuthGuard,
    LoadingService,
    AuthService,
    CountriesService,
    LeagueService,
    UtilService,
    Broadcatser
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
// {
//   provide: LocationStrategy,
//   useClass: HashLocationStrategy
// }