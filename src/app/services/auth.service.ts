import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable()
export class AuthService {

     constructor() { }

     login(user) {
          var promise = new Promise((resolve, reject) => {
               firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((res) => {
                    resolve({ error: false, uid: res.uid });
               }).catch((err) => {
                    reject({ error: true, message: err.message });
               })
          })

          return promise;
     }

     setAuthKey(authKey) {

          localStorage.setItem('auth', authKey);
     }

     getAuthKey() {
          return localStorage.getItem('auth');
     }

     removeAuthKey() {
          localStorage.removeItem('auth');
     }
}