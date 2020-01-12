import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer-registration/customer.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    constructor(private http: HttpClient) { }




    login(custo:Customer):Observable <any> {
      
        return this.http.post<any>("http://localhost:8080/authenticate", custo)
            .pipe(user => {
                // login successful if there's a jwt token in the response
                if (user) {// autheticate 
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
           /*
           return {"email":username,
           "password":password
          }*/
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
  }