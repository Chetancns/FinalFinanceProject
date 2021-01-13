import { Component, OnInit } from '@angular/core';
import {ProductsServiceService} from './../../services/products-service.service';
import {IProduct} from './../../model/iproduc';
import {ActivatedRoute,Router} from '@angular/router';
import {UserloginserviceService} from './../../services/userloginservice.service';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit {
product:IProduct;
  constructor(private productservice:ProductsServiceService,private router:ActivatedRoute,private userservice:UserloginserviceService) { }
  getProdInfo(id:number){
    this.productservice.getProdDetails(id).subscribe((data:IProduct)=>{this.product=data});
  }
  ngOnInit(): void {
    this.userservice.uservalidate();
    const id=+this.router.snapshot.paramMap.get('id');
    this.getProdInfo(id);
  }

}
