import { AuthService } from './../services/auth.service';
import {
     Router, CanActivate, ActivatedRouteSnapshot,
     RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
     private canEnter: boolean = false;
     constructor(private router: Router,
     private authSrv:AuthService) { }

     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
          
          if(this.authSrv.getAuthKey()){
               return true;
          }
         this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          return false;
     }
}