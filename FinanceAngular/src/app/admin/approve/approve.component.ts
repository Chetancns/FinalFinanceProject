import { Component, OnInit } from '@angular/core';
import {UservalidateServiceService} from './../../services/uservalidate-service.service';
import {ActivatedRoute,Router} from '@angular/router';
import {IUser} from './../../model/iuser';
import {UserloginserviceService} from './../../services/userloginservice.service';
@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
Emailid;string;
Userdata:any;
user:any;
  constructor(private uservalidateservice:UservalidateServiceService, private router: ActivatedRoute,private route:Router,private userservices:UserloginserviceService) { }

  getUser(Email:string){
    
    this.uservalidateservice.getUser(Email).subscribe((data:any)=>{
      this.Userdata=data;
    },error=>{
        alert(error.error.Message);
        
    }
    );
  }
  OnApprove(Email:string){
    this.uservalidateservice.getApprove(Email).subscribe(()=>{
      alert("User has Been Approved");
      this.route.navigate(['/admin/validate']);
    });
  }
  OnReject(Email:string){
    this.uservalidateservice.getRejected(Email).subscribe(()=>{
      alert("User has Been Regected");
      this.route.navigate(['/admin/validate']);
    })
  }

  ngOnInit(): void {
    this.userservices.uservalidate();
    const Email=this.router.snapshot.paramMap.get('Email');
    this.getUser(Email);
  }

}
