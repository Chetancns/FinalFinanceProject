import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from './../services/product-service.service';
import {UserloginserviceService} from './../services/userloginservice.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productlist: any[] | undefined;

  constructor(private productservice: ProductServiceService,private userservics:UserloginserviceService) { 
    this.productservice.getProductList().subscribe((data)=>
    {this.productlist=data});


  }

  ngOnInit(): void {
    this.userservics.uservalidate();
  }

}
