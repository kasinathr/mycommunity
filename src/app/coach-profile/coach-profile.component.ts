import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Customer } from '../customer-registration/customer.model';
import { AlertService, CustomerService } from '../services';
import { Router } from '@angular/router';
import * as data from '../model/state.json';


@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.css']
})
export class CoachProfileComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  registredUserId: any;
  coachType: any  = [
    {value: 'YGA', viewValue: 'Yoga'},
    {value: 'TRV', viewValue: 'Travel'},
    {value: 'CMT', viewValue: 'Computer'}
  ];
  states:any = (data as any).default;
  constructor(private alertService: AlertService ,private _formBuilder: FormBuilder,private _customerService:CustomerService,private _router: Router) {
  
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.compose([Validators.pattern(this.namePattern), Validators.minLength(3), Validators.required])],
      lastName: ['', Validators.compose([Validators.pattern(this.namePattern), Validators.minLength(3), Validators.required])],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.compose([Validators.pattern(this.phonePattern), Validators.required])],
      role:['USER'],
      });

      this.secondFormGroup = this._formBuilder.group(
        {
        addressLines: ['', Validators.compose([Validators.minLength(3), Validators.required])],
        city: ['', Validators.compose([Validators.pattern(this.cityPattern), Validators.minLength(3), Validators.required])],
        state: ['', Validators.required],
        zipCode: ['', Validators.compose([Validators.pattern(this.zipcodePattern), Validators.minLength(3), Validators.required])],
          
        }),
       
     this.thirdFormGroup = this._formBuilder.group({
      Ctype:['', Validators.required],
      description:['', Validators.required],// detail description of Coaching
      credential:['', Validators.required], // Certification if they have
      experience:['']
    //picture_URI:string ;//location of picture
    //idType:string; //type of ID ..DL , StateID etc
    //idCopy_URI:string;//lcoation of id copy 
    //reference:string;//web site link
    });
  
  }
  customer1: Customer = new Customer();
  loading = false;
  submitted = false;
  namePattern = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  datePattern = "(0[1-9]|1[0-2])\\/(0[1-9]|1\\d|2\\d|3[01])\\/(19|20)\\d{2}$";
  ssnPattern = "^(?!000|666)[0-9]{3}([ -]?)(?!00)[0-9]{2}\\1(?!0000)[0-9]{4}$";
  //addressPattern ="\\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\\.?";
  addressPattern ="^\d(([A-Za-z0-9.-]+[ ])+)|(Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St|N|E|S|W|NE|SE|SW|NW)$";
  zipcodePattern = "^(\\d{5}(-\\d{4})?|[A-Z]\\d[A-Z] *\\d[A-Z]\\d)$";
  cityPattern = "^[a-zA-Z',.\\s-]{1,25}$";
  phonePattern = "^\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}$";
  moneyPattern = "^\\$?(\\d{1,3}(\\,\\d{3})*|(\\d+))(\\.\\d{2})?$";

  onSubmit(){
    this.submitted = true;
   console.log("On submit called first:"+JSON.stringify(this.firstFormGroup.value));
   console.log("On submit called second:"+JSON.stringify(this.secondFormGroup.value));
   console.log("On submit called third:"+JSON.stringify(this.thirdFormGroup.value));

// stop here if form is invalid
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid) {
      this.alertService.error("Invalid Data");
        return;
    }
  console.log(this.submitted)
  this.customer1 = this.firstFormGroup.value;
  this.customer1.role = ["COACH"];
  this.customer1.address = this.secondFormGroup.value;
  this.customer1.coach = this.thirdFormGroup.value;
  console.log("Customer Constructed before submit:"+JSON.stringify(this.customer1))

    this.loading = true;
    this._customerService.createCoach(this.customer1)
        .subscribe(
            data => {
                this.alertService.success('Coach Profile Created successfully', true);
                console.log("Submited successfully"+data)
                this._router.navigate(['/home']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });

  }

  get f() { return this.firstFormGroup.controls; }
  get f1() { return this.secondFormGroup.controls; }


  ngOnInit() {
    //pre fill user details.
    this._customerService.getCustomer("bbb@bbb.com")
    .subscribe(
        data => {
            this.alertService.success('Retrieve Customer successful', true);
            console.log("Submited successfully"+data.firstName)
            //this.firstFormGroup.firstName
            this.firstFormGroup.get('firstName').setValue(data.firstName);
            this.firstFormGroup.get('lastName').setValue(data.lastName);
            this.firstFormGroup.get('phoneNumber').setValue(data.phoneNumber);
            this.firstFormGroup.get('email').setValue(data.email);
           
            this.secondFormGroup.get('addressLines').setValue(data.address.addressLines);
            this.secondFormGroup.get('city').setValue(data.address.city);
            this.secondFormGroup.get('state').setValue(data.address.state);
            this.secondFormGroup.get('zipCode').setValue(data.address.zipCode);

            this.thirdFormGroup.get('Ctype').setValue(data.coach.Ctype);
            this.thirdFormGroup.get('credential').setValue(data.coach.credential);
            this.thirdFormGroup.get('experience').setValue(data.coach.experience);
            this.thirdFormGroup.get('description').setValue(data.coach.description);
        },
        error => {
           //Do nothing collect all data 
        });
    
  }

}
