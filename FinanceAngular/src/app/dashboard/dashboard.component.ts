import { Component, OnInit } from '@angular/core';
import {UserloginserviceService} from './../services/userloginservice.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userservices:UserloginserviceService) {

   }

  ngOnInit(): void {
    this.userservices.uservalidate();
  }

}
