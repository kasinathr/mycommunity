import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../customer-registration/customer.model';
import { Observable, of, from, config } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { Tokens } from '../model/tokens';
import { Config } from '../config';
import { AlertService } from 'src/app/services/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    loggedUser: string;
    loading: boolean;
   

    isLoggedin() {
        throw new Error("Method not implemented.");
    }
    
    constructor(private http: HttpClient, private alertService:AlertService ) { }

    login(user:{username:string,password:string} ): Observable<boolean> {
        console.log("The passed user is"+user.username)
       return this.http.post<any>("http://localhost:8080/authentication", user)
        .pipe(
            tap(tokens => this.doLoginUser(user.username, tokens)),
            mapTo(true),
            catchError(error =>{
                console.log("Error"+error)
                this.alertService.error(error)
                this.loading = false;
                return of (false);
            }));
        }

/*error => {
                console.log("Error Happned"+error.status+error.message+error.code);
                alert(error.message);
                return of(false);
            }*/
        logout(){
            this.doLogoutUser();
        }

        refresh() {
        return this.http.post<any>("http://localhost:8080/logout", {
            'refreshToken': this.getRefreshToken()
        }).pipe(
            tap(() => this.doLogoutUser()),
            mapTo(true),
            catchError(error => {
            console.log("Error"+error)
            this.alertService.error(error)
            this.loading = false;
            return of(false);
            }));
        }
    
        isLoggedIn() {
        return !!this.getJwtToken();
        }
    
        refreshToken() {
        return this.http.post<any>("http://localhost:8080/refreshToken", {
            'refreshToken': this.getRefreshToken()
        }).pipe(tap((tokens: Tokens) => {
            this.storeJwtToken(tokens.jwt);
        }));
        }
    
        getJwtToken() {
        return localStorage.getItem("token");
        }
    
        private doLoginUser(username: string, tokens: Tokens) {
        console.log(tokens)
        this.loggedUser = username;
        this.storeTokens(tokens);
        }
    
        private doLogoutUser() {
        this.loggedUser = null;
        this.removeTokens();
        }
    
        private getRefreshToken() {
        return localStorage.getItem("refresh");
        }
    
        private storeJwtToken(jwt: string) {
        localStorage.setItem("token", jwt);
        }
    
        private storeTokens(tokens: Tokens) {
        console.log("The Actual token is"+tokens.jwt)
        localStorage.setItem("token",tokens.jwt);
        //localStorage.setItem("refresh", tokens.refreshToken);
        }
    
        private removeTokens() {
       //     alert("Remove Token")
        localStorage.removeItem("token");
       // alert(localStorage.getItem("token"));
        //localStorage.removeItem("refresh");
        }
  }