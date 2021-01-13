import { Component, OnInit } from '@angular/core';
import {ProductsServiceService} from './../../services/products-service.service';
import {IProduct} from './../../model/iproduc';
import {UserloginserviceService} from './../../services/userloginservice.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
Productlist:IProduct[];
  constructor(private productservice:ProductsServiceService,private userservices:UserloginserviceService) { 
    this.productservice.getProduct().subscribe((data)=>{this.Productlist=data;});
  }

  ngOnInit(): void {
    this.userservices.uservalidate();
    
  }

}
