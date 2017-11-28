import { Broadcatser } from './../shared/broadcaster';
import { UtilService } from './../shared/Utils.service';
import { LeagueService } from './../services/league.service';
import { LoadingService } from './../shared/loading-service';
import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import swal from 'sweetalert2';
import * as firebase from 'firebase';
@Component({
     templateUrl: 'predictions.component.html'
})

export class PredictionComponent implements OnInit {
    //  leagueRef = firebase.database().ref('/leagues');
    //  predictionsRef = firebase.database().ref("/predictions");

     display: boolean = false;
     data: any = {};
     leagueArray: any[] = [];
     predictions: any[] = [];
     isUpdate: boolean = false;
     itemId:any;
     constructor(private loadingSrv: LoadingService,
          private leagueSrv: LeagueService, 
          private utilSrv: UtilService,
          private events:Broadcatser) {
          this.isUpdate = false;
     }

     ngOnInit() {
          this.getPredictions();
          this.getLeagues();

     }

     showDialog() {
          this.isUpdate = false;
          this.clearControls();
          this.display = true;
     }


     savePrediction() {
          this.loadingSrv.show();

          var body = {
               leagueName: this.data.leagueName,
               awayTeam: this.data.awayTeam,
               homeTeam: this.data.homeTeam,
               homeScore: this.data.homeScore,
               awayScore: this.data.awayScore,
               status: this.data.status,
               tip: this.data.tip,
               kickOff: this.data.kickOffTime,
               realDate: this.utilSrv.formatJsonDate(this.data.date),
               timeStamp: (new Date(this.data.date).getTime() / 1000)
          };

          if (!this.isUpdate) {

               this.leagueSrv.addPrediction(body).then((res) => {
                    
                    this.clearControls();
                    this.loadingSrv.hide(1000);
                    swal(
                        'Good job!',
                        'League has been created !',
                        'success'
                      )
               }, (err) => {
                   
                    this.loadingSrv.hide(1000);
                    swal(
                        'Oops...',
                        err.message + '!',
                        'error'
                      )
               });
          } else {

               this.leagueSrv.updatePrediction(body,this.itemId).then((res) => {
                    this.clearControls();
                    this.loadingSrv.hide(1000);
                    swal(
                        'Good job!',
                        'League has been created !',
                        'success'
                      )
               }, (err) => {
                   
                    this.loadingSrv.hide(1000);
                    swal(
                        'Oops...',
                        err.message + '!',
                        'error'
                      )
               });
               
          }


     }

     getLeagues() {
          this.loadingSrv.show();
          this.leagueSrv.getLeagues();
          this.events.on<Array<any>>("leagReady").subscribe((data)=>{
            this.leagueArray = data;
            this.loadingSrv.hide(2000);
          });
    
     }

     getPredictions() {
          this.loadingSrv.show();
          this.leagueSrv.getPredictions();
          this.events.on<Array<any>>("predictions_loaded").subscribe((data)=>{
            this.predictions = data;
            this.loadingSrv.hide(2000);
          });         
         
     }

     editPrediction(indx) {
          
          var targetItem = this.predictions[indx];
          var dd = targetItem.realDate.split('/');
          var yy = Number.parseInt(dd[2]);
          var d  =Number.parseInt(dd[0]);
          var m = (Number.parseInt(dd[1])-1);
          this.data.leagueName = targetItem.leagueName;
          this.data.awayTeam = targetItem.awayTeam;
          this.data.homeTeam = targetItem.homeTeam;
          this.data.homeScore = targetItem.homeScore;
          this.data.awayScore = targetItem.awayScore;
          this.data.status = targetItem.status;
          this.data.tip = targetItem.tip;
          this.data.kickOffTime = targetItem.kickOff;
          this.data.date = new Date(yy,m,d);
          this.itemId = targetItem._id;
          this.isUpdate=true;
          this.display = true;
     }

     clearControls(){
          this.data.leagueName = '';
          this.data.awayTeam = '';
          this.data.homeTeam = '';
          this.data.homeScore = '';
          this.data.awayScore = '';
          this.data.status = '';
          this.data.tip = '';
          this.data.kickOffTime = '';
          this.data.date = '';
     }
}