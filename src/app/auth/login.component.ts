import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import swal from 'sweetalert2';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  showRegister: boolean = false;
  data: any = {};
  constructor(private router: Router, private authSrv: AuthService) {
    this.showRegister = false;
  }

  register() {
    this.router.navigate(['/auth/register']);
  }

  onloginClicked(): void {
    this.loginUser();
  }

  loginUser() {
    let body = {
      email: this.data.email,
      password: this.data.password
    };

    this.authSrv.login(body).then((res:any) => {
      this.authSrv.setAuthKey(res.uid);
      this.router.navigate(['/dashboard']);
    }, (err) => {
      swal(
        'Oops...',
        err.message + '!',
        'error'
      )
      //alert(err.message);
    });

    // firebase.auth().signInWithEmailAndPassword(body.email, body.password).then((res) => {

    // }, (err) => {
    //   alert(err.message);
    //   //console.log("ERR",JSON.stringify(err,null,3));
    // });


  }

}
