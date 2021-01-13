import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import {Observable,of} from 'rxjs';
import { IData } from './../model/idata';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url='http://localhost/FinanceWebApi/api/user/';
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };
  constructor(private http:HttpClient) { }
  getDataList(email:string):Observable<IData[]>{
    return this.http.get<IData[]>(this.url+"GetDashBoard?email="+email)
  }
}
