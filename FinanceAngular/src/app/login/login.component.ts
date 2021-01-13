import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {UserloginserviceService} from './../services/userloginservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public sessionStorage = sessionStorage;
  Email:string="";
  password:string="";
  loginForm : FormGroup;
  status : any;
  constructor(private formBuilder : FormBuilder, 
    private loginserv :UserloginserviceService , private router: Router) {}

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        Email : new FormControl('',[Validators.email, Validators.required]),
        password : new FormControl('',[Validators.required, Validators.minLength(6)])
      })
    }
    get h(){
      return this.loginForm.controls;
    }
  
    doLogin(){
      this.status = this.loginserv.doLogin(this.loginForm.value.Email, this.loginForm.value.password).subscribe
      (data => {
          if(data == "Success"){
            sessionStorage.setItem('Email',this.loginForm.value.Email);
            sessionStorage.setItem('password',this.loginForm.value.password);
            sessionStorage.setItem('role',"user");
            alert('Login Sucessful')
            this.router.navigate(['/dashboard']);
          }
          else if(data == "yet to get approved"){
            alert("Wait for approval");
          }
          else if(data == "Request Rejected"){
            alert("Application Rejected! Contact the Admin.");
          }
          else{
            alert("Invalid email or password! Try again");
          }
          })
        }
}
