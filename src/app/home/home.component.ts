import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { CommunityClass } from '../community-class/community-class.model';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  commClass: CommunityClass = new CommunityClass();
  dataSource:any;

  //constructor(private alertService: AlertService ,private formBuilder: FormBuilder,private _customerService:CustomerService,private _router: Router) {

  constructor(private customerService:CustomerService,private _router: Router) {}

  displayedColumns: string[] = ["className","classDescription","ageGroup","classLocation","classTime","classCapacity","classTeacher","classLevel","classPrice","_id"];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  register1Class(element:any){
    console.log("The id is"+JSON.stringify(element));
    this._router.navigateByUrl('/classreg')
    
  }
  
  ngOnInit() {
    this.customerService.getCommClass().subscribe(
        data => {
            console.log("The data retrived is"+JSON.stringify(data))
            this.dataSource = new MatTableDataSource(data);

        },
        error => {
           //Do nothing collect all data 
        });
  }

}
