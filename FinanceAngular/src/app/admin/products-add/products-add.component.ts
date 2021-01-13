import { Component, OnInit } from '@angular/core';
import {ProductsServiceService} from './../../services/products-service.service';
import {Router} from '@angular/router';
import {IProduct} from './../../model/iproduc';
import {UserloginserviceService} from './../../services/userloginservice.service';
@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {
prod:IProduct={
  ProductID:null,
    ProductName :null,
    ImageName :null,
    stock :null,
    Price :null,
    ProductDetails :null
}
  constructor(private productservices:ProductsServiceService,private router:Router,private userservics:UserloginserviceService) { }
addProd(){
  this.productservices.addProduct(this.prod).subscribe(()=>{
    alert("Recoded Added");
    this.router.navigate(['/admin/products']);
  },error=>{
    alert(error.error.Message);
    
  })
}
saveProd(prod:IProduct):void{
  this.prod=prod;
  this.addProd();
}
  ngOnInit(): void {
    this.userservics.uservalidate();

  }

}
