import { Component, OnInit, Input } from '@angular/core';
import { Customer } from './customer.model';
import { CustomerService } from '../services/customer.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder ,EmailValidator} from '@angular/forms';
import { AlertService } from '../services/alerts.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  customer1: Customer = new Customer();
  registerForm: FormGroup;
  custLocal:any;
  loading = false;
  submitted = false;
  namePattern = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  datePattern = "(0[1-9]|1[0-2])\\/(0[1-9]|1\\d|2\\d|3[01])\\/(19|20)\\d{2}$";
  ssnPattern = "^(?!000|666)[0-9]{3}([ -]?)(?!00)[0-9]{2}\\1(?!0000)[0-9]{4}$";
  addressPattern ="\\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\\.?";
  zipcodePattern = "^(\\d{5}(-\\d{4})?|[A-Z]\\d[A-Z] *\\d[A-Z]\\d)$";
  cityPattern = "^[a-zA-Z',.\\s-]{1,25}$";
  phonePattern = "^\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}$";
  moneyPattern = "^\\$?(\\d{1,3}(\\,\\d{3})*|(\\d+))(\\.\\d{2})?$";
  
  @Input('customer') custObj: Customer;


  createCustomer() {
   
    console.log("create Customer called"+this.customer1.user.firstName);
    this._customerService.createCustomer(this.customer1).subscribe(
      data=>{
        this.customer1 = data;
        this._router.navigateByUrl('/login');

      },
      error => {
        this.alertService.error(error);
        this.loading = false;
    }
    );

  }

   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

  /*
callService(){

//this._customerService.printToConsole(this.customer1);
  this._customerService.getCustomer().subscribe
  (
    data=>{
  this.customer1 = data;
  this.customer1.firstName = data.firstName
  this.customer1.lastName = data.lastName
  this.customer1.middleInitial = data.middleInitial
  this.customer1.addressLines = data.addressLines
  this.customer1.phoneNumber = data.phoneNumber
  this.customer1.password = data.password.
  //this.customer1.addressLines[1] = this.addressLines[1]
  this.customer1.city = data.city;
  this.customer1.state = data.state;
  console.log(data.firstName+":"+data.lastName+":"+data.addressLines+":"+data.city+":"+data.state);

    }
  );

  }*/
  constructor(private alertService: AlertService ,private formBuilder: FormBuilder,private _customerService:CustomerService,private _router: Router) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.pattern(this.namePattern), Validators.minLength(3), Validators.required])],
      lastName: ['', Validators.compose([Validators.pattern(this.namePattern), Validators.minLength(3), Validators.required])],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.compose([Validators.pattern(this.phonePattern), Validators.required])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role:["USER"]
      
  });
    
   }

  ngOnInit() {
      

  }

  onSubmit() {
    this.submitted = true;
    console.log("Forrm Validity"+this.registerForm.invalid);
    console.log("Submitted value"+this.submitted);
// stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
  console.log(this.submitted)
    this.custLocal = this.registerForm.value;
    this.custLocal.role = ["USER"];
    
    this.loading = true;
    this._customerService.createCustomer(this.custLocal)
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                console.log("Submited successfully"+data)
                this._router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}


}