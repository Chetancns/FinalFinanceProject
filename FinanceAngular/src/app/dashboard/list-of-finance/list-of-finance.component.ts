import { Component, OnInit } from '@angular/core';
import {UservalidateServiceService} from './../../services/uservalidate-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-of-finance',
  templateUrl: './list-of-finance.component.html',
  styleUrls: ['./list-of-finance.component.css']
})
export class ListOfFinanceComponent implements OnInit {
  Finance:any[];
  public sessionStorage=sessionStorage;
  email:string=sessionStorage.getItem('Email');
  constructor(private uservalidateservice:UservalidateServiceService ,private route:Router) { 
  
    this.uservalidateservice.getFinance(this.email).subscribe((data)=>{
      this.Finance=data;
    });
  
  }
  
  onSubmit(id:number){
    this.uservalidateservice.udateFinance(id).subscribe(()=>{
        alert("EMI Paid for this Month Successfull");
        this.route.navigate(['/dashboard']);
    })
  }
  

  ngOnInit(): void {
  }

}
