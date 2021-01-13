import { Component, OnInit } from '@angular/core';
import{ProductServiceService} from'./../services/product-service.service';
import{ActivatedRoute, Router} from '@angular/router';
import{IProd} from './../model/iproduct';
import {IFinance} from './../model/ifinance';
import { ThisReceiver } from '@angular/compiler';
import {UserloginserviceService} from './../services/userloginservice.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productdata : IProd = null;
  finance:IFinance={
    Email: null,
    Months:3,
    EmiAmount: null,
    TotalAmount: null,
    RemainingAmount: null,
    ProductID: null
};
selectedEmi: number;

  constructor(private productservice: ProductServiceService,private router:ActivatedRoute,private rout:Router,private userservices:UserloginserviceService) { }

  getProductInfo(id:number){
    this.productservice.getData(id).subscribe((data:IProd)=>{
      this.productdata=data;
    })
    this.selectedEmi=this.productdata.Price/this.finance.Months;
  }



  // //event handler for the select element's change event
  selectChangeHandler (event: any) {
  //   //update the ui
        this.selectedEmi = this.productdata.Price/this.finance.Months;
   }
onBuy(){
  this.finance.Email=sessionStorage.getItem('Email');
  this.finance.Months=+this.finance.Months;
  this.finance.EmiAmount=this.selectedEmi;
  this.finance.TotalAmount=this.productdata.Price;
  this.finance.RemainingAmount=this.productdata.Price;
  this.finance.ProductID=this.productdata.ProductID;
  console.log(this.finance);
  this.productservice.addfinance(this.finance.Email,this.finance.ProductID,this.finance).subscribe(()=>{
    alert("Product Purchased Successfully");
    this.rout.navigate(['/dashboard/listoffinance']);
  },error=>{
    alert(error.error.Message);
  }
  )
}




  ngOnInit(): void {
    this.userservices.uservalidate();
    const id =+ this.router.snapshot.paramMap.get('id');
    this.getProductInfo(id);
  }


}
