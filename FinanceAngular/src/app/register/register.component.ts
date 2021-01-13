import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserloginserviceService } from '../services/userloginservice.service';
import { FormsModule } from '@angular/forms';
import { IRegister } from '../model/iregister';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  reg:IRegister={ Email:null ,password:null, Name:null, PhoneNumber:null, username: null,
    Address:null, CardType: null , validation:"ToValidate", AccountNumber:null, BankName:null, IFSCCode:null};
    
  constructor(private loginservice: UserloginserviceService ,private router: Router) { }

  

  registeruser(){
    //console.log(this.reg);
    this.loginservice.registeruser(this.reg).subscribe(
      () => {
        alert("Application Submitted. Wait for approval and Processing fees will be deducted on approval");
        this.router.navigate(['/login']);
      }
    );
  }

  saveUser(reg:IRegister): void{
    this.reg = reg;
    //console.log(this.reg);
    this.registeruser();
  }

  ngOnInit(): void {
  }

}
