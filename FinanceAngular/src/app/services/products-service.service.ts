import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {IProduct} from './../model/iproduc';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
url='http://localhost/FinanceWebApi/api/products/';
httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};
  constructor(private http:HttpClient) { }
  getProduct():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.url+"GetProducts");
  }
  getProdDetails(id:number):Observable<IProduct>{
    return this.http.get<IProduct>(this.url+"GetProduct/"+id);
  }
  addProduct(prod:IProduct):Observable<IProduct>{
    return this.http.post<IProduct>(this.url+"PostProduct",prod,this.httpOptions);
  }
  editProduct(prod:IProduct):Observable<IProduct>{
    return this.http.put<IProduct>(this.url+"PutProduct/"+prod.ProductID,prod,this.httpOptions);
  }
}
