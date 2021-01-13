import { Component, OnInit } from '@angular/core';
import {UserloginserviceService} from './../services/userloginservice.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
role:string;
  constructor(private userservies:UserloginserviceService) { 
    this.role=sessionStorage.getItem('role');
    console.log(this.role);
  }

  ngOnInit(): void {
    this.userservies.uservalidate();
  }

}
