import { Component, OnInit } from '@angular/core';
import {UserloginserviceService} from './../services/userloginservice.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  role=sessionStorage.getItem('role');
  constructor(private userservices:UserloginserviceService) {
    
   }
   onlogout(){
     this.userservices.logout();
   }

  ngOnInit(): void {
    
  }

}
