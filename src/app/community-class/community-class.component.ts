import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Customer } from '../customer-registration/customer.model';
import { AlertService, CustomerService } from '../services';
import { Router } from '@angular/router';
import * as category from '../model/category.json';
import { CommunityClass } from './community-class.model';

@Component({
  selector: 'app-community-class',
  templateUrl: './community-class.component.html',
  styleUrls: ['./community-class.component.css']
})
export class CommunityClassComponent implements OnInit {

  isLinear = false;
  classForm: FormGroup;
  secondFormGroup: FormGroup;
  commClass: CommunityClass = new CommunityClass();

  classLevelOption: any  = [
    {"abbreviation": "BSK", "name": "Basic"},
    {"abbreviation": "IMP", "name": "Improved"},
    {"abbreviation": 'IMPP', "name": "Improved+"},
    {"abbreviation": 'EXPT', "name": "Expert"}
  ];
  ageGroupOption: any  = [
    {"abbreviation": "K12G", "name": "K 1-2"},
    {"abbreviation": "G12G4", "name": "Grade 1-4"},
    {"abbreviation": "G52G7", "name": "Grade 5-7"},
    {"abbreviation": "G92G12", "name": "Grade 9-12"},
    {"abbreviation": "ADLT", "name": "Adult"}
  ];
  classCategoryOption:any = (category as any).default;

  constructor(private alertService: AlertService ,private _formBuilder: FormBuilder,private _customerService:CustomerService,private _router: Router) {
  
    this.classForm = this._formBuilder.group({
      className: ['', Validators.compose([Validators.pattern(this.stringPattern), Validators.required])],
      classDescription: ['', Validators.compose([Validators.required])],
      classCategory: ['', Validators.compose([Validators.pattern(this.stringPattern),  Validators.required])],
      ageGroup: ['', Validators.compose([Validators.pattern(this.stringPattern),  Validators.required])],
      //seasson: ['', Validators.compose([Validators.pattern(this.stringPattern),Validators.required])],
      classLocation: ['', Validators.compose([Validators.required])],
      classTime: ['', Validators.compose([Validators.required])],
      classCapacity: ['', Validators.compose([Validators.pattern(this.stringPattern), Validators.required])],
      classTeacher: ['', Validators.compose([Validators.required])],
      classLevel: ['', Validators.compose([Validators.pattern(this.stringPattern), Validators.required])],
      classPrice: ['', Validators.compose([Validators.pattern(this.stringPattern),  Validators.required])],

    });
/*
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
    });
  */
  }

  loading = false;
  submitted = false;
  timePattern="/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/";
  stringPattern ="^[a-zA-Z0-9_]*$";
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
   console.log("On submit called first:"+JSON.stringify(this.classForm.value));
   
    
// stop here if form is invalid
    if (this.classForm.invalid ) {
      this.alertService.error("Invalid Data");
        return;
    }
  console.log(this.submitted)
  
 //console.log("Customer Constructed before submit:"+JSON.stringify(this.classForm))

    this.loading = true;
    this.commClass = this.classForm.value;

    this._customerService.createClass(this.commClass)
        .subscribe(
            data => {
                this.alertService.success('Class Created successfully', true);
                console.log("Submited successfully"+data)
                this._router.navigate(['/home']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });

  }

  get f() { return this.classForm.controls; }

  ngOnInit() {
    //pre fill user details.
    
  }

}



