import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor(private autheticationService:AuthenticationService,private router:Router) { }
  logout(){
    alert("logout called")
    this.autheticationService.logout();
  }
  ngOnInit() {
    
  }

}
