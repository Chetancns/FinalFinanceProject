import { Component, OnInit } from '@angular/core';
import {IUser} from './../../model/iuser'
import {UservalidateServiceService} from './../../services/uservalidate-service.service';
import {UserloginserviceService} from './../../services/userloginservice.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userlist:IUser[];
  constructor(private uservalidateservic:UservalidateServiceService,private userservices:UserloginserviceService) { 
    this.uservalidateservic.getApprovedUser().subscribe((data)=>{this.userlist=data;});
  }

  ngOnInit(): void {
    this.userservices.uservalidate();
  }

}
