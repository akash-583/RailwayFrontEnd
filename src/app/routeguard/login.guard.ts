import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router)
  {}
  canActivate(){
    var isTrue = sessionStorage.getItem('loggedIn');

    if (isTrue && isTrue === 'true') {
        return true;
    } else {
        // Redirect to error route or handle invalid case
        // For example:
        
            this.router.navigate(['/error']);
         // else, do something else if 'loggedIn' is not set
        return false;
    }
  
  }
  
}
