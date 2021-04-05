import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, IAuthStatus } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  protected currentAuthStatus: IAuthStatus;
  constructor(private authService:AuthService, private router: Router){
    this.authService.authStatus.subscribe(
      authStatus=>(this.currentAuthStatus=this.authService.getAuthStatus())
    );

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin();
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkPermission(childRoute)
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkPermission(route);
  }

  protected checkLogin(){
    if (this.authService.getToken()==null || this.authService.getToken()===''){
      alert('You must login to continue');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  protected checkPermission(route?: ActivatedRouteSnapshot){
    let roleMatch=true;

    if (route) {
      const expectedRole = route.data.expectedRole;
      if (expectedRole) {
        roleMatch= this.currentAuthStatus.role===expectedRole;
      }
    }
    if (!roleMatch) {
      alert('Do you not have the permissions to view this resource');
      return false;
    }
    return true;
  }
  
}
