import { AuthService } from './../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
     LoginRoutingModule,
     CommonModule,
     FormsModule
  ],
  declarations: [ LoginComponent,RegisterComponent ],
  providers:[
    AuthService
  ]
})
export class LoginModule { }
