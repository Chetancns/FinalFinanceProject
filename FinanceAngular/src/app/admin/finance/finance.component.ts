import { Component, OnInit } from '@angular/core';
import {UservalidateServiceService} from './../../services/uservalidate-service.service';
import {ActivatedRoute,Router} from '@angular/router';
import {UserloginserviceService} from './../../services/userloginservice.service';
@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
Finance:any[];

  constructor(private uservalidateservice:UservalidateServiceService, private router: ActivatedRoute,private route:Router,private userservices:UserloginserviceService) { }
  getUserfinance(Email:string){
    this.uservalidateservice.getFinance(Email).subscribe((data)=>{
      this.Finance=data;
    });
   
  }
  
  ngOnInit(): void {
    this.userservices.uservalidate();
    const Email=this.router.snapshot.paramMap.get('Email');
    this.getUserfinance(Email);
  }

}
