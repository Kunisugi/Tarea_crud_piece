import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RefreshGuard implements CanActivate {
  constructor(private router : Router ){}

  siLogin():any{
    this.router.navigate(['/home'])
}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const validacion = localStorage.getItem('persona');
      if(validacion) {
          this.siLogin()
          return false// Si tiene datos es por que está logueado entonces volverá al home
      }else{
          return true //Si no está logueado podrá ver la vista
      }
  }

}
