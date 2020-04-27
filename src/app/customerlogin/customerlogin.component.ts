import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';
import { AlertService } from '../services/alerts.service';



@Component({
  selector: 'app-customerlogin',
  templateUrl: './customerlogin.component.html',
  styleUrls: ['./customerlogin.component.css']
})
export class CustomerloginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
       // email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        username: ['', Validators.required]
        
      });

      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      console.log("For Valid?"+this.loginForm.invalid);

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      console.log("Submitted");
      this.loading = true;
      console.log(this.loginForm.value);
      this.authenticationService.login(this.loginForm.value)
      .subscribe(
              data => {
              console.log("login success?"+data)                 
                // this.router.navigate([this.returnUrl]);
                if(data){
                alert("Hi");
                 this.router.navigate(['/home']);
                 }
              });
  }
}
