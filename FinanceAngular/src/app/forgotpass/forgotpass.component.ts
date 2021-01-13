import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserloginserviceService} from './../services/userloginservice.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  status:any;
  email:string="";
  password:string="";
  phonenumber:string="";
  constructor(private forgotpass: UserloginserviceService, http: HttpClient, private router:Router) { }

  checkKey() {
    
    this.status = this.forgotpass.checkKey(this.email, this.phonenumber, this.password).subscribe(
      data => {
        if(data=="Password Changed!")
        {
          alert("Password Changed Successfully!");
          this.router.navigate(['/login']);
        }

        else if(data=="Phone number is wrong")
        {
          alert("Entered phone number is incorrect. Try again!");
          this.router.navigate(["/forgotpassword"]);
        }
        else if(data == "Account with given email is not found"){
          alert("User not found. Please Register!");
          this.router.navigate(["/register"]);
        }
        else{
          alert("Something is wrong. Please try again!");
          this.router.navigate(['/login']);
        }
        
      }
    );
  }

  savepass(email:string, phonenumber:string, password:string): void {
    this.email=email;
    this.phonenumber=phonenumber;
    this.password = password;
    
     this.checkKey();
  }

  ngOnInit(): void {
  }

}
