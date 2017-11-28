import { Broadcatser } from './../shared/broadcaster';
import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';

@Injectable()
export class CountriesService {
     countryRef = firebase.database().ref('/countries');
     countryArray: any[];
     constructor(private events: Broadcatser) { }

     getCountries() {
          this.countryRef.on('value', (snapshot) => {
               this.countryArray = [];
               if (snapshot.val() != null) {
                    var tempCountry = snapshot.val();
                    for (var key in tempCountry) {
                         var newgroup = {
                              _id: key,
                              name: tempCountry[key].name,
                              flag: tempCountry[key].flag
                         }
                         this.countryArray.push(newgroup);
                    }

                    this.events.broadcast("countries_ready",this.countryArray);
               }

          })
     }

}