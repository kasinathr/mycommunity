import { Component, OnInit } from '@angular/core';
import { AlertService, CustomerService } from '../services';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../customer-registration/customer.model';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FamilyMember } from '../customer-registration/family.member.model ';


@Component({
  selector: 'app-profile1',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customer:Customer;
  profileForm:FormGroup;
  familyFormGroup:FormGroup;
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
  
  constructor(private alertService: AlertService ,private _formBuilder: FormBuilder,private _customerService:CustomerService,private _router: Router)
   {
    this.profileForm = this._formBuilder.group({
      hfirstName: ['', Validators.compose([Validators.pattern(this.namePattern), Validators.minLength(3), Validators.required])],
      hlastName: ['', Validators.compose([Validators.pattern(this.namePattern), Validators.minLength(3), Validators.required])],
      familyMembers:this._formBuilder.array([this.addFamilyMemberGroup()]),
      });
    }
    addFamilyMemberGroup(){
      return this._formBuilder.group({
        firstName: ['', Validators.compose([Validators.pattern(this.namePattern), Validators.minLength(3), Validators.required])],
        lastName: ['', Validators.compose([Validators.pattern(this.namePattern), Validators.minLength(3), Validators.required])],
        dateOfBirth: ['', Validators.compose([Validators.required])],
        relation  :['', Validators.compose([Validators.required])],
      });
    }
    get familyMembersArray(){
      return <FormArray>this.profileForm.get('familyMembers');
    }
    addForm(){
      this.familyMembersArray.push(this.addFamilyMemberGroup());
    }

    removeForm(index){
      this.familyMembersArray.removeAt(index);
     }
  ngOnInit(){
    
    console.log("OnIniit");
    this._customerService.getCustomer("bbb@bbb.com").subscribe(
      data => {
          console.log("The data retrived is"+JSON.stringify(data))
          this.customer = data;
      },
      error => {
         //Do nothing collect all data 
      });
  }
  
  onSubmit(){
    //pre fill user details.
    console.log(this.profileForm.value);
    
  }
  
  
  
  }