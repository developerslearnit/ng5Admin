import { AuthGuard } from './../shared/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredictionComponent } from './predictions.component';

const routes: Routes = [
     {
          path: '',
          children:[
               {
                    path:'predictions',
                    component:PredictionComponent,
                    canActivate: [AuthGuard],
               }
          ]


     },
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule],
})
export class PredictionRoutingModule { }

