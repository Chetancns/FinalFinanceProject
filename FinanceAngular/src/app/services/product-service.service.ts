import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {IProd} from './../model/iproduct';
import {IFinance} from './../model/ifinance';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  url='http://localhost/FinanceWebApi/api/products/';
  url2='http://localhost/FinanceWebApi/api/Finance/';
  httpOptions={
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };
    constructor(private http:HttpClient) { }
  
    getProductList(): Observable<any[]>{
      return this.http.get<any[]>(this.url+"getproducts");
    }

    getData(id:number):Observable<IProd>{
      return this.http.get<IProd>(this.url+"getproduct/"+id);
    }
    addfinance(Email:string,ProductID:number,finance:IFinance):Observable<IFinance>{
      return this.http.post<IFinance>(this.url2+"postfinance?Email="+Email+"&ProductID="+ProductID,finance,this.httpOptions);
    }
}
