import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from '../services/authen.service';
import { AppURL } from '../app.url';
import { AuthURL } from '../authentication/authentication.url';

@Injectable({
    providedIn: 'root'
})
export class UnauthenticationGuard implements CanActivate {
    constructor(
        private authen: AuthenService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authen.getAuthenticated()) {
            this.router.navigate(['/', AppURL.Authen, AuthURL.Dashboard]);
            return false;
        }
        return true;
    }
}
