import { Broadcatser } from './../shared/broadcaster';
import { LoadingService } from './../shared/loading-service';
import { LeagueService } from './../services/league.service';
import { CountriesService } from './../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'dashboard.component.html'
})


export class DashboardComponent implements OnInit {
  leagueRef = firebase.database().ref('/leagues');
  countryRef = firebase.database().ref('/countries');
  leagueArray: Array<any> = [];
  countries: any;
  isLoaded = false;
  data: any = {};
  isUpdate: boolean = false;
  leagueId: any;
  constructor(private countrySrv: CountriesService,
    private leagueSrv: LeagueService,
    private loadingSrv: LoadingService,
    private events: Broadcatser) {
    this.isUpdate = false;

  }

  ngOnInit() {
    this.getCountries();
    this.getLeagues();
  }

  getCountries() {
    this.loadingSrv.show();
    this.countrySrv.getCountries();
    this.events.on<Array<any>>("countries_ready").subscribe((data) => {
      this.countries = data;
    });
  }

  saveLeague() {
    var league = {
      name: this.data.country + "-" + this.data.leagueName,
      flag: this.data.flag
    };

    if (this.isUpdate == false) {
      this.leagueSrv.addLeague(league).then((res) => {
        this.data.leagueName = '';
        this.data.flag = '';
        swal(
          'Good job!',
          'League has been created !',
          'success'
        )
      }, (err) => {
        swal(
          'Oops...',
          err.message + '!',
          'error'
        )
      });

    } else {
      this.updateLeague();
    }


  }

  updateLeague() {
    var league = {
      name: this.data.country + "-" + this.data.leagueName,
      flag: this.data.flag
    };

    this.leagueSrv.updateLeague(league, this.leagueId).then((res) => {
      this.data.leagueName = '';
      this.data.flag = '';
      this.leagueId = '';
      swal(
        'Good job!',
        'League has been updated !',
        'success'
      )
    }, (err) => {
      swal(
        'Oops...',
        err.message + '!',
        'error'
      )
    }).catch((err) => {
      swal(
        'Oops...',
        err.message + '!',
        'error'
      )
    });
  }

  getLeagues() {
    this.loadingSrv.show();
    this.leagueSrv.getLeagues();
    this.events.on<Array<any>>("leagReady").subscribe((data) => {
      this.leagueArray = data;
      this.loadingSrv.hide(1000);
    });

  }

  editLeague(indx) {
    let currLeague = this.leagueArray[indx];
    this.leagueId = currLeague._id;
    this.data.country = currLeague.name.split('-')[0];
    this.data.leagueName = currLeague.name.split('-')[1];
    this.data.flag = currLeague.flag;
    this.isUpdate = true;
    console.log("currLeague", currLeague);
  }







}
