import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {UserloginserviceService} from './../services/userloginservice.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

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
  
    doadminlogin(){
      this.status = this.loginserv.doadminlogin(this.loginForm.value.Email, this.loginForm.value.password).subscribe
      (data => {
          if(data == "Success"){
            sessionStorage.setItem('role',"admin");
            alert('Login Sucessful')
            this.router.navigate(['/admin']);
          }
        
          else{
            alert("Invalid email or password! Try again");
          }
          })
        }

}
