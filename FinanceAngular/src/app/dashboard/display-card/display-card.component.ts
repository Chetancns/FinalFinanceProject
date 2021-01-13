import { Component, OnInit } from '@angular/core';
import {IData} from './../../model/idata';
import {DataService} from './../../services/data.service';
import {UserloginserviceService} from './../../services/userloginservice.service';
@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrls: ['./display-card.component.css']
})
export class DisplayCardComponent implements OnInit {
  cardlist:IData[];
  public sessionStorage=sessionStorage;
  email:string=sessionStorage.getItem('Email');
  
    constructor(private dataservice:DataService,private userservics:UserloginserviceService) { 
      this.dataservice.getDataList(this.email).subscribe((data)=>{this.cardlist=data;});
    console.log(this.email);
    }

  ngOnInit(): void {
    this.userservics.uservalidate();
  }

}
