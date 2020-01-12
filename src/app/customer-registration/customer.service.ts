import { Injectable } from '@angular/core';
import { CustomerRegistrationComponent } from './customer-registration.component';
import { Customer } from './customer.model';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpclnt:HttpClient) {
    
  }

  getCustomer():Observable <any>{
      return this.httpclnt.get("http://localhost:8080/get?firstName=Ruchika")
  }
  createCustomer(custo:Customer):Observable <any>{
    return this.httpclnt.post("http://localhost:8080/create",custo)
}
  printToConsole(custo:Customer ){
    console.log(custo.firstName+":"+custo.lastName+":"+custo.addressLines+":"+custo.city+":"+custo.state);
  } 

   

}