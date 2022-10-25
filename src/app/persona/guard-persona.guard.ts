import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GuardPersonaGuard implements CanActivate {
  constructor(private router : Router ){}

  noLogin(): any {
      this.router.navigate(['']);
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const validacion = localStorage.getItem('persona');
        if(validacion){
          return true //Puede pasar
        }else{
          this.noLogin()
          return false //No podrá ver la vista y sera redirigido al login
        }
  }

}
