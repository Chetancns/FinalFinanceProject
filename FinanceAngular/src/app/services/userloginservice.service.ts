import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';
import {Router} from '@angular/router';
import{IRegister} from './../model/iregister';
import { Route } from '@angular/compiler/src/core';
@Injectable({
  providedIn: 'root'
})
export class UserloginserviceService {
  role:string='';
  url:string="http://localhost/FinanceWebApi/api/login/";
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }
  constructor(private http : HttpClient,private route:Router) { }

  doLogin(Email : string, password: string) : Observable<any>{
    return this.http.get<any>(this.url+"login?"+"email="+ Email +"&password="+ password);
  }
  doadminlogin(Email:string, password:string):Observable<any>{
    return this.http.get<any>(this.url +"adminlogin?email=" + Email + "&password=" + password);
  }

  registeruser(reg:IRegister):
    Observable<IRegister>{
      console.log(reg);
      return this.http.post<IRegister>(this.url + "registertest", reg, this.httpOptions);
    }
    // "register?email=" + reg.Email + "&password=" + reg.password + 
    //   "&Name=" + reg.Name + "&Phone=" + reg.Phone +"&username=" + reg.username +"&address=" + reg.address + 
    //   "&cardtype=" + reg.cardtype +"&bankname=" + reg.bankname +"&accountnumber=" + reg.accountnumber + 
    //   "&ifsccode=" + reg.ifsccode  

    checkKey( email:string, phonenumber:string, password:string):Observable<any>{
      console.log(email, phonenumber, password);
      return this.http.get<any>(this.url + "ChangePassword?email=" + email + "&phonenumber=" + phonenumber + "&pwd=" + password, this.httpOptions);
    }
    logout(){
      sessionStorage.clear();
      this.route.navigate(['/']);
    }
    uservalidate(){
     this.role= sessionStorage.getItem('role');
      if(this.role=='' ||this.role==null){
        alert("Please Login");
        this.route.navigate(['/']);
      }
    }
    
}
