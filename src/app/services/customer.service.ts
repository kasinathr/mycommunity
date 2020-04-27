import { Injectable } from '@angular/core';
import { CustomerRegistrationComponent } from '../customer-registration/customer-registration.component';
import { Customer } from '../customer-registration/customer.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mapTo, tap, catchError } from 'rxjs/operators';
import {CommunityClass} from '../community-class/community-class.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getCommClass():Observable <any> {
    return this.http.get("http://localhost:8080/commClass").
    pipe(
      tap(data => mapTo(data),
    catchError(error =>{
      console.log("Error"+error)
      return of(error)
  })));  }
  
  createClass(commClass: CommunityClass) :Observable <any>{
    return this.http.post("http://localhost:8080/createClass",commClass)
    //throw new Error("Method not implemented.");
  }
  
  createCoach(custo: Customer):Observable <any> {
    console.log(custo)
    return this.http.put("http://localhost:8080/updateCustomer",custo)
    }

  constructor(private http:HttpClient) {
    
  }
//.pipe(tap(tokens => this.doLoginUser(user.username, tokens))
  //getCustomer(registredUserId:string):Observable <any>{
    getCustomer(username:string):Observable <any>{
      return this.http.get("http://localhost:8080/getCustomer?email="+username).
      pipe(
        tap(data => mapTo(data),
      catchError(error =>{
        console.log("Error"+error)
        return of(error)
    })));
  }
  createCustomer(custo:Customer):Observable <any>{
    console.log(custo)
    return this.http.post("http://localhost:8080/create",custo)
}
  printToConsole(custo:Customer ){
    console.log(custo.user.firstName+":"+custo.user.lastName+":");
  } 

   

}