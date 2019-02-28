import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../shared/service/http-serve.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  public id;
  public row;

  constructor(public activeRoute: ActivatedRoute,private http: HttpService) {
  }

  ngOnInit() {
    this.id=this.activeRoute.snapshot.queryParams.userid
    this.http.getCustomHeaders('/v1/app/back/users/'+this.id).subscribe(res => {
      this.row=res.result;
    })
  }
  search() {
    this.http.getCustomHeaders('/v1/app/back/usersGrid').subscribe(res => {
      })
  }

}
