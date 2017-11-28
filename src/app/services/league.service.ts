import { Broadcatser } from './../shared/broadcaster';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable()
export class LeagueService {
  leagueRef = firebase.database().ref('/leagues');
  predictionsRef = firebase.database().ref("/predictions");
  leagueArray: any[] = [];
  predictions: any[] = [];
  constructor(private events: Broadcatser) { }

  addLeague(league) {
    var promise = new Promise((resolve, reject) => {
      this.leagueRef.push({
        name: league.name,
        flag: league.flag
      }).then(() => {
        resolve(true);
      }, (err) => {
        reject(err);
      })
    })

    return promise;
  }

  addPrediction(prediction) {

    var promise = new Promise((resolve, reject) => {
      this.predictionsRef.push({
        leagueName: prediction.leagueName,
        awayTeam: prediction.awayTeam,
        homeTeam: prediction.homeTeam,
        homeScore: prediction.homeScore,
        awayScore: prediction.awayScore,
        status: prediction.status,
        tip: prediction.tip,
        kickOff: prediction.kickOff,
        timeStamp: prediction.timeStamp,
        realDate: prediction.realDate
      }).then(() => {
        resolve(true);
      }, (err) => {
        console.log(err);
        reject(err);
      })
    });

    return promise;
  }

  updatePrediction(prediction, id) {

    var promise = new Promise((resolve, reject) => {
      this.predictionsRef.child(id).set({
        leagueName: prediction.leagueName,
        awayTeam: prediction.awayTeam,
        homeTeam: prediction.homeTeam,
        homeScore: prediction.homeScore,
        awayScore: prediction.awayScore,
        status: prediction.status,
        tip: prediction.tip,
        kickOff: prediction.kickOff,
        timeStamp: prediction.timeStamp,
        realDate: prediction.realDate
      }).then(() => {
        resolve(true);
      }, (err) => {
        console.log(err);
        reject(err);
      })
    });

    return promise;
  }

  //getPredictions
  getPredictions() {
    this.predictionsRef.on('value', (snapshot) => {
      this.predictions = [];
      if (snapshot.val() != null) {
        var tempLeague = snapshot.val();
        for (var key in tempLeague) {
          var newLeague = {
            _id: key,
            leagueName: tempLeague[key].leagueName,
            awayTeam: tempLeague[key].awayTeam,
            homeTeam: tempLeague[key].homeTeam,
            homeScore: tempLeague[key].homeScore,
            awayScore: tempLeague[key].awayScore,
            status: tempLeague[key].status,
            tip: tempLeague[key].tip,
            kickOff: tempLeague[key].kickOff,
            timeStamp: tempLeague[key].timeStamp,
            realDate: tempLeague[key].realDate
          }
          this.predictions.push(newLeague);
        }
        this.events.broadcast('predictions_loaded', this.predictions);
      }

    })
  }

  getLeagues() {
    this.leagueRef.on('value', (snapshot) => {
      this.leagueArray = [];
      if (snapshot.val() != null) {
        var tempLeague = snapshot.val();
        for (var key in tempLeague) {
          var newLeague = {
            _id: key,
            name: tempLeague[key].name,
            flag:tempLeague[key].flag
          }
          this.leagueArray.push(newLeague);
        }

        this.events.broadcast("leagReady", this.leagueArray);

      }

    })
  }

  updateLeague(league, id) {

    var promise = new Promise((resolve, reject) => {
      this.leagueRef.child(id).set({
        name: league.name,
        flag: league.flag
      }).then(() => {
        resolve(true);
      }, (err) => {
        console.log(err);
        reject(err);
      })
    });

    return promise;

  }




}